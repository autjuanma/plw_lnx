class APiUtils {

    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }


    async getToken() {

        const loginResponse = await this.apiContext.post("endpoint create user",

            {
                data: this.loginPayload

            })

        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }


    async createOrder(orderPayLoad) {

        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("htpps://",

        {
            data: orderPayLoad,
            headers: {

                'Authorization': response.token,
                'Content-type': 'application/json'
            },

        })

        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson)
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
        return response;

    }
}

module.exports= {APiUtils};