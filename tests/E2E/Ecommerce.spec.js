import{test,expect} from '@playwright/test';

test("End to End Flow of Ecommerce Website",async({browser})=>
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
    await email.fill("alicejeshvika69@gmail.com");
    await password.fill("Alice@1234567890");
    await loginBtn.click();

    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();


    const count = await products.count();
    for(let i=0; i<count; ++i){

        if(await products.nth(i).locator("b").textContent() == productName ){

            await products.nth(i).locator("text = Add To Cart").click();
            break;

        }

    }


    await page.locator("[routerlink='/dashboard/cart']").click();                    // [routerlink*='cart']
    await page.locator("div li").first().waitFor();                                  // waiting for atleast one element to load 
    const visible =  await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    expect(visible).toBeTruthy();

    await page.locator("text=Checkout").click();

    /*
    await page.locator("div:has-text('Credit Card Number') input").fill("4545 9931 4545 9931");
    await page.locator("div:has-text('CVV Code') input").fill("123");
    await page.locator("div:has-text('Name on Card') input").fill("Alice");

    await page.locator("div:has-text('Apply Coupon') input").fill("rahulshettyacademy");
    await page.locator("button:has-text('Apply Coupon')").click();
    */


    const shippingEmail = await page.locator("div:has-text('Shipping Information') input").inputValue();
    expect(loginEmail).toBe(shippingEmail);

    await page.locator("[placeholder*='Select Country']").pressSequentially("ind", { delay: 100 });
    const dropdown = page.locator("[class*='ta-result']");
    dropdown.waitFor();

    const dropdownCount = await dropdown.locator("button").count();
    for(let i=0; i<dropdownCount; ++i)
    {
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text === " India"){
            await dropdown.locator("button").nth(i).click();
            break;
        }

    }






    await page.pause();



    
});