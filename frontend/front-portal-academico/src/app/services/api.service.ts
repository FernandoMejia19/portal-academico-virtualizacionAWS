import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private api = '/api';

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
  getServerInfo() {
  return this.http.get<any>(`${this.api}/server-info`);
}
}