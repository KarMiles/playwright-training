import { test, expect } from "@playwright/test";

const timeoutTime = 60000;

async function runDisclaimers(page: any) {
  // Dismiss initial modal
  const initialModalDismissButton = page.locator('#CybotCookiebotDialogBodyButtonDecline');
  if (await initialModalDismissButton.isVisible()) {
    await initialModalDismissButton.click();
  }

  // Dismiss ad
  const addDismissButton = page.locator("//span[text()='Close']");
  if (await addDismissButton.isVisible()) {
    await addDismissButton.click();
  }
};


test('Test 1. Navigation', async ({ page }) => {
  // 1. Goto this page https://demoqa.com
  await page.goto('https://demoqa.com', { waitUntil: 'domcontentloaded' });
  await runDisclaimers(page);


  // 2. Click on the Alerts, Frame & Windows
  const alertsFrameWindowsLink = page.locator('//h5[text()="Alerts, Frame & Windows"]');
  await expect(alertsFrameWindowsLink).toBeVisible(); // Ensure the link is visible before clicking
  await alertsFrameWindowsLink.click();


  // 3. Click on the Alerts
  const alertsSubMenuLink = page.locator('//span[text()="Alerts"]');
  await expect(alertsSubMenuLink).toBeVisible(); // Ensure the sub-menu link is visible
  await alertsSubMenuLink.click();
});
  
  
// 4. Click on the 'Click me' button in front of the 'Click Button to see alert',
// verify the text on the pop up modal and the text displayed after closing the pop up modal window
test('Test 2. Alert', async ({ page }) => {    
  
  await page.goto('https://demoqa.com/alerts', { waitUntil: 'domcontentloaded' });
  await runDisclaimers(page); 

  page.on('dialog', async dialog => {
    expect(dialog.message()).toContain('You clicked a button');
    expect(dialog.type()).toBe('alert');
    await dialog.accept(); 
  });
  
  const alertButton = page.locator('#alertButton');
  await expect(alertButton).toBeEnabled();
  await alertButton.click();
  // no text displayed after closing the modal
});


// 5. Click on the 'Click me' button in front of the 'On button click, confirm box will appear',
// verify the text on the pop up modal and the text displayed after closing the pop up modal window
test('Test 3. Confirm', async ({ page }) => {

  await page.goto('https://demoqa.com/alerts', { waitUntil: 'domcontentloaded' });
  await runDisclaimers(page); 

  page.on('dialog', async dialog => {
    expect(dialog.type()).toBe('confirm');
    expect(dialog.message()).toContain('Do you confirm action?');
    await dialog.accept();
  });
  
  const confirmButton = page.locator('#confirmButton');
  await expect(confirmButton).toBeVisible();
  await confirmButton.click();

  // Check result
  const confirmResult = page.locator('#confirmResult');
  await confirmResult.waitFor({ state: 'visible', timeout: timeoutTime });
  await expect(confirmResult).toContainText(/You selected Ok/);
});


// 6. Click on the 'Click me' button in front of the 'On button click, prompt box will appear',
// verify the text on the pop up modal, the text displayed after accept the pop up modal window
test('Test 4. Prompt box accept', async ({ page }) => {

  await page.goto('https://demoqa.com/alerts', { waitUntil: 'domcontentloaded' });
  await runDisclaimers(page); 

  page.on('dialog', async dialog => {
    expect(dialog.type()).toBe('prompt');
    expect(dialog.message()).toContain('Please enter your name');
    await dialog.accept('Abc 123');
  });
  
  const promptBoxButton = page.locator('#promtButton');
  await expect(promptBoxButton).toBeVisible();
  await promptBoxButton.click();

  // Check result
  const promptResult = page.locator('#promptResult');
  await promptResult.waitFor({ state: 'visible', timeout: timeoutTime });
  await expect(promptResult).toContainText(/You entered Abc 123/);
});


// 7. Click on the 'Click me' button in front of the 'On button click, prompt box will appear',
// verify the text on the pop up modal, the text displayed after dismiss the pop up modal window
test('Test 5. Prompt box dismiss', async ({ page }) => {

  await page.goto('https://demoqa.com/alerts', { waitUntil: 'domcontentloaded' });
  await runDisclaimers(page); 

  page.on('dialog', async dialog => {
    expect(dialog.type()).toBe('prompt');
    expect(dialog.message()).toContain('Please enter your name');
    await dialog.dismiss();
  });
  
  const promptBoxButton = page.locator('#promtButton');
  await expect(promptBoxButton).toBeVisible();
  await promptBoxButton.click();

  // Check result
  const promptResult = page.locator('#promptResult');
  await expect(promptResult).toBeHidden();
});
