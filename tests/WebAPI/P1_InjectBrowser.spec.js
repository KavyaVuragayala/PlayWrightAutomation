import{test,expect} from '@playwright/test';
let webContext;

test.beforeAll(async ({browser})=> 
{        
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("alicejeshvika69@gmail.com");
    await page.locator("#userPassword").fill("Alice@1234567890");
    await page.locator("[type = 'submit']").click();
    await page.waitForLoadState('networkidle');

    await context.storageState({path :'state.json'});                     // state.json is the file path 
    webContext = await browser.newContext({storageState : 'state.json'}); // injecting the existing data into browser

});

test("Inject Browser Context",async({})=>
{

    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

    const productName = "ADIDAS ORIGINAL"
    const loginEmail= "alicejeshvika69@gmail.com";

    await page.locator(".card-body b").first().waitFor();


    const products = page.locator(".card-body");
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

