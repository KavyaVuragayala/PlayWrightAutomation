                                        // Same as P1_Ecommerce but here we are using Special Locators
import{test,expect} from '@playwright/test';

test("E2E with Special Locators", async({page})=>
{
    const productName = "ZARA COAT 3";
    const loginEmail= "alicejeshvika69@gmail.com";

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder("email@example.com").fill(loginEmail);
    await page.getByPlaceholder("enter your passsword").fill("Alice@1234567890");
    await page.getByText("Login").click();
    await page.locator(".card-body").first().waitFor();
    await page.locator(".card-body").filter({ hasText: "ZARA COAT 3" }).getByRole("button", { name: " Add To Cart" }).click();
    await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
    await page.locator("div li").first().waitFor();                                  // waiting for atleast one element to load 
    await page.getByText("ZARA COAT 3").isVisible();
    await page.getByRole("button",{name:"Checkout"}).click();
    await page.locator(".payment__shipping").waitFor();
    const shippingEmail = await page
    .locator(".payment__shipping input:not([placeholder])")
    .inputValue();
    expect(loginEmail).toBe(shippingEmail);
    await page.getByPlaceholder("Select Country").pressSequentially("ind",{delay:100});
    await page.getByRole("button",{name:" India"}).nth(1).click();
    await page.getByText("Place Order ").click();
    await page.getByText(" Thankyou for the order. ").isVisible();

});