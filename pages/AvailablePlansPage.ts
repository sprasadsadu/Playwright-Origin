import { expect, request } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';


export class AvailablePlans {
  readonly page: Page;
  readonly addressInput: Locator;
  readonly addressSuggestions: Locator;
  readonly electricityCheckbox: Locator;
  readonly plansList: Locator;
  readonly planLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addressInput = page.locator('//*[@id="address-lookup-label"]');
    this.addressSuggestions = page.locator('//p[@data-id="connectionAddressInput-autocomplete-textfield-helper-text"]');    
    this.electricityCheckbox = page.locator('(//input[@type="checkbox" and @checked])').first();
    this.plansList = page.locator('(//table[@data-id="table"])').first();
    this.planLink = page.locator('//*[contains(@data-id, "fact")]').first(); 
    // this.planLink = page.locator('//*[contains(@data-id, "Rewards") and contains(@data-id, "gas")]').first();
  }

  async navigateToOriginSite() {
    await this.page.goto('https://www.originenergy.com.au/pricing.html');
  }

  async searchAndSelectAddress(address: string)
    {
    const addressInput = this.page.getByRole('combobox', { name: 'Your address' });

    await addressInput.click();
    await addressInput.fill('');
    await addressInput.type(address, { delay: 100 });
    // Wait for and click first matching suggestion
    const suggestion = this.page.locator('[role="option"]'); 
    await suggestion.first().waitFor({ state: 'visible', timeout: 4000 });
    await suggestion.first().click();  
    }

    async verifyPlansAreVisible() {
    await this.page.waitForTimeout(5000);
    await expect(this.plansList).toBeTruthy;
    }  

    async uncheckElectricityIfChecked() {
    if (await this.electricityCheckbox.isChecked()) {    
      await this.electricityCheckbox.uncheck();  
    }
}

async downloadPDFAndAssertGasPlan(): Promise<Page> 
  {
  await this.planLink.waitFor({ state: 'visible' }); // ensure it's ready

  const [newTab] = await Promise.all([
    this.page.context().waitForEvent('page'),
    this.planLink.click()
  ]);

  await newTab.waitForLoadState('load');
  const pdfUrl = newTab.url();
  
  // Download and assert PDF content
  const apiContext = await request.newContext();
  const pdfResponse = await apiContext.get(pdfUrl);
  expect(pdfResponse.ok()).toBeTruthy();
  const buffer = await pdfResponse.body();
  
  const downloadsDir = path.resolve('../downloads');
      if (!fs.existsSync(downloadsDir)) {
        fs.mkdirSync(downloadsDir, { recursive: true });
      }
      const filePath = path.join(downloadsDir, 'plan-details.pdf');
      fs.writeFileSync(filePath, buffer);
      console.log('PDF downloaded:', filePath);
  
  const pdfParse = require('pdf-parse');
  const parsed = await pdfParse(buffer);
  expect(parsed.text).toContain('Gas');

  return newTab;
  }

}