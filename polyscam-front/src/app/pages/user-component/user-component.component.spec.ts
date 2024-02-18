import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponentComponent } from './user-component.component';
import { HttpClientModule } from '@angular/common/http';

describe('UserComponentComponent', () => {
  let component: UserComponentComponent;
  let fixture: ComponentFixture<UserComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [UserComponentComponent]
    });
    fixture = TestBed.createComponent(UserComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init data user',(done) => {
    const spyOnGetPersons= spyOn(component, 'getPersons').and.returnValue();
    const spyOnGetAnnounces= spyOn(component, 'getAnnounces').and.returnValue();
    const spyOngetPurchases= spyOn(component, 'getPurchases').and.returnValue();
    component.ngOnInit();
    expect(spyOnGetPersons).toHaveBeenCalled();
    expect(spyOnGetAnnounces).toHaveBeenCalled();
    expect(spyOngetPurchases).toHaveBeenCalled();
    done();
  });
  
});
