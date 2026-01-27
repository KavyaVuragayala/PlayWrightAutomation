export class APIUtils{

    constructor(apiContext,loginPayload){

        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

   async getToken(){

    // Token for Login API
        
         const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            { 
                data : this.loginPayload
            } 
         );// 200,201
    
         const loginResponseJson = await loginResponse.json();
         const token = loginResponseJson.token;
    
         console.log(token);
         return token;

   }

   async createOrder(orderPayload) {
    
    // Create a new order directly with product orderid 

        let response = {};  
        response.token = await this.getToken();                                                                                            // JavaScript Object
         const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    
            {
                data : orderPayload,
                headers : 
                {
                    'Authorization' : response.token,            // this refers to current class
                    'Content-type' : 'application/json'
                }
            });
    
            const orderResponseJson = await orderResponse.json();
            console.log(orderResponseJson);
            const orderId = orderResponseJson.orders[0];
            response.orderId = orderId;
            return response;

   }


}

//export {APIUtils};
