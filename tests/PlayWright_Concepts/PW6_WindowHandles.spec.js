import{test,expect} from '@playwright/test';

test("Handling Child Windows",async({browser})=>
{
 
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator("#username");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise");

    const documentlink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([                                           // when there is parallel execution 
    context.waitForEvent('page'),
    documentlink.click(),
    ])

    const text = await newPage.locator(".red").textContent();
    console.log(text);
   
    const arrayText = text.split("@");
    const domain = arrayText[1].split(".")[0];

    //console.log(domain);

    await username.fill(domain);
    // await page.pause();
    console.log(await username.inputValue());  // textContent will not retrun the value entered in the input box because we are entering the value that is not attached 
                                            // to the page dom i.e we are capturing and passing in username field , inputValue() will return the value entered in that input box 
    


});