import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private api = 'http://balancedor-165886256.us-east-1.elb.amazonaws.com';

  constructor(private http: HttpClient) {}

  getResources() {
    return this.http.get(`${this.api}/resources/`);
  }

  createUser(data: any) {
    return this.http.post(`${this.api}/users/`, data);
  }

  createResource(data: any) {
    return this.http.post(`${this.api}/resources/`, data);
  }
}