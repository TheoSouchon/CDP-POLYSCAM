import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfilComponent } from './edit-profil.component';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';

describe('EditProfilComponent', () => {
  let component: EditProfilComponent;
  let fixture: ComponentFixture<EditProfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProfilComponent],
      imports: [HttpClientModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatRippleModule],
    });

    fixture = TestBed.createComponent(EditProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
