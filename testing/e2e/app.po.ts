import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getButton(button: string) {
    return element(by.className(button));
  }

  getText(selector: string) {
    const serviceElement = element(by.className(selector));
    return serviceElement.getText();
  }

  getFileInputEl() {
    return element(by.css('input[type="file"]'));
  }
}
