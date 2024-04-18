import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from '../../../share/constants/endpoints.constant';
import { Observable } from 'rxjs';
import { Contacts } from '../interfaces/contacts.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
    private http: HttpClient
  ) { }

  getContacts(): Observable<Contacts[]>{
    return this.http.get<Contacts[]>(`${ENDPOINTS.api}/contacts`)
  }

  saveContact(payload: Contacts): Observable<Contacts>{
    return this.http.post<Contacts>(`${ENDPOINTS.api}/contacts`, payload)
  }

  deleteContact(_id: string): Observable<Contacts>{
    return this.http.delete<Contacts>(`${ENDPOINTS.api}/contacts/${_id}`)
  }


}
