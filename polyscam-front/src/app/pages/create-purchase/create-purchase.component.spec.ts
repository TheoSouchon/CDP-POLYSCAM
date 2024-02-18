import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePurchaseComponent } from './create-purchase.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreatePurchaseComponent', () => {
  let component: CreatePurchaseComponent;
  let fixture: ComponentFixture<CreatePurchaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,MatSnackBarModule,MatFormFieldModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,BrowserAnimationsModule],
      declarations: [CreatePurchaseComponent]
    });
    fixture = TestBed.createComponent(CreatePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
