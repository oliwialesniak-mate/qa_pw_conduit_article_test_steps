export class SignInPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.getByPlaceholder('Email');
    this.passwordField = page.getByPlaceholder('Password');
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    this.errorList = page.locator('ul.error-messages');
  }

  async open() {
    return this.page.goto('/user/login');
  }

  async fillEmailField(email) {
    return this.emailField.fill(email);
  }

  async fillPasswordField(password) {
    return this.passwordField.fill(password);
  }

  async clickSignInButton() {
    return this.signInButton.click();
  }

  getErrorLocator() {
    return this.errorList;
  }
}
