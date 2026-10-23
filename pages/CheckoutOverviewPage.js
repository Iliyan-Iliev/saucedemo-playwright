import { BasePage } from './BasePage';

export class CheckoutOverviewPage extends BasePage {
  constructor(page) {
    super(page);
    this.finishButton = page.locator('#finish');
    this.itemTotalLabel = page.locator('.summary_subtotal_label');
  }

  async finishCheckout() {
    await this.finishButton.click();
  }
}