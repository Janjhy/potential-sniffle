import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Name} from '../name';
import {BehaviorSubject, Observable} from 'rxjs';
import {ApiWrapperService} from './api-wrapper.service';

export class NamesDataSource implements DataSource<Name> {

  private namesSubject = new BehaviorSubject<Name[]>([]);

  constructor(private apiWrapperService: ApiWrapperService) {}

  connect(collectionViewer: CollectionViewer): Observable<Name[] | ReadonlyArray<Name>> {
    return this.namesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.namesSubject.complete();
  }

  loadNames(): void {
    this.apiWrapperService.getNames().subscribe(names => this.namesSubject.next(names));
  }

}
