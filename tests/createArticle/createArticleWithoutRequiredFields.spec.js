import { test, expect } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { faker } from '@faker-js/faker';

let homePage;
let createArticlePage;

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
    await expect(homePage.getYourFeedTabLocator()).toBeVisible();
  });

  await test.step('Navigate to New Article page', async () => {
    await homePage.clickNewArticleLink();
  });

  await test.step('Editor loaded and ready', async () => {
    await expect(createArticlePage.getTitleFieldLocator()).toBeVisible();
    await expect(createArticlePage.page).toHaveURL(/\/editor/);
  });
});

test('Create an article without required fields', async () => {
  await test.step('Click Publish Article without filling fields', async () => {
    await createArticlePage.submit();
  });

  await test.step('Assert validation error is shown', async () => {
    const err = createArticlePage.getErrorLocator();
    await expect(err).toContainText('Article title cannot be empty');
  });
});
