import{test,expect} from '@playwright/test';

test("PlayWright Special Locators",async({page})=>
{

    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    await page.getByLabel("Check me out if you Love IceCreams!").click();                //check(); can also be used for checkboxes and radio buttons
    await page.getByLabel("Employed").check();

    await page.getByPlaceholder("password").fill("abc1234");

    await page.getByLabel("Gender").selectOption("Female");

    await page.getByRole("button" , {name:"Submit"}).click();

    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    
    await page.getByRole("link",{name:"Shop"}).click();

    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click();
});