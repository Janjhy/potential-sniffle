import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Name} from '../model/name';
import {BehaviorSubject, Observable} from 'rxjs';
import {ApiWrapperService} from './api-wrapper.service';
import {tap} from 'rxjs/operators';

export class NamesDataSource implements DataSource<Name> {

  constructor(private apiWrapperService: ApiWrapperService) {
  }

  private namesSubject = new BehaviorSubject<Name[]>([]);
  private totalAmount = 0;

  // Updates the BehaviourSubject value
  private updateArray(data: Array<Name>): void {
    this.namesSubject.next(data);
  }

  connect(collectionViewer: CollectionViewer): Observable<Name[]> {
    return this.namesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.namesSubject.complete();
  }

  // Loads the observable from service
  loadNames(): void {
    this.apiWrapperService.getNames().pipe(tap(arr => this.setTotalAmount(arr))).subscribe(names => {
      this.namesSubject.next(names);
    });
  }

  // Handles the parameter received from names-list component
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

  // Sorts array by amount, in descending order
  sortByAmount(data: Array<Name>): Array<Name> {
    if (data.length > 0) {
      const temp = data;
      temp.sort((a, b) => b.amount - a.amount);
      return temp;
    } else {
      return data;
    }
  }

  // Sorts array alphabetically by name
  sortByName(data: Array<Name>): Array<Name> {
    if (data.length > 0) {
      const temp = data;
      temp.sort((a, b) => a.name.localeCompare(b.name));
      return temp;
    } else {
      return data;
    }
  }

  // Calculates the total amount from the received array
  setTotalAmount(arr: Name[]): void {
    this.totalAmount = arr.map(val => val.amount).reduce((acc, val) => acc + val, 0);
  }

  getTotalAmount(): number {
    return this.totalAmount;
  }
}
