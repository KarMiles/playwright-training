import { test, expect } from "@playwright/test";


test('Dropdown Menu - Version 1', async ({ page }) => {

  // Go to Version 1 website
  await page.goto("https://www.version1.com/");
  await page.getByText('Deny').click();
  
  // Select the Blog link from the page
  const blogLink = page.locator('//a[text()="Blog"]');
  await blogLink.click();

  // Select any option from the dropdown menu (Single)
  const blogList = page.locator('#taxonomyFilter');
  await blogList.selectOption('Innovation');

  // Validate the option selected
  const selectedOptionText = await blogList.locator('option:checked').textContent();
  expect(selectedOptionText?.trim()).toBe('Innovation');

  // Validate the number of available options in the dropdown menu
  const options = blogList.locator('option');
  const optionsCount = await options.count();
  expect(optionsCount).toBe(4);

});


test('Dropdown Menu - Test Automation Practice', async ({ page }) => {

  // Go to https://testautomationpractice.blogspot.com/
  await page.goto("https://testautomationpractice.blogspot.com");

  // Select multiple options from dropdown menu
  const sortedList = page.locator(
    "//label[@for='animals']/following::select[@id='animals']");
  await sortedList.selectOption(['Cheetah', 'Fox']);

  // Validate the options selected
  const selectedOptions = sortedList.locator('option:checked');
  expect(selectedOptions).toContainText(['Cheetah', 'Fox']);
  
  // Validate the number of available options in the dropdown menu
  const optionsCount = ((await sortedList.locator('option').all()).length);
  expect(optionsCount).toBe(10);

  await page.pause();
  
});