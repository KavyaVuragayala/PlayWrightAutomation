import{test,expect} from '@playwright/test' ;

test('List of Titles', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client/auth/login");

    const email = page.locator("#userEmail");
    await email.fill("alicejeshvika69@gmail.com");

    const password = page.locator("#userPassword");
    await password.fill("Alice@1234567890");

    const loginButton = page.locator("[type='submit']");
    await loginButton.click();

    const productTitles = page.locator("h5 b");
    console.log(await productTitles.first().textContent());
    console.log(await productTitles.allTextContents());



}); 