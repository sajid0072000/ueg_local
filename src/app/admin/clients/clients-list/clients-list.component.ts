import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { CommonService } from "src/app/common.service";
import { RestApiService } from 'src/app/rest-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { saveAs } from 'file-saver';
import { convertToCSV } from 'src/app/utility/saveToCsv';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {
  searchText: string = '';
  offset = 0;
  limit = 20;
  clientsList: any[] = [];
  selectedVal: any = 20;
  previousBtnDesable: boolean = true;
  nextBtnDesable: boolean = false;
  selectedMonth: number = new Date().getMonth() + 1;
  selectedYear: number = new Date().getFullYear();
  selectedClientId: number | null = null;
  FILE_URL: string = '';

  public pageList: Array<any> = [
    { name: '10', value: 10 },
    { name: '15', value: 15 },
    { name: '20', value: 20 },
    { name: '30', value: 30 },
    { name: '50', value: 50 }
  ];

  public months: Array<any> = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 }
  ];

  public years: Array<number> = [];

  @ViewChild('invoiceModal') invoiceModal!: TemplateRef<any>;

  constructor(
    private router: Router,
    private restapi: RestApiService,
    public common: CommonService,
    private modalService: NgbModal,
    private notifierService: NotifierService
  ) {
    const currentYear = new Date().getFullYear();
    this.years = [currentYear - 1, currentYear];
  }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    const obj = {
      offset: this.offset,
      limit: this.limit,
      searchText: this.searchText
    };
    this.common.loaderStart();
    this.restapi.getAllClients(obj).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        this.clientsList = res.response;
        this.nextBtnDesable = res.response.length < this.limit;
      } else {
        this.clientsList = [];
        this.nextBtnDesable = true;
        this.offset = this.offset > 0 ? this.offset - this.limit : this.offset;
      }
    }, (err: any) => {
      this.common.loaderEnd();
      this.notifierService.notify('error', err.error.message);
    });
  }

  changePagelimit(event: any): void {
    this.offset = 0;
    this.limit = Number(event.target.value);
    this.getClients();
  }

  previousPage(): void {
    this.offset = this.offset > 0 ? this.offset - this.limit : 0;
    this.offset = this.offset < 0 ? 0 : this.offset;
    this.getClients();
    this.previousBtnDesable = this.offset <= 0;
  }

  nextPage(): void {
    this.previousBtnDesable = false;
    this.offset = this.offset + this.limit;
    this.getClients();
  }

  add(): void {
    this.router.navigate(['admin/app/add-client/0']);
  }

  edit(id: any): void {
    this.router.navigate(['admin/app/add-client/' + id]);
  }

  openInvoiceModal(clientId: number): void {
    this.selectedClientId = clientId;
    this.modalService.open(this.invoiceModal);
  }

  previewInvoice(modal: any): void {
    const selectedClients = this.clientsList.filter((client: any) => client.selected).map((client: any) => client.id);

    if (selectedClients.length === 0) {
      this.notifierService.notify('warning', 'Please select at least one client to preview.');
      return;
    }

    const requestData = {
      idString: selectedClients.join(','),
      month: this.selectedMonth,
      year: this.selectedYear
    };

    this.restapi.previewInvoice(requestData).subscribe((data: any) => {
      if (data && data.length !== 0) {
        this.handleInvoicePreviewResponse(data);
      } else {
        this.notifierService.notify('error', 'Failed to generate any PDFs.');
      }
    }, (error: any) => {
      console.error('There was a problem with the fetch operation:', error);
      this.notifierService.notify('error', 'Error: ' + error.message);
    });

    modal.dismiss();
  }

  handleInvoicePreviewResponse(data: any): void {
    const identifier = new Date().getTime().toString();
    this.restapi.storeInvoiceData({ identifier, invoiceData: data }).subscribe((response: any) => {
        if (response.success) {
            this.router.navigate(['admin/app/invoice-preview'], { queryParams: { identifier } });
        } else {
            this.notifierService.notify('error', 'Failed to store invoice data.');
        }
    }, (error: any) => {
        console.error('Error storing invoice data:', error);
        this.notifierService.notify('error', 'Error storing invoice data.');
    });
  }

  search(): void {
    if (this.searchText.length >= 3 || this.searchText.length === 0) {
      this.getClients();
    }
  }

  downloadlistCsvfile(): void {
    const csvData = convertToCSV(this.clientsList);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'clients_list.csv');
  }
  
  toggleSelectAll(event: any): void {
    const checked = event.target.checked;
    this.clientsList.forEach((client: any) => client.selected = checked);
  }

  accounting(clientId: number): void {
    this.router.navigate(['/admin/app/client-accounting', clientId]);
  }
}
