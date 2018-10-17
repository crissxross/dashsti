import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}



// import { browser, element, by } from 'protractor';

// export class DashstiPage {
//   navigateTo() {
//     return browser.get('/');
//   }

//   getParagraphText() {
//     return element(by.css('app-root h1')).getText();
//   }
// }
