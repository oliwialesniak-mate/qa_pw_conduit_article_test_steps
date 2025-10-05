import { test, expect } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { faker } from '@faker-js/faker';

let homePage, createArticlePage;

test.beforeEach(async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);

  const user = {
    username: `${faker.person.firstName()}_${faker.person.lastName()}`,
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
  };

  await test.step('Open Sign Up page', async () => {
    await signUpPage.open();
  });
  await test.step('Fill Username', async () => {
    await signUpPage.fillUsernameField(user.username);
  });
  await test.step('Fill Email', async () => {
    await signUpPage.fillEmailField(user.email);
  });
  await test.step('Fill Password', async () => {
    await signUpPage.fillPasswordField(user.password);
  });
  await test.step('Click Sign Up button', async () => {
    await signUpPage.clickSignUpButton();
  });
  await test.step('Assert Your Feed tab is visible', async () => {
    await homePage.assertYourFeedTabIsVisible();
  });
  await test.step('Navigate to New Article page', async () => {
    await homePage.clickNewArticleLink();
  });
});

test('Create an article without description', async () => {
  const article = {
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraph(),
    tags: ['playwright', 'test'],
  };

  await test.step('Fill Article Title', async () => {
    await createArticlePage.fillTitleField(article.title);
  });
  await test.step('Fill Body', async () => {
    await createArticlePage.fillBodyField(article.body);
  });
  for (const tag of article.tags) {
    await test.step(`Add Tag '${tag}'`, async () => {
      await createArticlePage.addTag(tag);
    });
  }
  await test.step('Click Publish Article', async () => {
    await createArticlePage.submit();
  });
  await test.step('Verify validation error for missing description', async () => {
    const errorText = await createArticlePage.getErrorMessageText();
    expect(errorText).toContain('Article description cannot be empty');
  });
});
