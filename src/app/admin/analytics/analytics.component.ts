import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { RevenueAnalyticsComponent } from '../revenue-analytics/revenue-analytics.component';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit, AfterViewInit {
  @ViewChild('analyticsContainer', { read: ViewContainerRef }) analyticsContainer!: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    // Moved loading of the default component to ngAfterViewInit
  }

  ngAfterViewInit(): void {
    // Load the default component after the view has been initialized
    this.loadComponent('revenue');
  }

  onAnalyticsTypeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const analyticsType = selectElement.value;
    this.loadComponent(analyticsType);
  }

  loadComponent(analyticsType: string): void {
    this.analyticsContainer.clear();
    let componentFactory;
    switch (analyticsType) {
      case 'revenue':
        componentFactory = this.resolver.resolveComponentFactory(RevenueAnalyticsComponent);
        break;
      // Add more cases for other components
      default:
        return;
    }
    if (componentFactory) {
      this.analyticsContainer.createComponent(componentFactory);
    }
  }
}
