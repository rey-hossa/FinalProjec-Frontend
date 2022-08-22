import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private ApiUrl = 'https://progettofinale-backend.herokuapp.com';

  constructor(private http:HttpClient) { }

  registerUser(data: any){
    return this.http.post(this.ApiUrl + '/api/register/', data);
  }

  login(data: any){
    return this.http.post(this.ApiUrl + '/api/login', data);
  }
}
