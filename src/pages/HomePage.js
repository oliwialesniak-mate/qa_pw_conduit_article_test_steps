export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
  }

  async clickNewArticleLink() {
    return this.newArticleLink.click();
  }

  // getter for specs to assert visibility
  getYourFeedTabLocator() {
    return this.yourFeedTab;
  }

  getNewArticleLinkLocator() {
    return this.newArticleLink;
  }
}
