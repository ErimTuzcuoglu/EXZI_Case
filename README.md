# EXZI_Case Backend Case

This project is a Node.js application that provides real-time functionality for cryptocurrency pairs through WebSocket connections. It includes features such as subscribing to cryptocurrency pairs, adding buy/sell orders, canceling orders, and executing trades. The application is built with modern JavaScript frameworks, ensuring scalability, maintainability, and performance.

---

## Prerequisites
   - **Node.js version 18 or higher:** Make sure your Node.js version is compatible. You can verify your version with:

```bash
node -v
```
   - **Redis:** Need to run before start the application. If you use Docker, you can skip to run Redis.

   - **Docker:** If you prefer to run with containerization ensure Docker is installed and running on your system.

---
## Getting Started
### Installation

1- Clone the repository:

```bash
git clone https://github.com/ErimTuzcuoglu/EXZI_Case.git
cd EXZI_Case
```

2- Install dependencies:

```bash
yarn
```

## Running the Application
### Local Development

To run the application locally using Docker in development mode (Recommended):

```bash
yarn docker:development
```

Or with Node.js (You also need run run redis before execute the below command):

```bash
yarn development
```

### Production Mode

For running the application in production mode using Docker:

```bash
yarn docker:production
```

Or with Node.js (You also need run run redis before execute the below command):

```bash
yarn build && yarn production
```

---
## Docs 
 The application will run at **3000** port in development, in production **5000**. 

### WebSocket Testing

You can test the WebSocket connection by using a WebSocket client plugin. Here are two recommended options:

- Firefox: [Socket.IO Client](https://addons.mozilla.org/en-US/firefox/addon/socketio-client/) 
- Chrome: [Socket.IO Client](https://chromewebstore.google.com/detail/socketio-test-client/ophmdkgfcjapomjdpfobjfbihojchbko?hl=en) 

### Steps to Test WebSocket:

- Install the WebSocket client plugin for your browser.
- Open the plugin and establish a connection using your WebSocket server URL:

```bash
http://localhost:3000 
```

- After connecting, you can send events and receive real-time updates.

![I'll take this job](/docs/1.png)

---
### WebSocket Events

### **1. Subscribe to a Pair**

   Event: `'subscribe-pair'`
   ***Request Body:**
   ```json
   { "pair": "BTC-USD" }
   ```

### 2. **Unsubscribe from a Pair**  
   Event: `'unsubscribe-pair'`  
   **Request Body:**  
   ```json
   { "pair": "BTC-USD" }
   ```

### 3. **Add a Buy/Sell Order**  
   Event: `'add-order'`  
   **Request Body:**  
   ```json
   {
       "pair": "BTC-USD",
       "order": {
           "type": "BUY",
           "price": 1000,
           "amount": 1
       }
   }
   ```

### 4. **Cancel an Order**  
   Event: `'cancel-order'`  
   **Request Body:**  
   ```json
   {
       "pair": "BTC-USD",
       "orderId": "ba526458-f68e-4d4b-8fc9-9b5cb732fa9e"
   }
   ```

---

## Example Flow

1. Establish a WebSocket connection to the server.
2. Subscribe to a pair, e.g., `"BTC-USD"`.
3. Add a buy/sell order to the subscribed pair.
4. Cancel an order using its unique `orderId`.
5. Receive real-time updates on the order book changes for the subscribed pair via `orderbook_updates` event.

---

## Unit Tests

This project includes comprehensive test coverage for:
- WebSocket communication.
- Order book operations.

To run the tests:  
```bash
yarn test
```

---

## Built With
- **Node.js**
- **Redis** for caching and real-time data management.
- **Socket.IO** for WebSocket communication.
- **Jest** for unit testing.

---