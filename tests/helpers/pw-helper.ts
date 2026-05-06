 import {test, expect,type Page, Locator} from "@playwright/test";

 //Full page screenshot helper function
  async function takeFullPageScreenshot(page:Page,screenshotName:string) {
    const screenshotPath =await  page.screenshot({fullPage:true});
    await test.info().attach(screenshotName, {
      body: screenshotPath,      contentType: "image/png",
    })
  }

//Element screenshot helper function
 async function takeElementScreenshot(element: Locator, screenshotName:string) {
    const screenshotPath = await element.screenshot();
    await test.info().attach(screenshotName, {
        body: screenshotPath,
        contentType: "image/png",
    });
}

export default{takeFullPageScreenshot,takeElementScreenshot};