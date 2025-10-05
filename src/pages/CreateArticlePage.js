import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;

    // Article fields
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder("What's this article about?");
    this.bodyField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagsField = page.locator('input[placeholder="Enter tags"]');

    // Buttons & messages
    this.publishButton = page.getByRole('button', { name: 'Publish Article' });
    this.errorMessage = page.getByRole('list').nth(1);
    this.articleTitleHeader = page.locator('h1');
  }

  async fillTitleField(title) {
    await test.step(`Fill the 'Article Title' field`, async () => {
      await this.titleField.fill(title);
    });
  }

  async fillDescriptionField(description) {
    await test.step(`Fill the 'Description' field`, async () => {
      await this.descriptionField.fill(description);
    });
  }

  async fillBodyField(body) {
    await test.step(`Fill the 'Body' field`, async () => {
      await this.bodyField.fill(body);
    });
  }

  async addTag(tag) {
    await test.step(`Add tag '${tag}'`, async () => {
      await this.tagsField.waitFor({ state: 'visible' });
      await this.tagsField.fill(tag);
      await this.page.keyboard.press('Enter');
    });
  }

  async submit() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishButton.click();
    });
  }

  async expectSuccess(title) {
    await test.step(`Expect article published successfully`, async () => {
      await expect(this.page).toHaveURL(/\/article\/.+/);
      await expect(this.articleTitleHeader).toHaveText(title);
    });
  }

  async expectValidationError(message) {
    await test.step(`Expect validation error '${message}'`, async () => {
      await this.errorMessage.waitFor({ state: 'visible' });
      await expect(this.errorMessage).toContainText(message);
    });
  }
}
