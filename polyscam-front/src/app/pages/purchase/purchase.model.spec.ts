import { Purchase } from './purchase.model';

describe('Purchase', () => {
  it('should create an instance', () => {
    expect(new Purchase(0,new Date(),'',null,null)).toBeTruthy();
  });
});
