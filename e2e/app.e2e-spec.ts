import { TrilhaPage } from './app.po';

describe('trilha App', () => {
  let page: TrilhaPage;

  beforeEach(() => {
    page = new TrilhaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
