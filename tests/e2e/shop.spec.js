import { test, expect } from '@playwright/test';
import testData from '../../fixtures/testData.json';
import { CartPage } from '../../pages/CartPage';
import { CheckoutCompletePage } from '../../pages/CheckoutCompletePage';
import { CheckoutInfoPage } from '../../pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../../pages/CheckoutOverviewPage';
import { LoginPage } from '../../pages/LoginPage';
import { NavigationMenuPage } from '../../pages/NavigationMenuPage';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('SauceDemo E2E Purchasing Flow', () => {
  
  test('Complete standard checkout flow successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutInfoPage = new CheckoutInfoPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);
    const menuPage = new NavigationMenuPage(page);

    // 1. Use credential form the .env file
    await loginPage.navigate();
    const username = process.env.SAUCE_USERNAME;
    const password = process.env.SAUCE_PASSWORD

    // 2. Log in with the standard user.
    await loginPage.login(username, password);
    await expect(productsPage.title).toHaveText('Products');

    // 3. Add the product with the highest price and the product with the lowest price.
    await expect(productsPage.shoppingCartBadge).toHaveCount(0);
    await productsPage.addHighestPriceProductBySorting();
    await expect(productsPage.shoppingCartBadge).toHaveText('1');
    await productsPage.addLowestPriceProductBySorting();
    await expect(productsPage.shoppingCartBadge).toHaveText('2');
    
    // validate the correct number of products are in the cart
    await productsPage.goToCart();
    await expect(cartPage.cartList).toBeVisible();
    await expect(cartPage.cartItems).toHaveCount(2);

    // 4. Remove the item with the highest price and verify the cart content again.
    await cartPage.removeHighestPriceItem();
    await expect(productsPage.shoppingCartBadge).toHaveText('1');
    await expect(cartPage.cartItems).toHaveCount(1);
    
    // 5. Sort the items by **Name (A to Z)** and then add the last product to the cart.
    await cartPage.continueShopping();
    await productsPage.addLastAlphabeticProduct();

    await expect(productsPage.shoppingCartBadge).toHaveText('2');
    await productsPage.goToCart();
    await expect(cartPage.cartItems).toHaveCount(2);

    // 6. Go to checkout.
    await cartPage.proceedToCheckout();

    // 7. Finish the order.
    await checkoutInfoPage.fillShippingInfo(
      testData.customer.firstName,
      testData.customer.lastName,
      testData.customer.postalCode
    );

    await expect(checkoutOverviewPage.itemTotalLabel).toBeVisible();
    await checkoutOverviewPage.finishCheckout();

    // 8. Verify that the order is placed.
    const headerText = await checkoutCompletePage.getConfirmationHeader();
    expect(headerText).toContain('Thank you for your order!');

    const completeText = await checkoutCompletePage.getConfirmationText();
    expect(completeText).toContain('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    
    // 9. Verify that the cart is empty.
    await expect(productsPage.shoppingCartBadge).toHaveCount(0);
    await productsPage.goToCart();
    await expect(cartPage.cartItems).toHaveCount(0);

    // 10. Log out from the system.
    await menuPage.logout();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(page).toHaveURL(/.*saucedemo\.com\//);
  });
});