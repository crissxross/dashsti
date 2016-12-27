import { DashstiPage } from './app.po';

describe('dashsti App', function() {
  let page: DashstiPage;

  beforeEach(() => {
    page = new DashstiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
