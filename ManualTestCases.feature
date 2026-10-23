Positive scenario

Feature: E-commerce Product Purchase and Checkout Flow
  As a standard user of Swag Labs
  I want to be able to sort products, manage my shopping cart, and complete an order
  So that I can successfully purchase items and download an order PDF

  Scenario: User sorts products, updates shopping cart, completes checkout, and logs out
    # 1. Login
    Given the user navigates to "https://www.saucedemo.com"
    Then the "Login" page should be displayed
    When the user logs in with username "standard_user" and password "secret_sauce"
    Then the user should be landed on the "Products" page

    # 2. First Product Addition (Price Low to High)
    When the user sorts products by "Price (low to high)"
    And the user adds the most expensive product to the cart
    Then the cart badge count should increase by 1

    # 3. Second Product Addition (Name Z to A)
    When the user sorts products by "Name (Z to A)"
    And the user adds the first product to the cart
    And the user adds the second product to the cart
    Then the cart badge count should increase by 2

    # 4. Cart Management
    When the user opens the shopping cart
    And the user removes the cheapest product from the cart
    Then the cart badge count should decrease by 1

    # 5. Checkout Process & Verification
    When the user proceeds to checkout
    And the user enters the following client details:
      | First Name | Last Name | Zip/Postal Code |
      | John       | Doe       | 1784           |
    Then the checkout overview page should display the correct selected products
    And the total price should be calculated correctly

    # 6. Order Completion, PDF Generation, and Logout
    When the user finishes the order
    And the user generates the PDF order summary
    And the user returns to the home page
    And the user opens the navigation menu
    And the user selects "Log Out"
    Then the "Login" page should be displayed


Negative scenario 1:
Feature: Checkout Form Validation
  As a standard user of Swag Labs
  I want to be notified when required client details are missing during checkout
  So that I am prompted to fill in all mandatory information before placing an order

  Background:
    Given the user navigates to "https://www.saucedemo.com"
    Then the "Login" page should be displayed
    When the user logs in with username "standard_user" and password "secret_sauce"
    Then the user should be landed on the "Products" page
    When the user adds the first product to the cart
    Then the cart badge count should increase by 1
    When the user opens the shopping cart
    And the user proceeds to checkout

  Scenario Outline: Verify error messages when mandatory client details are missing
    When the user enters First Name "<First Name>", Last Name "<Last Name>", and Zip Code "<Zip Code>"
    And the user attempts to continue checkout
    Then the error message "<Error Message>" should be displayed

    Examples:
      | First Name | Last Name | Zip Code | Error Message                   |
      |            |           |          | Error: First Name is required   |
      | John       |           |          | Error: Last Name is required    |
      | John       | Doe       |          | Error: Postal Code is required  |



Negative scenario 2:

Feature: User Authentication & Access Control
  As a user with a locked account
  I want to be informed when my login attempt fails
  So that I know why access to the store is restricted

  Scenario: User attempts to log in with a locked user account
    Given the user navigates to "https://www.saucedemo.com"
    Then the "Login" page should be displayed
    When the user logs in with username "locked_out_user" and password "secret_sauce"
    Then the user should remain on the "Login" page
    And the error message "Epic sadface: Sorry, this user has been locked out." should be displayed

Negative scenario bonus:

Feature: Checkout Resilience & Network Disruption
  As a standard user of Swag Labs
  I want the application to handle network disruptions gracefully during checkout
  So that my order details are not lost and I receive a clear error notification

  Scenario: Internet connection drops during order submission
    Given the user navigates to "https://www.saucedemo.com"
    Then the "Login" page should be displayed
    When the user logs in with username "standard_user" and password "secret_sauce"
    Then the user should be landed on the "Products" page
    When the user adds the first product to the cart
    Then the cart badge count should increase by 1
    When the user opens the shopping cart
    And the user proceeds to checkout
    And the user enters the following client details:
      | First Name | Last Name | Zip/Postal Code |
      | John       | Doe       | 12345           |
    And the user simulates an offline network connection
    And the user attempts to finish the order
    Then an error message "Network error: Please check your internet connection" should be displayed
    And the order should not be placed

Edge case scenario:

Feature: Empty Cart Checkout Flow
  As a standard user of Swag Labs
  I want to attempt a checkout with an empty cart
  So that I can verify the system handles empty cart conditions correctly

  Scenario: User attempts to checkout without adding any products to the cart
    Given the user navigates to "https://www.saucedemo.com"
    Then the "Login" page should be displayed
    When the user logs in with username "standard_user" and password "secret_sauce"
    Then the user should be landed on the "Products" page
    When the user opens the shopping cart
    And the user proceeds to checkout
    And the user enters the following client details:
      | First Name | Last Name | Zip/Postal Code |
      | John       | Doe       | 1784           |
    And the user finishes the order