import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Name} from '../model/name';
import {BehaviorSubject, Observable} from 'rxjs';
import {ApiWrapperService} from './api-wrapper.service';

export class NamesDataSource implements DataSource<Name> {

  constructor(private apiWrapperService: ApiWrapperService) {
  }

  private namesSubject = new BehaviorSubject<Name[]>([]);

  private updateArray(data: Array<Name>): void {
    this.namesSubject.next(data);
  }

  connect(collectionViewer: CollectionViewer): Observable<Name[]> {
    return this.namesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.namesSubject.complete();
  }

  loadNames(): void {
    this.apiWrapperService.getNames().subscribe(names => {
      this.namesSubject.next(names);
    });
  }

  sortArray(param: string): void {
    const data = this.namesSubject.getValue();
    switch (param) {
      case 'amount':
        this.updateArray(this.sortByAmount(data));
        break;
      case 'name':
        this.updateArray(this.sortByName(data));
        break;
    }
  }

  sortByAmount(data: Array<Name>): Array<Name> {
    if (data.length > 0) {
      const temp = data;
      temp.sort((a, b) => b.amount - a.amount);
      return temp;
    } else {
      return data;
    }
  }

  sortByName(data: Array<Name>): Array<Name> {
    if (data.length > 0) {
      const temp = data;
      temp.sort((a, b) => a.name.localeCompare(b.name));
      return temp;
    } else {
      return data;
    }
  }

  getTotalAmount(): number {
    if (this.namesSubject.getValue().length > 0) {
      return this.namesSubject.getValue().map(val => val.amount).reduce((acc, val) => acc + val, 0);
    }
    return 0;
  }
}
