import {TestBed} from '@angular/core/testing';

import {NamesDataSource} from './names-datasource';
import {ApiWrapperService} from './api-wrapper.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('NamesDataSource', () => {
  // tslint:disable-next-line:prefer-const
  let service: ApiWrapperService;
  const fakeDataWrong1 = [{name: 'bba', amount: 4}, {name: 'baa', amount: 5}, {name: 'aaa', amount: 10}];
  const fakeDataCorrect1 = [{name: 'aaa', amount: 10}, {name: 'baa', amount: 5}, {name: 'bba', amount: 4}];

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [NamesDataSource],
      providers: [ApiWrapperService]
    });
  });

  it('should create an instance', () => {
    expect(new NamesDataSource(service)).toBeTruthy();
  });

  it('should sort array by alphabet', () => {
    expect(new NamesDataSource(service).sortByName(fakeDataWrong1)).toEqual(fakeDataCorrect1) ;
  });

  it('alphabet sorting should not change return array', () => {
    expect(new NamesDataSource(service).sortByName(fakeDataCorrect1)).toEqual(fakeDataCorrect1) ;
  });

  it('should sort array by amount', () => {
    expect(new NamesDataSource(service).sortByAmount(fakeDataWrong1)).toEqual(fakeDataCorrect1) ;
  });

  it('amount sorting should not change return array', () => {
    expect(new NamesDataSource(service).sortByAmount(fakeDataCorrect1)).toEqual(fakeDataCorrect1) ;
  });
});
