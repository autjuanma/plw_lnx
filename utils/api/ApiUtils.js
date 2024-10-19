class ApiUtils {
    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    // Define API endpoints as constants
    static API_ENDPOINTS = {
        CREATE_USER: 'https://your-api-url/create-user', // Replace with actual endpoint
        CREATE_ORDER: 'https://your-api-url/create-order', // Replace with actual endpoint
    };

    async getToken() {
        try {
            const loginResponse = await this.apiContext.post(ApiUtils.API_ENDPOINTS.CREATE_USER, {
                data: this.loginPayload,
            });

            if (!loginResponse.ok()) {
                throw new Error(`Failed to login: ${loginResponse.status()} - ${await loginResponse.text()}`);
            }

            const loginResponseJson = await loginResponse.json();
            const token = loginResponseJson.token;
            console.log(`Token retrieved: ${token}`);
            return token;
        } catch (error) {
            console.error(`Error in getToken: ${error.message}`);
            throw error; // Re-throw the error for further handling
        }
    }

    async createOrder(orderPayload) {
        try {
            if (!orderPayload || typeof orderPayload !== 'object') {
                throw new Error('Invalid order payload');
            }

            const token = await this.getToken();
            const orderResponse = await this.apiContext.post(ApiUtils.API_ENDPOINTS.CREATE_ORDER, {
                data: orderPayload,
                headers: {
                    'Authorization': `Bearer ${token}`, // Use Bearer token format
                    'Content-Type': 'application/json',
                },
            });

            if (!orderResponse.ok()) {
                throw new Error(`Failed to create order: ${orderResponse.status()} - ${await orderResponse.text()}`);
            }

            const orderResponseJson = await orderResponse.json();
            console.log(`Order response: ${JSON.stringify(orderResponseJson)}`);
            const orderId = orderResponseJson.orders[0]; // Ensure this is defined
            return { token, orderId }; // Return both token and orderId
        } catch (error) {
            console.error(`Error in createOrder: ${error.message}`);
            throw error; // Re-throw the error for further handling
        }
    }
}

module.exports = { ApiUtils };