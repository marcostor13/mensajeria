import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IList } from '../interfaces/list.interface';
import { ENDPOINTS } from '../../../share/constants/endpoints.constant';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(
    private http:HttpClient
  ) { }

  getLists(): Observable<IList[]>{
    return this.http.get<IList[]>(`${ENDPOINTS.api}/lists`)
  }

  saveList(payload: IList): Observable<IList>{
    return this.http.post<IList>(`${ENDPOINTS.api}/lists`, payload)
  }

  updateList(payload: IList): Observable<IList>{
    return this.http.patch<IList>(`${ENDPOINTS.api}/lists/${payload._id}`, payload)
  }

  deleteList(_id: string): Observable<IList>{
    return this.http.delete<IList>(`${ENDPOINTS.api}/lists/${_id}`)
  }
  
}
