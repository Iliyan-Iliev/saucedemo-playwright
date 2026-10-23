Bug Title: **User can place an order with empty cart**

Priority: High

Severity: High

**Steps to reproduce:**
1. Open the website - https://www.saucedemo.com/
2. Log in with user **standard_user** with password **secret_sauce**
3. Open the Cart using the cart icon. The cart should be empty
4. Checkout the empty cart
5. Populate all required fields with user's details
6. Continue the order.
7. Review and finish the order

**Observed behaviour:**

The application successfully completes the checkout process and displays the order confirmation page even though the cart was completely empty.

**Expected behaviour:**

The application should prevent users from proceeding to checkout with an empty cart (Examples -  disable the checkout button or show an error message stating the cart is empty).


Bug Title 2: **User can't add products to cart in Dynamic Catalog - Lazy Load mode**

Priority: Medium

Severity: Medium

**Steps to reproduce:**
1. Open the website - https://www.saucedemo.com/
2. Log in with user **standard_user** with password **secret_sauce**
3. Open Navigation Menu
4. Select Dynamic Catalog - Lazy Load
5. Try to open a product or add it to a cart

**Observed behaviour:**

The products can't be opened or added to a  cart

**Expected behaviour:**

User should be able to add open/add product in Dynamic Catalog - Lazy Load

Bug Title 3: **Wrong title and description of products**

Priority: Low

Severity: Low

**Steps to reproduce:**
1. Open the website - https://www.saucedemo.com/
2. Log in with user **standard_user** with password **secret_sauce**
3. Find the T-Shirt (Red)
4. Find the Sauce Labs Backpack


**Observed behaviour:**

T-Shirt (Red) has a strange title that starts with - Test.allTheThings()

Sauce Labs Backpack has a description that starts with carry.allTheThings()

**Expected behaviour:**

Unless the above are intentinal, they should be fixed with the correct words/translations.