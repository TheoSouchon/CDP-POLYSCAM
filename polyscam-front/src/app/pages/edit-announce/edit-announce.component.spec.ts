import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnnounceComponent } from './edit-announce.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EditAnnounceComponent', () => {
  let component: EditAnnounceComponent;
  let fixture: ComponentFixture<EditAnnounceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAnnounceComponent],
      imports: [HttpClientModule,RouterModule.forRoot([]),MatSnackBarModule,
      MatInputModule,BrowserAnimationsModule,
      ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(EditAnnounceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
