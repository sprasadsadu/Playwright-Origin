import { test } from '@playwright/test';
import { AvailablePlans } from '../pages/AvailablePlansPage.js';
import testdata from '../testdata/addresses.json' with { type: "json" };

test.describe('Origin Energy Plan Flow', () => {
  for (const address of testdata.addresses)
  {
    test(`Verify gas plan price details PDF for address: ${address}`, async ({ page }) => {
      const availablePlans = new AvailablePlans(page);
      await availablePlans.navigateToOriginSite();
      await availablePlans.searchAndSelectAddress(address);
      await availablePlans.verifyPlansAreVisible();
      await availablePlans.uncheckElectricityIfChecked();
      await availablePlans.verifyPlansAreVisible();
      await availablePlans.downloadPDFAndAssertGasPlan();      
    });
  }
});
