export class SignUpPage {
  constructor(page) {
    this.page = page;
    this.usernameField = page.getByPlaceholder('Username');
    this.emailField = page.getByPlaceholder('Email');
    this.passwordField = page.getByPlaceholder('Password');
    this.signUpButton = page.getByRole('button', { name: 'Sign up' });
    this.errorList = page.locator('ul.error-messages');
  }

  async open() {
    return this.page.goto('/user/register');
  }

  async fillUsernameField(username) {
    return this.usernameField.fill(username);
  }

  async fillEmailField(email) {
    return this.emailField.fill(email);
  }

  async fillPasswordField(password) {
    return this.passwordField.fill(password);
  }

  async clickSignUpButton() {
    return this.signUpButton.click();
  }

  // expose error locator for spec assertions
  getErrorLocator() {
    return this.errorList;
  }
}
