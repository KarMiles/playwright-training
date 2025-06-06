import { test, expect } from "@playwright/test";

test('Admin page', async ({ page }) => {

  /*
  Xpath 
  //tagName[@attribute ='value']               e.g.  //input[@name="username"]
  //tagName[starts-with(@attribute, value)]
  //tagName[contains(@attribute, value)]
  //tagName[text()='actualText']
  
  CSS Selector
  tageName[attribute ='value']                 e.g. input[name="username"]
  You can replace id attribute with #
  You can replace class attribute with .
  However, I will suggest you keep to the first option as it more reliable and stable
  */

  // Homework for this session
  // Use mixture of xpath and CSS to locate the element on the page

  // 1. Log in to this website using the scripts from last week demo.
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  expect(await page.getByLabel("Username").isVisible());

  const username = page.getByPlaceholder("Username");
  await username.fill("Admin");

  const password = page.getByPlaceholder("Password");
  await password.fill("admin123");

  const login_button = page.getByRole("button", { name: "Login" });
  await login_button.click();


  // 2. After logging in, click on the ‘Admin’
  const admin_link = page.locator("a span:has-text('Admin')");
  await admin_link.click();


  // 3. Enter username and Employee Name 

  // Define Username
  // CSS
  // const username_input = page.locator(
  //   "div.oxd-input-group:has(label:has-text('Username')) input.oxd-input");

  // XPath
  const username_input = page.locator(
    "//label[text()='Username']/following::input[contains(@class, 'oxd-input')][1]");
  // const username_input = page.locator(
  //   "//div[@data-v-957b4417] /input[starts-with(@class, 'oxd-input')]");

  // Define Employee Name
  // CSS
  // const employeename_input = page.locator(
  //   "input[placeholder='Type for hints...']");
  // XPath
  const employeename_input = page.locator(
    "//input[@placeholder='Type for hints...']");


  // Fill textboxes
  await username_input.fill("test");
  await employeename_input.fill("test");

  // Select suggestion
  // const suggestions_list = page.locator(
  //   "//div[data-v-75e744cd]//div[starts-with(@class, 'oxd-autocomplete-text-input')] li:visible").first();
  // await expect(suggestions_list).toBeVisible();

  // 4. Click on Search button
  // CSS
  const search_button = page.getByRole("button", { name: "Search" });
  // XPath
  // const search_button = page.locator("//button[contains(text(), 'Search')]");

  await search_button.click();


  await page.pause();
});
