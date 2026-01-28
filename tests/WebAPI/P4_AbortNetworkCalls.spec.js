import{test,expect} from '@playwright/test' ;
import { request } from 'node:http';

test("Aborting the Network calls and Printing the Request and Response Calls ",async({page})=>
{

   // await page.locator("**/*.css",route => route.abort());    ---> aborting a call / url to reach the server 
    const username = page.locator("#username");
    const password = page.locator("#password");

    // printing all the request and response calls with status codes
    page.on('request',request => console.log(request.url()));
    page.on('response',response => console.log(response.url(),response.status()));


    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
    await username.fill("rahulshettyacademy ");
    await password.fill("learning");

    await page.locator(".customradio").last().click();
    await expect(page.locator(".customradio").last()).toBeChecked();           
    const isChecked = await page.locator(".customradio").last().isChecked();
    console.log(isChecked);                                                    

    await page.locator("#okayBtn").click();

    const dropdown = page.locator("select.form-control");                        
    await dropdown.selectOption("consult");

    await page.locator("#terms").click();

   const documentLink = page.locator("[href*='documents-request']");
   await expect(documentLink).toHaveAttribute("class","blinkingText");
   

    await page.locator("#signInBtn").click();

   // await page.pause();   

});