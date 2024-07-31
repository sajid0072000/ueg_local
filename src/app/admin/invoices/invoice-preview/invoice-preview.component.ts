import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  styleUrls: ['./invoice-preview.component.css']
})
export class InvoicePreviewComponent implements OnInit {
  pdfFiles: any[] = [];
  approvedFiles: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restApi: RestApiService,
    private notifier: NotifierService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const identifier = params['identifier'];
      console.log('Identifier from queryParams:', identifier);

      if (identifier) {
        this.restApi.getInvoiceData(identifier).subscribe((response: any) => {
          if (response.success) {
            const nestedResponse = response.response;
            const responseData = nestedResponse.response;
            if (Array.isArray(responseData)) {
              this.pdfFiles = responseData.map(item => ({
                clientId: item.clientId,
                filename: item.filename,
                invoiceData: item.invoiceData,
                token: item.token
              }));
            } else {
              console.error('Expected response to be an array, but got:', responseData);
              this.notifier.notify('error', 'Unexpected data format.');
            }
          } else {
            this.notifier.notify('error', 'Failed to fetch invoice data.');
          }
        }, (error: any) => {
          console.error('Error fetching invoice data:', error);
          this.notifier.notify('error', 'Error fetching invoice data.');
        });
      } else {
        this.notifier.notify('error', 'No identifier found in query parameters.');
      }
    });
  }

  openPdf(token: string, filename: string): void {
    const pdfUrl = this.restApi.getPdf(token, false); 
    window.open(pdfUrl, '_blank');
  }

  toggleSelectAll(event: any): void {
    const checked = event.target.checked;
    this.pdfFiles.forEach(file => file.selected = checked);
  }

  approve(): void {
    this.pdfFiles = this.pdfFiles.filter(file => {
      if (file.selected) {
        this.approvedFiles.push(file);
        return false;
      }
      return true;
    });
  }

  deapprove(): void {
    this.approvedFiles = this.approvedFiles.filter(file => {
      if (file.selected) {
        this.pdfFiles.push(file);
        return false;
      }
      return true;
    });
  }

  downloadApproved(): void {
    const approvedFiles = this.approvedFiles.map(file => ({
      token: file.token,
      filename: file.filename,
      clientId: file.clientId,
      invoiceDataJson: file.invoiceData
    }));

    this.restApi.downloadApprovedInvoices(approvedFiles).subscribe((response: any) => {
      console.log(response);
      if (response.success) {
        this.notifier.notify('success', 'Invoices have been processed and sent to the respective clients.');
        this.router.navigate(['admin/app/clients-list']);
      } else {
        this.notifier.notify('error', 'Failed to send invoices.');
      }
    }, (error: any) => {
      this.notifier.notify('error', 'Error: Unable to send PDFs');
    });
  }

  backToList(): void {
    this.router.navigate(['admin/app/clients-list']);
  }
}
