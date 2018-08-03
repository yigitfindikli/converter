

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { map } from 'rxjs/operators/map';


@Injectable()
export class AppService {
    
    // apiUrl = "http://www.apilayer.net/api/live?access_key=c5a63f2a33150c83aaa0f1b2aedd889a";
    apiUrl = "https://openexchangerates.org/api/latest.json?app_id=74b0f10da1ed49eba4d65078948eaca3";
    rates: any;
    rateArray:any[];
    rateCodes:any[];
    selectedCurrencyRate: number;
    toBeConverted: any;
    converted: any;
    chartData:any;
    selectedChartRate:any;
    selectedChartCode:any;
    chartCode:any[];
    chartRate:number[]=[];
    constructor(private http: HttpClient) {
        this.getCurrency();
    }
    getCurrency() {
        return this.http.get(this.apiUrl).pipe(map((response: any) => {
            this.rateArray = response.rates;
            this.rateArray=Object.keys(this.rateArray).map(key=>({type:key,value:this.rateArray[key]}));
            this.rateCodes=Object.keys(response.rates).map(key=>({label:key,value:key}));
            console.log(this.rateCodes);
            this.toBeConverted=this.getRate("EUR");
            this.converted=this.getRate("USD");            
            this.changeSelectedCurrencyRate();
            return this.rates;
        }));
    }
    getRateNames(){
        return this.rateCodes;
    }
    changeSelectedCurrencyRate() {
        this.selectedCurrencyRate = this.toBeConverted / this.converted;
    }
    getRate(id:string){
        console.log(id)
        let x =this.rateArray.find(x=>x.type==id).value;
        console.log(x)
        return(x);
    }
    getToBeConvertedCurrency(id: string) {
        this.toBeConverted=this.getRate(id);
        this.changeSelectedCurrencyRate();
    }
    getConverted(id: string) {
        this.converted=this.getRate(id);
        this.changeSelectedCurrencyRate();
    }
    getConvertedCurrencyRate(currency: number) {
        currency = currency * this.selectedCurrencyRate;
        return currency;
    }
    getForChart(rateCodes:any[],selectedCode){
        this.chartRate=[];
        this.selectedChartCode=selectedCode;
        this.selectedChartRate=this.getRate(selectedCode);
        this.chartCode=rateCodes;
        for(let code of rateCodes){
            this.chartRate.push(this.chartChangeSelectedCurrencyRate(this.getRate(code))); 
        }
        this.setChartData();
    }
    chartChangeSelectedCurrencyRate(rate) {
    return this.selectedChartRate /rate ;
    }
    setChartData(){
        this.chartData={};
        this.chartData={
            labels: this.chartCode,
            datasets: [
                {
                    label: this.selectedChartCode,
                    backgroundColor: 'rgba(179,181,198,0.2)',
                    borderColor: 'rgba(179,181,198,1)',
                    pointBackgroundColor: 'rgba(179,181,198,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    data: this.chartRate
                }
            ]
        };
    }
}