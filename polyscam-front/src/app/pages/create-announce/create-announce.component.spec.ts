import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAnnounceComponent } from './create-announce.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

describe('CreateAnnounceComponent', () => {
  let component: CreateAnnounceComponent;
  let fixture: ComponentFixture<CreateAnnounceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, HttpClientModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule, MatButtonModule ],
      declarations: [CreateAnnounceComponent]
    });
    fixture = TestBed.createComponent(CreateAnnounceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
