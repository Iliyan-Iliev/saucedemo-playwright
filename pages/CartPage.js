import { BasePage } from './BasePage';
import { ProductsPage } from './ProductsPage';

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.checkoutButton = page.locator('#checkout');
    this.continueShoppingButton = page.locator('#continue-shopping');
    this.title = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.cartList = page.locator('.cart_list');
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
    const productPage = new ProductsPage(this.page);
    await productPage.title.waitFor({ state: 'visible' });
  }

  async removeHighestPriceItem() {
    const count = await this.cartItems.count();
    
    if (count === 0) {
      throw new Error('Cannot remove item: The cart is empty.');
    }

    let highestPrice = -1;
    let removeButtonToClick = null;

    for (let i = 0; i < count; i++) {
      const item = this.cartItems.nth(i);
      
      // Get the item price text ("$29.99"), remove $ and convert to float
      const priceText = await item.locator('.inventory_item_price').textContent();
      const price = parseFloat(priceText.replace('$', ''));

      if (price > highestPrice) {
        highestPrice = price;
        console.log("highestPrice: " + highestPrice);
        removeButtonToClick = item.locator('button:has-text("Remove")');
      }
    }

    if (removeButtonToClick) {
      await removeButtonToClick.click();
    }
  }
}