import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  invoices: any[] = [];
  searchText: string = '';
  offset: number = 0;
  limit: number = 10;
  selectedVal: number = 10;
  pageList = [
    { name: '10', value: 10 },
    { name: '25', value: 25 },
    { name: '50', value: 50 },
    { name: '100', value: 100 }
  ];
  previousBtnDesable: boolean = false;
  nextBtnDesable: boolean = false;

  // Variables for modal
  selectedInvoice: any = null;

  constructor(
    private restApi: RestApiService,
    private router: Router,
    private notifier: NotifierService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    const data = {
      search: this.searchText,
      offset: this.offset,
      limit: this.limit
    };
    this.restApi.getInvoices(data).subscribe(
      (response: any) => {
        console.log(response);
        if (response.success) {
          this.invoices = response.response.sort((a: any, b: any) => new Date(b.InvoiceDate).getTime() - new Date(a.InvoiceDate).getTime());
          this.previousBtnDesable = this.offset === 0;
          this.nextBtnDesable = this.invoices.length < this.limit;
        } else {
          this.notifier.notify('error', 'Failed to load invoices.');
        }
      },
      (error: any) => {
        console.error('Error loading invoices:', error);
        this.notifier.notify('error', 'Error loading invoices.');
      }
    );
  }

  calculateTotal(items: any[]): number {
    return items.reduce((sum, item) => sum + parseFloat(item.Amount), 0);
  }

  parseFloat(value: string): number {
    return parseFloat(value);
  }

  search(): void {
    this.offset = 0;
    this.loadInvoices();
  }

  changePagelimit(event: any): void {
    this.limit = event.target.value;
    this.loadInvoices();
  }

  previousPage(): void {
    this.offset = Math.max(0, this.offset - this.limit);
    this.loadInvoices();
  }

  nextPage(): void {
    this.offset += this.limit;
    this.loadInvoices();
  }

  openModal(invoice: any): void {
    this.selectedInvoice = { ...invoice, subTotal: this.calculateTotal(invoice.Items), total: this.calculateTotal(invoice.Items) * (1 + this.parseFloat(invoice.TaxRate)) };
    const modal = document.querySelector('.modal');
    if (modal) {
      this.renderer.setStyle(modal, 'display', 'block');
    }
  }

  closeModal(): void {
    this.selectedInvoice = null;
    const modal = document.querySelector('.modal');
    if (modal) {
      this.renderer.setStyle(modal, 'display', 'none');
    }
  }

  saveChanges(): void {
    // Send the updated data to the backend
    this.restApi.updateInvoice(this.selectedInvoice).subscribe(
      (response: any) => {
        if (response.success) {
          this.notifier.notify('success', 'Invoice updated successfully.');
          const index = this.invoices.findIndex(i => i.InvoiceId === this.selectedInvoice.InvoiceId);
          if (index !== -1) {
            this.invoices[index] = this.selectedInvoice;
          }
        } else {
          this.notifier.notify('error', 'Failed to update invoice.');
        }
        this.closeModal();
      },
      (error: any) => {
        console.error('Error updating invoice:', error);
        this.notifier.notify('error', 'Error updating invoice.');
        this.closeModal();
      }
    );
  }

  viewPdf(pdfBytes: any): void {
    const byteArray = new Uint8Array(pdfBytes.data);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  }

  goBack(): void {
    this.router.navigate(['/admin/app/clients-list']);
  }

  downloadInvoicesList(): void {
    console.log('Invoices to download:', this.invoices);
  }
}
