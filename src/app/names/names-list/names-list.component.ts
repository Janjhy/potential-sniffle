import { Component, OnInit } from '@angular/core';
import {Name} from '../../name';
import {ApiWrapperService} from '../api-wrapper.service';
import {NamesDataSource} from '../names-datasource';

@Component({
  selector: 'app-names-list',
  templateUrl: './names-list.component.html',
  styleUrls: ['./names-list.component.css'],
  providers: [ApiWrapperService]
})
export class NamesListComponent implements OnInit {

  // @ts-ignore
  namesData: NamesDataSource;
  displayedColumns = ['position', 'name', 'amount'];

  constructor(private apiWrapperService: ApiWrapperService) { }

  ngOnInit(): void {
    this.namesData = new NamesDataSource(this.apiWrapperService);
    this.namesData.loadNames();
  }

}
