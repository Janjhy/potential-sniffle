import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NamesListComponent} from './names-list.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

describe('NamesListComponent', () => {
  let component: NamesListComponent;
  let fixture: ComponentFixture<NamesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NamesListComponent],
      imports: [HttpClientTestingModule, MatButtonToggleModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NamesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
