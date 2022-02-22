require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = require('./router');
app.use('/', router);

// Error handling middleware
app.use((error, req, res, next) => {

    console.log("Error Handling Middleware called", req.path)

    const statusCode = error.statusCode || 500;
    const status = error.status || 'error';
    const message = error.message || 'oops';
  
    res.status(statusCode).json({
      status: status,
      message: message
    });
})

app.get('*', (req, res) => {
    res.json({ ok: true });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`\n Server is running on http://localhost:${port}\n`);
});