This example demonstrates a basic Express server that listens on port 3000 and responds with "Hello from Express!" to
any GET request to the root path ("/"). It also includes error handling.

```javascript
const express = require('express');
const app = express();
const port = 3000;

// Basic GET route
app.get('/', (req, res) => {
res.send('Hello from Express!');
});


//Error Handling Middleware
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).send('Something broke!');
});


// Start the server
app.listen(port, () => {
console.log(`Server listening on port ${port}`);
});
```

**To run this code:**

1. **Install Express:** If you don't have it already, open your terminal and navigate to the directory where you'll save
this code. Then run:
```bash
npm install express
```

2. **Save the code:** Save the code above as a file named `server.js` (or any name you prefer with a `.js` extension).

3. **Start the server:** In your terminal, navigate to the directory containing `server.js` and run:
```bash
node server.js
```

4. **Test it:** Open your web browser and go to `http://localhost:3000`. You should see "Hello from Express!"


**More Advanced Example (with JSON response):**

This example shows a route that returns JSON data:

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // for parsing application/json

app.get('/data', (req, res) => {
const data = { message: 'Hello from Express with JSON!', timestamp: Date.now() };
res.json(data);
});

//Error Handling Middleware
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).send('Something broke!');
});

app.listen(port, () => {
console.log(`Server listening on port ${port}`);
});
```

This version uses `express.json()` middleware to parse JSON requests. Remember to restart the server after making
changes to the code. You can then test the `/data` endpoint in your browser or using tools like `curl`. The response
will be JSON formatted. This is very common for APIs. Remember to install express: `npm install express`


Remember to replace `"Hello from Express!"` with your desired response. This is a very basic example, and you can expand
it by adding more routes, middleware, and functionality as needed for your application.