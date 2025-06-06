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


test('Dropdown Menu - animals, TAP', async ({ page }) => {

  // Go to https://testautomationpractice.blogspot.com/
  await page.goto("https://testautomationpractice.blogspot.com");

  // Select multiple options from dropdown menu
  const sortedList = page.locator("select#animals");
  await sortedList.selectOption(['Cheetah', 'Fox']);

  // Validate the options selected
  const selectedOptions = sortedList.locator('option:checked');
  expect(selectedOptions).toContainText(['Cheetah', 'Fox']);
  
  // Validate the number of available options in the dropdown menu
  const optionsCount = ((await sortedList.locator('option').all()).length);
  expect(optionsCount).toBe(10);

  await page.pause();
  
});


test('Dropdown Menu - colors, TAP (Karol)', async ({ page }) => {

  // Go to https://testautomationpractice.blogspot.com/
  await page.goto("https://testautomationpractice.blogspot.com");

  // Select multiple options from dropdown menu
  const colorsList = page.locator('select#colors');
  await colorsList.selectOption(['Green', 'Yellow']);

  // Validate the options selected
  const selectedOptions = colorsList.locator('option:checked');
  expect(selectedOptions).toContainText(['Green']);
  expect(selectedOptions).toContainText(['Yellow']);

  
  // Validate the number of available options in the dropdown menu
  const colorsListLenth = (await colorsList.locator('option').all()).length;
  expect(colorsListLenth).toBe(7);

  await page.pause();
  
});


test('Dropdown Menu - countries, TAP (Karol)', async ({page}) => {

  // Go to https://testautomationpractice.blogspot.com/
  await page.goto("https://testautomationpractice.blogspot.com");

  // Select an option from dropdown menu
  const countryList = page.locator('select#country');
  const country = 'United Kingdom'; 
  await countryList.selectOption(country);

  // Validate the options selected
  await expect(countryList.locator('option:checked')).toHaveText(country);

  // Validate the number of available options in the dropdown menu
  const countryCount =  (await (countryList.locator('option')).all()).length;
  expect(countryCount).toBe(10);

  await page.pause();

});


test('Radiobutton, TAP (Karol)', async ({page}) => {

  // Go to https://testautomationpractice.blogspot.com/
  await page.goto("https://testautomationpractice.blogspot.com");

  // Select an option 'Female' with radiobutton
  const fRadioButton = page.locator('input#female');
  const mRadioButton = page.locator('input#male');

  await fRadioButton.check();

  // Validate the options selected
  expect(fRadioButton).toBeChecked();
  expect(mRadioButton).not.toBeChecked();
  
  // Validate the number of available options in the Gender menu
  const genderButtons = page.locator('//input[@name="gender"]');
  const genderButtonsCount = await genderButtons.count();
  expect(genderButtonsCount).toBe(2);
 
  await page.pause();

});