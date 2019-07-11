import { Component, OnInit } from '@angular/core';
import { shardService } from './shardService.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
// declared two global variable to handle the Api Response
  responseObject;
  responseData;

  constructor(private _shardService: shardService) {

  }

  ngOnInit() {
    //used that instaance to access global variable inside service method.
    var that = this;
// called Api throw service provider using method called getWeeklyWeatherData.
    this._shardService.getWeeklyWeatherData().subscribe(function (weatherReportObject) {
      console.log("Response from service", weatherReportObject)

      var uniqueDateObject;
      var arrayData = [];
      var weekForcast = [];
      var uniqueDate = [];

      that.responseObject = weatherReportObject;
      var weatherReportList = that.responseObject.list; // list contains weekly wise data including every 3 hours of weather report per day

      // Used map function itterate all element and remove time and pick date from every index
      weatherReportList.map(function (everyDate, index) {
        arrayData.push({
          date: everyDate.dt_txt.slice(0, 10),
          temp: everyDate.main.temp
        })
        return arrayData;
      })

      //using SET function sorting duplicate Date from arrayData and inserting unique date into uniqueDateObject.
      uniqueDateObject = new Set(arrayData.map(everyData => {
        return everyData.date;
      }));

      uniqueDateObject.forEach(element => {
        uniqueDate.push(element)
      });

      for (var i = 0; i < arrayData.length; i++) { // some Loops to manipulate data in the formate I want
        if (i < uniqueDate.length) {               // i.e [{date:Value, temp:value},{date:Value, temp:value}]
          for (var j = i; j < uniqueDate.length; j++) { // so i used two loop because I have two different Arrays One for unique Date and one for Temprature
            weekForcast.push({
              date: uniqueDate[j],
              temp: Math.round(arrayData[i].temp)
            })
            i++
          }
        } else {
          console.log("Duplicate Dates ");
        }

      }

      that.responseData = weekForcast;
      console.log("Response of that.responseData", that.responseData);




    })


  }



}
