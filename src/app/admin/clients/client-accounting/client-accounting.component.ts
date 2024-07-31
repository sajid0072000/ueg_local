import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-client-accounting',
  templateUrl: './client-accounting.component.html',
  styleUrls: ['./client-accounting.component.css']
})
export class ClientAccountingComponent implements OnInit {
  clientName: string = '';
  clientId: number = 0;
  invoices: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private restApi: RestApiService,
    private notifier: NotifierService,
    private router: Router,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.clientId = +this.route.snapshot.params['clientId'];
    this.loadClientInvoices();
  }

  loadClientInvoices(): void {
    this.restApi.getInvoicesByClient({ clientId: this.clientId }).subscribe(
      (response: any) => {
        if (response.success) {
          this.invoices = response.invoices;
          this.clientName = `${this.invoices[0].clientFirstName} ${this.invoices[0].clientLastName}`;
        } else {
          this.notifier.notify('error', 'Failed to load client invoices.');
        }
      },
      (error: any) => {
        console.error('Error loading client invoices:', error);
        this.notifier.notify('error', 'Error loading client invoices.');
      }
    );
  }

  viewInvoicePdf(invoice: any): void {
    const pdfBytes = invoice.pdfFile;
    if (pdfBytes) {
      this.viewPdf(pdfBytes);
    } else {
      this.notifier.notify('error', 'PDF data not available.');
    }
  }

  viewPdf(pdfBytes: any): void {
    const byteArray = new Uint8Array(pdfBytes.data);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  }

  sendReminder(): void {
    console.log('Send Reminder');
  }

}
