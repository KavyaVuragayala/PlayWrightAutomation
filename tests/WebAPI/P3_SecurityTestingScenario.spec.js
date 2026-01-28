import{test,expect} from '@playwright/test';

test("Security Testing Scenario for Intercepting Network Calls ",async({browser})=>
{

    const context = await browser.newContext();
    const page = await context.newPage();
    const productName = "ADIDAS ORIGINAL"
    const loginEmail= "alicejeshvika69@gmail.com";

    const email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginBtn = page.locator("[type = 'submit']");

    const products = page.locator(".card-body");

   
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await email.fill(loginEmail);
    await password.fill("Alice@1234567890");
    await loginBtn.click();

   // await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();


     await page.locator("button[routerlink*='/dashboard/myorders']").click();

     await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue( {url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=769FBD07LB26809FB8'})
    
     )

    await page.locator("button:has-text('View')").first().click();

    await expect(page.locator(".blink_me")).toHaveText("You are not authorize to view this order");

});