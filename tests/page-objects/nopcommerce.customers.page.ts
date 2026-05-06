import { expect, test, type Page } from "@playwright/test";
import BasePage from "./base.page.js";
import { log } from "../helpers/logger.js";
import pwHelper from "../helpers/pw-helper.js";

export default class NopCommerceCustomersPage extends BasePage {
  private CutomersMenu;
  private CustomersListItem;
  private searchFirstNameTextBox;
  private searchLastNameTextBox;
  private searchButton;
  private noDataAvailableInTableText;

  constructor(page: Page) {
    super(page);
    this.CutomersMenu = page.getByText("Customers", { exact: true });
    this.CustomersListItem = page.locator("//p[text()=' Customers']");
    this.searchFirstNameTextBox = page.locator('[name="SearchFirstName"]');
    this.searchLastNameTextBox = page.locator('[name="SearchLastName"]');
    this.searchButton = page.getByText("Search", { exact: true });
    this.noDataAvailableInTableText = page.getByText("No data available in table", { exact: true });
  }

  async validateCustomerSearch(firstName: string, lastName: string) {
    await this.CutomersMenu.first().click();
    await this.CustomersListItem.click();
    await log("info", `Searching customer with name: ${firstName} ${lastName}`);
    await this.typeInto(this.searchFirstNameTextBox, firstName);
    await this.typeInto(this.searchLastNameTextBox, lastName);
    await this.page.waitForTimeout(2000);
    return await this.noDataAvailableInTableText.isVisible();
  }
}
