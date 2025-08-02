// charts.component.ts
import { Component, Input, SimpleChanges } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { NgForm , FormsModule } from '@angular/forms';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [HighchartsChartModule, FormsModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent {
  @Input() chartOptions: Highcharts.Options = {};
  Highcharts: typeof Highcharts = Highcharts;
  LastChange : Highcharts.Options = {}
  Orginal : Highcharts.Options = {}

  selectedSort: string = 'default';
  selectedType: string = 'line';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartOptions'] && changes['chartOptions'].currentValue) {
      this.LastChange = JSON.parse(JSON.stringify(this.chartOptions));
      this.Orginal = JSON.parse(JSON.stringify(this.chartOptions))
    }
  }


  naturalCompare(a: string, b: string): number {
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
  }

  changeSort(type: string) {
    this.selectedSort = type;
    if (!this.chartOptions.series || !this.LastChange) return;

    let sortedSeries;

    if (type === 'alpha') {
      sortedSeries = [...(this.LastChange.series as Highcharts.SeriesOptionsType[])].sort((a: any, b: any) =>
        this.naturalCompare(a.name, b.name)
      );
    } else {
      sortedSeries = [...(this.Orginal.series as Highcharts.SeriesOptionsType[])].map(series => ({
        ...series,
        type: this.selectedType
      }))as Highcharts.SeriesOptionsType[];
      this.Orginal.series = sortedSeries;
    }
    this.LastChange = {
      ...this.LastChange,
      series: sortedSeries
    };

  }

  changeType(type: string) {

    this.selectedType = type;
    let updatedSeries

    if (!this.chartOptions.series || ! this.LastChange.series) return;
    if(type === 'area') {
      updatedSeries = (this.LastChange.series as Highcharts.SeriesOptionsType[]).map(series => ({
        ...series,
        type: 'area'
      })) as Highcharts.SeriesOptionsType[];
    } else {
      updatedSeries = (this.LastChange.series as Highcharts.SeriesOptionsType[]).map(series => ({
        ...series,
        type: 'line'
      })) as Highcharts.SeriesOptionsType[];
    }
    this.LastChange = {
      ...this.LastChange,
      series: updatedSeries
    };

  }
}

