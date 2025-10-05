export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder("What's this article about?");
    this.bodyField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagsField = page.locator('input[placeholder="Enter tags"]');
    this.publishButton = page.getByRole('button', { name: 'Publish Article' });
    this.errorMessage = page.locator('ul.error-messages');
    this.articleTitleHeader = page.locator('h1');
  }

  async fillTitleField(title) {
    await this.titleField.fill(title);
  }

  async fillDescriptionField(description) {
    await this.descriptionField.fill(description);
  }

  async fillBodyField(body) {
    await this.bodyField.fill(body);
  }

  async addTag(tag) {
    await this.tagsField.waitFor({ state: 'visible' });
    await this.tagsField.fill(tag);
    await this.page.keyboard.press('Enter');
  }

  async submit() {
    await this.publishButton.click();
  }

  async getErrorMessageText() {
    return await this.errorMessage.textContent();
  }

  async getArticleTitleText() {
    return await this.articleTitleHeader.textContent();
  }
}
