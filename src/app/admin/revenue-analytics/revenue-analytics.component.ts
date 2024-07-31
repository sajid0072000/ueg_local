import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/rest-api.service';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-revenue-analytics',
  templateUrl: './revenue-analytics.component.html',
  styleUrls: ['./revenue-analytics.component.css']
})
export class RevenueAnalyticsComponent implements OnInit {
  revenueChart: any;
  colors = [
    'rgba(255, 99, 132, 0.5)',
    'rgba(54, 162, 235, 0.5)'
  ];

  constructor(private restApi: RestApiService) {}

  ngOnInit(): void {
    this.updateRevenueData('all');
    this.updateLatestRevenues(50);
    window.addEventListener('click', this.handleOutsideClick);
  }

  private handleOutsideClick = (event: MouseEvent) => {
    const modal = document.getElementById('infoModal');
    if (modal && event.target === modal) {
      this.closeModal();
    }
  }

  private fetchRevenueData(timeInterval: string = 'all') {
    this.restApi.filterRevenueByTimeInterval({ timeInterval }).subscribe(
      data => {
        this.updateRevenueChart(data);
        this.updateTables(data, timeInterval);
      },
      error => {
        console.error('Error fetching revenue data:', error);
      }
    );
  }

  private fetchLatestRevenues(count: number) {
    this.restApi.getLatestRevenues({ count: count.toString() }).subscribe(
      data => this.updateLatestRevenuesTable(data),
      error => console.error('Error fetching latest revenues:', error)
    );
  }

  openModal(labelType: string, timePeriod: string, infos: any[]) {
    const modalContent = document.getElementById('modalInfoContent');
    if (!modalContent) return;

    modalContent.innerHTML = `<h2>${labelType} - ${timePeriod}</h2>`;
    const infoTable = this.createInfoTable(labelType, infos);
    modalContent.appendChild(infoTable);

    const modal = document.getElementById('infoModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  private createInfoTable(labelType: string, infos: any[]): HTMLTableElement {
    const infoTable = document.createElement('table');
    infoTable.innerHTML = labelType === 'Purchases'
      ? this.getPurchasesTableHeader()
      : this.getLessonsTableHeader();

    infos.forEach((infoItem: any) => {
      infoItem.infos.forEach((info: any) => {
        const row = infoTable.insertRow();
        this.addTableRowCells(row, info, labelType);
      });
    });

    return infoTable;
  }

  private getPurchasesTableHeader(): string {
    return `
      <tr>
        <th>Customer Name</th>
        <th>Address</th>
        <th>Phone</th>
        <th>Email</th>
        <th>Country</th>
        <th>Zip</th>
        <th>Quantity</th>
        <th>Resource Price</th>
        <th>Total Amount</th>
        <th>Purchase Date</th>
      </tr>
    `;
  }

  private getLessonsTableHeader(): string {
    return `
      <tr>
        <th>Job Name</th>
        <th>Charge Rate</th>
        <th>Client</th>
        <th>Educator</th>
        <th>Total Hours</th>
        <th>Lesson Date</th>
      </tr>
    `;
  }

  private addTableRowCells(row: HTMLTableRowElement, info: any, labelType: string) {
    if (labelType === 'Purchases') {
      row.insertCell().textContent = info.CustName || '';
      row.insertCell().textContent = info.CustAddress || '';
      row.insertCell().textContent = info.CustPhone || '';
      row.insertCell().textContent = info.CustEmail || '';
      row.insertCell().textContent = info.CustCountry || '';
      row.insertCell().textContent = info.CustZip || '';
      row.insertCell().textContent = (info.Quantity ?? '').toString();
      row.insertCell().textContent = `£${(parseFloat(info.ResourcePrice) ?? 0).toFixed(2)}`;
      row.insertCell().textContent = `£${(parseFloat(info.TotalAmount) ?? 0).toFixed(2)}`;
      row.insertCell().textContent = info.PurchaseDate ? new Date(info.PurchaseDate).toLocaleString() : '';
    } else {
      row.insertCell().textContent = info.Topic || '';
      row.insertCell().textContent = `£${(parseFloat(info.HourlyIncome) ?? 0).toFixed(2)}`;
      row.insertCell().textContent = info.ClientName || '';
      row.insertCell().textContent = info.EducatorName || '';
      row.insertCell().textContent = ((new Date(info.EndTime).getTime() - new Date(info.StartTime).getTime()) / (1000 * 60 * 60)).toFixed(2);
      row.insertCell().textContent = info.StartTime ? new Date(info.StartTime).toLocaleString() : '';
    }
  }

  private extractLabel(dataItem: any): string {
    return dataItem.hour ?? dataItem.day ?? dataItem.month ?? dataItem.year?.toString() ?? 'Unknown';
  }

  private updateRevenueChart(data: any) {
    const { CheckOutData = [], MyJobData = [] } = data.response;
    const labelsSet: Set<string> = new Set();
    const labels: string[] = [];
    const purchasesData: number[] = [];
    const lessonsData: number[] = [];

    CheckOutData.forEach((item: any) => this.updateChartData(item, labelsSet, labels, purchasesData));
    MyJobData.forEach((item: any) => this.updateChartData(item, labelsSet, labels, lessonsData));

    const totalRevenue = this.calculateTotalRevenue(purchasesData, lessonsData);
    this.updateTotalRevenueElement(totalRevenue);
    this.renderRevenueChart(labels, purchasesData, lessonsData);
  }

  private updateChartData(item: any, labelsSet: Set<string>, labels: string[], data: number[]) {
    const label = this.extractLabel(item);
    if (!labelsSet.has(label)) {
      labelsSet.add(label);
      labels.push(label);
    }
    data.push(parseFloat(item.totalAmount));
  }

  private calculateTotalRevenue(purchasesData: number[], lessonsData: number[]): number {
    return [...purchasesData, ...lessonsData].reduce((acc, amount) => acc + amount, 0);
  }

  private updateTotalRevenueElement(totalRevenue: number) {
    const totalRevenueElement = document.getElementById('totalRevenue');
    if (totalRevenueElement) {
      totalRevenueElement.textContent = `£${totalRevenue.toFixed(2)}`;
    }
  }

  private renderRevenueChart(labels: string[], purchasesData: number[], lessonsData: number[]) {
    const canvas = document.getElementById('revenueChart') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const chartOptions: ChartConfiguration['options'] = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Revenue Amount'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Time Period'
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          align: 'end' as 'end'
        },
        datalabels: {
          align: 'end',
          anchor: 'end',
          color: 'black',
          formatter: (value: number) => value > 0 ? `£${value.toFixed(2)}` : ''
        }
      }
    };

    if (this.revenueChart) {
      this.revenueChart.data.labels = labels;
      this.revenueChart.data.datasets = this.getChartDatasets(purchasesData, lessonsData);
      this.revenueChart.options = chartOptions;
      this.revenueChart.update();
    } else {
      this.revenueChart = new Chart(ctx, {
        type: 'bar',
        plugins: [ChartDataLabels],
        data: {
          labels,
          datasets: this.getChartDatasets(purchasesData, lessonsData)
        },
        options: chartOptions
      });
    }
  }

  private getChartDatasets(purchasesData: number[], lessonsData: number[]) {
    return [
      {
        label: 'Purchases',
        data: purchasesData,
        backgroundColor: this.colors[0],
        borderColor: this.colors[0].replace('0.5', '1'),
        borderWidth: 1
      },
      {
        label: 'Lessons',
        data: lessonsData,
        backgroundColor: this.colors[1],
        borderColor: this.colors[1].replace('0.5', '1'),
        borderWidth: 1
      }
    ];
  }

  onTimeIntervalChange(event: Event) {
    const timeInterval = (event.target as HTMLSelectElement).value;
    this.updateRevenueData(timeInterval);
  }

  onNumberOfRevenuesChange(event: Event) {
    const count = parseInt((event.target as HTMLSelectElement).value, 10);
    this.updateLatestRevenues(count);
  }

  private updateRevenueData(timeInterval: string) {
    this.fetchRevenueData(timeInterval);
  }

  private updateLatestRevenues(count: number) {
    this.fetchLatestRevenues(count);
  }

  private updateTables(data: any, timeInterval: string) {
    const checkOutData = data.response.CheckOutData || [];
    const myJobData = data.response.MyJobData || [];
    const timePeriods = this.generateTimePeriods(timeInterval);

    const aggregatedCheckOutData = this.aggregateDataByTimePeriod(checkOutData, timePeriods, 'Purchases');
    const aggregatedMyJobData = this.aggregateDataByTimePeriod(myJobData, timePeriods, 'Lessons');

    this.createTable('latestPurchasesTable', aggregatedCheckOutData, 'Purchases');
    this.createTable('latestLessonsTable', aggregatedMyJobData, 'Lessons');
  }

  private generateTimePeriods(timeInterval: string): string[] {
    const periods: string[] = [];
    const today = new Date();

    if (timeInterval === 'day') {
      for (let i = 0; i < 24; i++) periods.push(`${String(i).padStart(2, '0')}:00`);
    } else if (timeInterval === 'week') {
      const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));
      for (let i = 0; i < 7; i++) periods.push(new Date(startOfWeek.setDate(startOfWeek.getDate() + i)).toLocaleDateString('en-US', { weekday: 'long' }));
    } else if (timeInterval === 'month') {
      const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
      for (let i = 1; i <= daysInMonth; i++) periods.push(String(i));
    } else if (timeInterval === 'year') {
      periods.push(...['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
    } else {
      for (let year = 2024; year <= today.getFullYear(); year++) periods.push(year.toString());
    }

    return periods;
  }

  private aggregateDataByTimePeriod(data: any[], periods: string[], type: string): any[] {
    const aggregatedData = periods.map(period => ({
      period,
      totalAmount: 0,
      infos: [] as any[]
    }));

    data.forEach((item: any) => {
      const label = this.extractLabel(item);
      const periodIndex = periods.indexOf(label);
      if (periodIndex !== -1) {
        const amount = parseFloat(item.totalAmount ?? item.HourlyIncome);
        if (!isNaN(amount)) {
          aggregatedData[periodIndex].totalAmount += amount;
          aggregatedData[periodIndex].infos.push(item);
        }
      }
    });

    return aggregatedData;
  }

  private createTable(tableId: string, data: any[], type: string) {
    const tableBody = document.getElementById(tableId)?.getElementsByTagName('tbody')[0];
    if (!tableBody) return;

    tableBody.innerHTML = ''; // Clear current table body

    data.forEach(item => {
      const row = tableBody.insertRow();
      const periodCell = row.insertCell(0);
      periodCell.textContent = item.period;
      if (item.infos.length > 0) {
        periodCell.style.color = 'blue';
        periodCell.style.cursor = 'pointer';
        periodCell.addEventListener('click', () => this.openModal(type, item.period, item.infos));
      }
      row.insertCell(1).textContent = `£${(parseFloat(item.totalAmount) ?? 0).toFixed(2)}`;
    });
  }

  private updateLatestRevenuesTable(revenues: any) {
    const revenueArray = revenues.response;
    if (!Array.isArray(revenueArray)) {
      console.error('Expected revenues.response to be an array');
      return;
    }

    const tableBody = document.getElementById('latestRevenuesTable')?.getElementsByTagName('tbody')[0];
    if (!tableBody) {
      console.error('Table body not found');
      return;
    }

    tableBody.innerHTML = ''; // Clear current table body

    revenueArray.forEach((revenue: any) => {
      const row = tableBody.insertRow();
      row.insertCell(0).textContent = revenue.CustName;
      row.insertCell(1).textContent = `£${(parseFloat(revenue.TotalAmount) ?? 0).toFixed(2)}`;
      row.insertCell(2).textContent = new Date(revenue.PurchaseDate).toLocaleString();
    });
  }

  public closeModal() {
    const modal = document.getElementById('infoModal');
    if (modal) {
      modal.style.display = 'none';
      window.removeEventListener('click', this.handleOutsideClick);
    }
  }
}
