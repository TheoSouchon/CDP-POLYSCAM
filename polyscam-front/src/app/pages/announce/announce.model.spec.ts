import { Announce } from './announce.model';

describe('Announce', () => {
  it('should create an instance', () => {
    expect(new Announce(0,'',0,'',null)).toBeTruthy();
  });
});
