//const {test} = require('@playwright/test');   
import { test, expect} from '@playwright/test'; // importing @playwright/test jar 

test('First PlayWright Code',async ()=>
{
    //wait
    //step 1: open browser
    //wait
    //step 2 : enter username,password
    //wait
    //step 3 : click submit
 
});

test('Browser Context PlayWright', async({browser})=>
{
    // async({browser}) ---> {browser} -> declaring the playwright browser 
    const context = await browser.newContext();  // opens a new browser , we can also pass the cookies etc into newContext();
    const page = await context.newPage();  // opens a new page 
    await page.goto("https://www.w3schools.com/");
     console.log(await page.title()); 

});

test('Page PlayWright Test', async({page})=>
{
    await page.goto("https://www.google.com"); // is there is no cookie or anything to be passed then we can skip context and declare {page}-> this directly open the new page 
    //get title and add assertion
    console.log(await page.title()); // prints title
    await expect(page).toHaveTitle("Google");

});
