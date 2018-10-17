import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});



// import { DashstiPage } from './app.po';

// describe('dashsti App', function() {
//   let page: DashstiPage;

//   beforeEach(() => {
//     page = new DashstiPage();
//   });

//   it('should display message saying app works', () => {
//     page.navigateTo();
//     expect(page.getParagraphText()).toEqual('app works!');
//   });
// });
