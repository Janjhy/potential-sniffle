import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Name} from '../model/name';
import {BehaviorSubject, Observable} from 'rxjs';
import {ApiWrapperService} from './api-wrapper.service';

export class NamesDataSource implements DataSource<Name> {

  private namesSubject = new BehaviorSubject<Name[]>([]);

  constructor(private apiWrapperService: ApiWrapperService) {
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
      this.sortArray('amount');
      this.sortArray('name');
    });
  }

  sortArray(param: string): void {
    switch (param) {
      case 'amount':
        this.updateArray(this.sortByAmount(this.namesSubject.getValue()));
        break;
      case 'name':
        this.updateArray(this.sortByName(this.namesSubject.getValue()));
        break;
    }
  }

  updateArray(data: Array<Name>): void {
    this.namesSubject.next(data);
  }

  sortByAmount(data: Array<Name>): Array<Name> {
    if (data.length > 0) {
      const temp = data;
      console.log(temp);
      temp.sort((a, b) => b.amount - a.amount);
      console.log(temp);
      return temp;
    } else {
      return data;
    }
  }

  sortByName(data: Array<Name>): Array<Name> {
    if (data.length > 0) {
      const temp = data;
      console.log(temp);
      temp.sort((a, b) => a.name.localeCompare(b.name));
      return temp;
    } else {
      return data;
    }
  }
}
