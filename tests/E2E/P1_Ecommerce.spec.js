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
    await email.fill(loginEmail);
    await password.fill("Alice@1234567890");
    await loginBtn.click();

   // await page.waitForLoadState('networkidle');
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


  await page.locator(".payment__shipping").waitFor();

const shippingEmail = await page
  .locator(".payment__shipping input:not([placeholder])")
  .inputValue();

    
    expect(loginEmail).toBe(shippingEmail);

    await page.locator("[placeholder*='Select Country']").pressSequentially("ind", { delay: 100 });
    const dropdown = page.locator("[class*='ta-result']");
    await dropdown.waitFor();

    const dropdownCount = await dropdown.locator("button").count();
    for(let i=0; i<dropdownCount; ++i)
    {
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text === " India"){
            await dropdown.locator("button").nth(i).click();
            break;
        }

    }

    await expect(page.locator(".user__name [type='text']").first()).toHaveText(loginEmail);

    await page.locator(".action__submit").click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);


    await page.locator("button[routerlink*='/dashboard/myorders']").click();
    await page.locator("tbody").waitFor();

    const rows= page.locator("tbody tr");

    for(let i=0; i<await rows.count();i++){

       const rowOrderID = await rows.locator("th").nth(i).textContent();
       if(orderId.includes(rowOrderID)){

        await rows.locator("button").first().click();
        break;

       }
    }
    
    const orderId_details = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderId_details)).toBeTruthy();

});