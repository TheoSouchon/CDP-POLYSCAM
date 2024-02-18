import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPurchaseComponent } from './my-purchase.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('MyPurchaseComponent', () => {
  let component: MyPurchaseComponent;
  let fixture: ComponentFixture<MyPurchaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [MyPurchaseComponent]
    });
    fixture = TestBed.createComponent(MyPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init data purchase',(done) => {
    const spyOnGetPurchases= spyOn(component, 'getPurchases').and.returnValue();
    component.ngOnInit();
    expect(spyOnGetPurchases).toHaveBeenCalled();
    done();
  });
});
