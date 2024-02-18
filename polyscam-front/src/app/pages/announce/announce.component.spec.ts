import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnounceComponent } from './announce.component';
import { HttpClientModule } from '@angular/common/http';

describe('AnnounceComponent', () => {
  let component: AnnounceComponent;
  let fixture: ComponentFixture<AnnounceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [AnnounceComponent]
    });
    fixture = TestBed.createComponent(AnnounceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
