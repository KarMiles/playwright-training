import { test, expect } from "@playwright/test";


test('getByRole() Locators', async ({ page }) => {

  // Locate elements by their explicit or implicit ARIA roles.

  // Go to website
  await page.goto("https://testautomationpractice.blogspot.com/p/playwrightpractice.html");
  const cookieDismissButton = page.locator('a#cookieChoiceDismiss');
  await expect(cookieDismissButton).toBeVisible();


  // Buttons
  const primaryActionButton = page.getByRole("button", {name: /Primary Action/});
  await expect(primaryActionButton).toBeVisible();
  
  const toggleButton = page.getByRole("button", {name: /Toggle Button/});
  await expect(toggleButton).toBeVisible();

  const divWithButtonRole = page.getByRole("button", {name: 'Div with button role'});
  await expect(divWithButtonRole).toBeVisible();

  // Form elements
  const inputBox = page.getByRole("textbox", {name: "Username" });
  await expect(inputBox).toBeVisible();

  // Checkbox
  const checkbox = page.getByRole("checkbox", {name: /Accept terms/});
  await checkbox.click();
  expect(checkbox).toBeChecked;

  // Navigation
  // link
  const navProducts = page.getByRole("menuitem", {name: "Products"});
  expect(navProducts).toBeVisible();

  // alert
  const alertMessage = page.getByRole("alert").filter(
    { hasText: "This is an important alert message!" }
  );
  await expect(alertMessage).toBeVisible();


});


