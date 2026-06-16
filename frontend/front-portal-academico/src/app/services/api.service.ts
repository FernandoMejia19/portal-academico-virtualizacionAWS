import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private api = 'http://54.173.12.124:8000';

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