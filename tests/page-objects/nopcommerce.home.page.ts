import { expect, test, type Page } from "@playwright/test";
import BasePage from "./base.page.js";
import { log } from "../helpers/logger.js";
import pwHelper from "../helpers/pw-helper.js";


export default class HomePage extends BasePage {
  private usernameTextBox;
  private passwordTextBox;
  private loginButton;
  private errorMessage;

  constructor(page: Page) {
    super(page);
    this.usernameTextBox = page.getByRole("textbox", { name: "Email:" });
    this.passwordTextBox = page.getByRole("textbox", { name: "Password:" });
    this.loginButton = page.getByRole("button", { name: "LOG IN" });
    this.errorMessage = page.locator(".message-error");
  }

  async loginToNopCommerceApp(url: string, userName: string, password: string) {
    await log("info", `logging in with username: ${url}`);
    await this.navigateTo(url);
    await this.typeInto(this.usernameTextBox, userName);
    await this.typeInto(this.passwordTextBox, password);
    await this.click(this.loginButton);
    //assert the URL
    return this.page.url();
  }

  async getErrorMessage() {
    return await this.page.textContent(this.errorMessage);
  }

}
