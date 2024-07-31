import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import Chart from "chart.js/auto";

@Component({
  selector: 'app-chart-component',
  standalone: true,
  imports: [],
  templateUrl: './chart-component.component.html',
  styleUrl: './chart-component.component.css'
})
export class ChartComponentComponent implements OnChanges, OnDestroy {
  @Input() itemData: any[] = [];
  chart!: Chart;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itemData'] && !changes['itemData'].firstChange) {
      this.updateChart();
    } else if (changes['itemData'].firstChange) {
      this.loadChart();
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  loadChart(chartType: any = 'bar'): void {
    const labels = this.itemData.map(item => item.date) || undefined;
    const data = this.itemData.map(item => item.price) || undefined;

    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: chartType,
      data: {
        labels: labels,
        datasets: [{
          label: 'Price',
          data: data,
          borderWidth: 1
        }]
      },
      options: {
        aspectRatio: 3,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Price',
              font: {
                size: 24
              }
            },
            ticks: {
              font: {
                size: 24
              }
            }
          },
          x: {
            title: {
              display: true,
              text: 'Date',
              font: {
                size: 24
              }
            },
            ticks: {
              font: {
                size: 24
              }
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              font: {
                size: 35
              }
            }
          }
        }
      }
    });
  }

  updateChart(): void {
    if (this.chart) {
      const labels = this.itemData.map(item => item.date);
      const data = this.itemData.map(item => item.price);

      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = data;
      this.chart.update();
    }
  }
}
