import{test,expect} from '@playwright/test' ;

test('Extracting List of Titles', async({browser})=>
{

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client/auth/login");

    // register
    const register_link = page.locator(".text-reset");
    await register_link.click();

    const firstName = page.locator("#firstName");
    await firstName.fill("alice");

    const lastName = page.locator("#lastName");
    await lastName.fill("jesh");

    const email = page.locator("[placeholder='email@example.com']");
    await email.fill("alicejeshvika69@gmail.com");

    const phoneNumber = page.locator("#userMobile");
    await phoneNumber.fill("9876543210");

    const gender = page.locator("[value='Female']");
    await gender.click();

    const register_password = page.locator("#userPassword");
    await register_password.fill("Alice@1234567890");

    const confirm_password = page.locator("#confirmPassword");
    await confirm_password.fill("Alice@1234567890");

    const checkbox = page.locator("[type='checkbox']");
    await checkbox.click();

    const registerButton = page.locator("[value='Register']");
    await registerButton.click();



});
