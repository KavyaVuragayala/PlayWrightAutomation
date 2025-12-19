import {test,expect} from '@playwright/test' ;
import { error } from 'node:console';
import { constrainedMemory } from 'node:process';

test('Locators of PlayWright ',async({browser})=>
{

    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator("#username");
    const passWord = page.locator("[name='password']");
    const button = page.locator("#signInBtn");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
    //invalid credentials
    await userName.fill("alice");
    await passWord.fill("alice123");
    await button.click();

    // extracting the error from webpage
    const error_locator = page.locator("[style*='block']");
    console.log(await error_locator.textContent());

    //assertion
    await expect(error_locator).toContainText("Incorrect");

    // valid credentials
    await userName.fill("");   // this will erase the previous content
    await userName.fill("rahulshettyacademy");
    await passWord.fill("learning");
    await button.click();

    const cardTitles = page.locator(".card-body a");
    console.log(await cardTitles.first().textContent());
    //console.log(element_webpage.last().textContent());      // first() and last()
   // console.log(element_webpage.nth(0).textContent());     // indexing
    console.log(await cardTitles.nth(1).textContent());
});
