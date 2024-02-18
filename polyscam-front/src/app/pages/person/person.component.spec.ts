import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { HttpClientModule } from '@angular/common/http';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [PersonComponent]
    });
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init data person',(done) => {
    const spyOnGetPersons= spyOn(component, 'getPersons').and.returnValue();
    component.ngOnInit();
    expect(spyOnGetPersons).toHaveBeenCalled();
    done();
  });
});
