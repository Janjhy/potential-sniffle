import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Name} from '../name';

@Injectable({
  providedIn: 'root'
})
export class ApiWrapperService {
  private nameUrl = '/names';
  public activeNames: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {  }

  // get("/names")
  getNames(): Observable<Name[]> {
    this.http.get(this.nameUrl).subscribe(res => this.activeNames.next(res));
    return this.activeNames;
  }
}
