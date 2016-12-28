import { DocumentsCompletedPage } from './app.po';

describe('documents-completed App', function() {
  let page: DocumentsCompletedPage;

  beforeEach(() => {
    page = new DocumentsCompletedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
