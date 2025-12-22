import{test,expect} from '@playwright/test' ;

test("Usage of Static Select Dropdown ",async({page})=>
{

    const username = page.locator("#username");
    const password = page.locator("#password")
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
    await username.fill("rahulshettyacademy ");
    await password.fill("learning");

    await page.locator(".customradio").last().click();
    await expect(page.locator(".customradio").last()).toBeChecked();            // assertion that user is been checked or not
    const isChecked = await page.locator(".customradio").last().isChecked();
    console.log(isChecked);                                                     // this stmt will return a boolean value if checked - true 

    await page.locator("#okayBtn").click();

    const dropdown = page.locator("select.form-control");                         // tagname.class  or .class
    await dropdown.selectOption("consult");

    await page.locator("#terms").click();
    await page.locator("#signInBtn").click();

   // await page.pause();   

});