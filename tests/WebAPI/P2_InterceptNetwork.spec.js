import{test,expect,request} from '@playwright/test';

const loginPayload = {userEmail:"alicejeshvika69@gmail.com",userPassword:"Alice@1234567890"};
const orderPayload = {orders:[{country:"Algeria",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
let token;
let orderId;
let fakePayloadOrders = {data:[],message:"No Orders"};

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

test("Intercept Network Response Calls ",async({page})=>
{

    await page.addInitScript(value => {                         // addInitScript will take 2 arguments (function=>{},parameter)

        window.localStorage.setItem('token',value);
    } , token 
   );

    const productName = "ADIDAS ORIGINAL"
    const loginEmail= "alicejeshvika69@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");



    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/694575f032ed8658713f44ad",
       async route => {
            // interception the response 
            const response = await page.request.fetch(route.request());       
            let body = JSON.stringify(fakePayloadOrders);
            route.fulfill()
            {
                response,
                body
            };
        }
    );
    
  


    await page.locator("button[routerlink*='/dashboard/myorders']").click();
    console.log(await page.locator(".mt-4").textContent());

    
    

});