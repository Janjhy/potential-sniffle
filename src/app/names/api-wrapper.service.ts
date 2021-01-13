import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, ReplaySubject} from 'rxjs';
import {Name} from '../name';

@Injectable({
  providedIn: 'root'
})
export class ApiWrapperService {
  private nameUrl = '/names';
  public activeNames: ReplaySubject<any> = new ReplaySubject();

  constructor(private http: HttpClient) {  }

  // get("/names")
  getNames(): Observable<void | Name[]> {
    this.http.get(this.nameUrl).subscribe(res => this.activeNames.next(res));
    return this.activeNames;
  }
}
