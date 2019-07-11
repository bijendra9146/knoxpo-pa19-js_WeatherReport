import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from "rxjs/operators";

@Injectable()

export class shardService {

constructor(private _http: HttpClient){}

getWeeklyWeatherData(){

    var ApiKey = "APPID=01ff789b33cc243e0e95b5c507c3b067" // this is my API Key for api calling service
    return this._http.get('https://api.openweathermap.org/data/2.5/forecast?id=1269750&units=metric&'+ApiKey)
    .pipe(map(response => {
      return response
    })
    )
  }


}
