import{test,expect,request} from '@playwright/test';

const loginPayload = {userEmail:"alicejeshvika69@gmail.com",userPassword:"Alice@1234567890"};
const orderPayload = {orders:[{country:"Algeria",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
let token;
let orderId;

test.beforeAll( async()=>
{
    // Login API
     const apiContext = await request.newContext();
     const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        { 
            data : loginPayload
        }
     )

     expect(loginResponse.ok()).toBeTruthy();  // 200 , 201

     const loginResponseJson = await loginResponse.json();
     token = loginResponseJson.token;

     console.log(token);


     // Create a new order directly with product orderid 
     const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",

        {
            data : orderPayload,
            headers : 
            {
                'Authorization' : token,
                'Content-type' : 'application/json'
            }
        })

        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        orderId = orderResponseJson.orders[0];
});

test.beforeEach( ()=>
{
    // executes before each 
})

test("WebAPI Automation",async({page})=>
{

    await page.addInitScript(value => {                         // addInitScript will take 2 arguments (function=>{},parameter)

        window.localStorage.setItem('token',value);
    } , token 
   );

    const productName = "ADIDAS ORIGINAL"
    const loginEmail= "alicejeshvika69@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    
  


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

    await page.pause();
    expect(orderId.includes(orderId_details)).toBeTruthy();

});