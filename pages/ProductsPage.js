import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { CartPage } from './CartPage';

export class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    this.title = page.locator('.title');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.activeSortOptionLabel = page.locator('.active_option');
    this.inventoryItems = page.locator('.inventory_item');
  }

  static SORT_OPTIONS = Object.freeze({
      NAME_A_TO_Z: { value: 'az', text: 'Name (A to Z)' },
      NAME_Z_TO_A: { value: 'za', text: 'Name (Z to A)' },
      PRICE_LOW_TO_HIGH: { value: 'lohi', text: 'Price (low to high)' },
      PRICE_HIGH_TO_LOW: { value: 'hilo', text: 'Price (high to low)' }
    });

  async goToCart() {
    const cartPage = new CartPage(this.page);
    await this.shoppingCartLink.click();
    await cartPage.title.waitFor({ state: 'visible' });
  }

/**
   * Selects an option from the dropdown and validates that the correct text option was selected.
   * @param {{ value: string, text: string }} optionObj - An entry from ProductsPage.SORT_OPTIONS
   */
  async sortProductsBy(optionObj) {
    if (!optionObj || !optionObj.value || !optionObj.text) {
      throw new Error('Invalid sort option object passed. Expected an object with { value, text }.');
    }

    await this.sortDropdown.selectOption(optionObj.value);

    const selectedText = await this.activeSortOptionLabel.textContent();
    
    if (selectedText.trim() !== optionObj.text) {
      throw new Error(
        `Sort option selection validation failed! Expected visible text: "${optionObj.text}", but found: "${selectedText.trim()}".`
      );
    }
  }

  async addLowestPriceProductBySorting() {
    await this.sortProductsBy(ProductsPage.SORT_OPTIONS.PRICE_LOW_TO_HIGH);
    // First inventory item after sorting will be the lowest price item
    const lowestPriceText = await this.inventoryItems.first().locator('.inventory_item_price').textContent();
    
    const lowPrice = parseFloat(lowestPriceText.replace('$', ''));
    console.log("lowest price: " + lowPrice);
    const count = await this.inventoryItems.count();
    const highestPriceText = await this.inventoryItems.nth(count - 1).locator('.inventory_item_price').textContent();
    const highPrice = parseFloat(highestPriceText.replace('$', ''));
    console.log("highest price: " + highPrice);
    if (lowPrice < highPrice) {
        await this.inventoryItems.first().locator('button').click();
      } else {
        throw new Error(`Sorting validation failed: Expected lowest price (${lowPrice}) to be less than the highest price (${highPrice}).`);
      }
  }

async addHighestPriceProductBySorting() {
    await this.sortProductsBy(ProductsPage.SORT_OPTIONS.PRICE_HIGH_TO_LOW);

    const highestPriceText = await this.inventoryItems.first().locator('.inventory_item_price').textContent();
    const highPrice = parseFloat(highestPriceText.replace('$', ''));

    const count = await this.inventoryItems.count();
    const lowestPriceText = await this.inventoryItems.nth(count - 1).locator('.inventory_item_price').textContent();
    const lowPrice = parseFloat(lowestPriceText.replace('$', ''));

    if (highPrice > lowPrice) {
      await this.inventoryItems.first().locator('button').click();
    } else {
      throw new Error(
        `Sorting validation failed: Expected highest price (${highPrice}) to be greater than lowest price (${lowPrice}).`
      );
    }
  }

async addLastAlphabeticProduct() {
    await this.sortProductsBy(ProductsPage.SORT_OPTIONS.NAME_A_TO_Z);

    const firstProductText = await this.inventoryItems.first().locator('.inventory_item_name').textContent();
    console.log("firstProduct: " + firstProductText);

    const count = await this.inventoryItems.count();
    const lastItem = this.inventoryItems.nth(count - 1);
    const lastProductText = await lastItem.locator('.inventory_item_name').textContent();
    console.log("lastProductText: " + lastProductText);

    // (firstProduct should come before or equal to lastProduct, so result should be <= 0)
    const comparisonResult = firstProductText.localeCompare(lastProductText);
    
    if (comparisonResult > 0) {
      throw new Error(
        `Sorting validation failed: First product ("${firstProductText}") should come before last product ("${lastProductText}") alphabetically.`
      );
    }

    await lastItem.locator('button').click();
  }
}