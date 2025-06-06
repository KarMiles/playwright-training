import { test, expect } from "@playwright/test";

test('Home page', async ({ page }) => {
  // Session 1

  // 1. Log in to this website using the scripts from today’s demo.
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  expect(await page.getByLabel("Username").isVisible());

  const username = page.getByPlaceholder("Username");
  await username.fill("Admin");

  const password = page.getByPlaceholder("Password");
  await password.fill("admin123");

  const login_button = page.getByRole("button", { name: "Login" });
  await login_button.click();

  // 2. After logging in, click on the ‘Admin’ link on the left side of the page using the page.getByText function.
  const admin_link = page.getByText("Admin");
  await admin_link.click();

  // 3. Click the ‘Reset’ button using the page.getByRole function.
  const reset_button = page.getByRole("button", { name: "Reset" });
  await reset_button.click();

  // 4. Verify the company logo is visible on the page using the page.getByAltText function.
  const logo = page.getByAltText("client brand banner");
  expect(await logo.isVisible());

  // 5. Verify the ‘User Role’ label is present using the page.getByLabel function.
  const userrole_label = page.getByLabel("User Role");
  expect(await userrole_label.isVisible());

  // 6. Ensure the search textbox is visible by checking its placeholder using the page.getByPlaceholder function.
  const search_textbox = page.getByPlaceholder("Search");
  expect(await search_textbox.isVisible());

  await page.pause();
});


// LOCATORS
// page.getByRole() to locate by explicit and implicit accessibility attributes.
// page.getByText() to locate by text content.
// page.getByLabel() to locate a form control by associated label's text.
// page.getByPlaceholder() to locate an input by placeholder.
// page.getByAltText() to locate an element, usually image, by its text alternative.
// page.getByTitle() to locate an element by its title attribute.
// page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).
// From: https://playwright.dev/docs/locators