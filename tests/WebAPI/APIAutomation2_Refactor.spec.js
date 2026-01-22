import{test,expect,request} from '@playwright/test';
import { APIUtils } from '../utils/APIUtils';

const loginPayload = {userEmail:"alicejeshvika69@gmail.com",userPassword:"Alice@1234567890"};
const orderPayload = {orders:[{country:"Algeria",productOrderedId:"6960eac0c941646b7a8b3e68"}]};

let response;

test.beforeAll( async()=>
{
    //Login API 
     const apiContext = await request.newContext();
     const apiUtils = new APIUtils(apiContext,loginPayload);
    response = apiUtils.createOrder(orderPayload);

     
})

test.beforeEach( ()=>
{
    // executes before each 
})

test("WebAPI Automation",async({page})=>
{

    await page.addInitScript(value => {                         // addInitScript will take 2 arguments (function=>{},parameter)

        window.localStorage.setItem('token',value);
    } , response.token 
   );

    await page.goto("https://rahulshettyacademy.com/client");
    
  


    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();

    const rows= page.locator("tbody tr");

    for(let i=0; i<await rows.count();i++){

       const rowOrderID = await rows.locator("th").nth(i).textContent();
       if(response.orderId.includes(rowOrderID)){

        await rows.locator("button").first().click();
        break;

       }
    }
    
    const orderId_details = await page.locator(".col-text").textContent();

   // await page.pause();
    expect(response.orderId.includes(orderId_details)).toBeTruthy();

});