import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISms } from '../interfaces/simple-message.interface';
import { ENDPOINTS } from '../../../share/constants/endpoints.constant';

@Injectable({
  providedIn: 'root'
})
export class SimpleMesageService {

  constructor(
    private http: HttpClient
  ) { }

  sendSms(payload: ISms): Observable<ISms>{
    return this.http.post<ISms>(`${ENDPOINTS.api}/sms/sms`, payload)
  }

}
