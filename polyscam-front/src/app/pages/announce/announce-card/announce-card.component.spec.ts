import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnounceCardComponent } from './announce-card.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

describe('AnnounceCardComponent', () => {
  let component: AnnounceCardComponent;
  let fixture: ComponentFixture<AnnounceCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,MatCardModule,MatFormFieldModule,
        FormsModule,BrowserAnimationsModule,MatSnackBarModule,MatDialogModule],
      declarations: [AnnounceCardComponent]
    });
    fixture = TestBed.createComponent(AnnounceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
