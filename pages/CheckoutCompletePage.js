import { BasePage } from './BasePage';

export class CheckoutCompletePage extends BasePage {
  constructor(page) {
    super(page);
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
  }

  async getConfirmationHeader() {
    return await this.completeHeader.textContent();
  }

  async getConfirmationText() {
    return await this.completeText.textContent();
  }
}