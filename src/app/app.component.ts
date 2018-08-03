

import { Component, OnInit, Input } from '@angular/core';
import { AppService } from './app.service';
import { MenuItem, SelectItem } from 'primeng/api';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  currencies: SelectItem[];
  toBeConverted: number;
  converted: number;
  quantity: number;
  selectedCurrency: any;
  selectedToConvertCurrency: any;
  rateNames: any[];
  selectedChartData: any;
  chartArray: any[];
  data: any;
  showChart: boolean = false;

  constructor(private service: AppService) {
    this.quantity = 1;
    this.selectedCurrency = 'USD';
    this.selectedToConvertCurrency = 'EUR';
    this.selectedChartData = 'USD';
    this.data = {};
  }

  rates: any[];
  ngOnInit() {
    this.service.getCurrency().subscribe(
      (data) => {
        this.rates = data;
        this.rateNames = this.service.rateCodes;
        console.log(this.rateNames);
        this.currencies = this.rateNames;
      }
    )
  }
  onChangeToBeConvertedCurrencyNumber(quantity: any) {
    this.quantity = quantity;
    this.converted = this.service.getConvertedCurrencyRate(this.quantity);
  }
  toBeConvertedCurrency(id) {
    this.service.getConverted(id);
    this.onChangeToBeConvertedCurrencyNumber(this.quantity);
  }
  convertedCurrency(id) {
    this.service.getToBeConvertedCurrency(id);
    this.onChangeToBeConvertedCurrencyNumber(this.quantity);
  }
  getChartData() {
    this.service.getForChart(this.chartArray, this.selectedChartData);
    this.data = this.service.chartData;
    console.log(this.data)
    this.showChart = true;
  }

}


