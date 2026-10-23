import { BasePage } from './BasePage';

export class NavigationMenuPage extends BasePage {
  constructor(page) {
    super(page);
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.menuContainer = page.locator('.bm-menu-wrap');
  }

  async openMenu() {
    await this.menuButton.click();
    await this.menuContainer.waitFor({ state: 'visible' });
  }

  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }

}