import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  
  constructor(private _http: HttpClient) { }

  getProperty(nombre: string){ 
    return this._http.get(`${environment.url}/properties/${nombre}`);
  }
  getLocations() {
    return this._http.get(`${environment.url}/location/locacions`);
  }
}
