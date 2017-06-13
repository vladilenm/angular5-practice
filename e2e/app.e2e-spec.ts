import { AppngpPage } from './app.po';

describe('appngp App', () => {
  let page: AppngpPage;

  beforeEach(() => {
    page = new AppngpPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('wfm works!');
  });
});
