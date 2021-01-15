import {Component, OnInit} from '@angular/core';
import {ApiWrapperService} from '../api-wrapper.service';
import {NamesDataSource} from '../names-datasource';
import {MatButtonToggleGroup} from '@angular/material/button-toggle';

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
  isActive = true;

  constructor(private apiWrapperService: ApiWrapperService) {
  }

  ngOnInit(): void {
    this.namesData = new NamesDataSource(this.apiWrapperService);
    this.namesData.loadNames();
  }

  onValueChange(value: string): void {
    this.namesData.sortArray(value);
  }

  getTotalAmount(): number {
    return this.namesData.getTotalAmount();
  }
}
