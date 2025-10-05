export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(
      "What's this article about?"
    );
    this.bodyField = page.getByPlaceholder(
      'Write your article (in markdown)'
    );
    this.tagsField = page.locator('input[placeholder="Enter tags"]');
    this.publishButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorList = page.locator('ul.error-messages');
    this.articleTitleHeader = page.locator('h1');
  }

  async fillTitleField(title) {
    return this.titleField.fill(title);
  }

  async fillDescriptionField(description) {
    return this.descriptionField.fill(description);
  }

  async fillBodyField(body) {
    return this.bodyField.fill(body);
  }

  async addTag(tag) {
    // wait for input to be visible before typing
    await this.tagsField.waitFor({ state: 'visible' });
    await this.tagsField.fill(tag);
    return this.page.keyboard.press('Enter');
  }

  async submit() {
    return this.publishButton.click();
  }

  // getters for specs to assert on
  getErrorLocator() {
    return this.errorList;
  }

  getArticleTitleLocator() {
    return this.articleTitleHeader;
  }

  getTitleFieldLocator() {
    return this.titleField;
  }
}
