import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Location } from './iLocation'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  

  constructor(private http: HttpClient) { }

  getAerisLatLong(val: number | string): Observable<Location> {
    let url = `https://api.aerisapi.com/observations/${val}?&format=json&filter=allstations&limit=1&client_id=S41rf92LgxZwDM2AG3E0v&client_secret=CfEGeYauJYWWyir7HhTitoB8qHxEgqyImSr9UHvJ`;

    return this.http.get<Location>(url).pipe(map(data => data));
  }
}
