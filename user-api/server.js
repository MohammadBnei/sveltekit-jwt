require('rootpath')();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const errorHandler = require('./_middleware/error-handler');

if (process.env.NODE_ENV !== 'production') {
    const morgan = require('morgan');
    app.use(morgan('dev'))
}
const cors = require('cors');
app.use(cors({
    credentials: true,
}));
app.options('*', cors())

app.use(express.json());
app.use(cookieParser());

// allow cors requests from any origin and with credentials
// api routes
app.use('/accounts', require('./accounts/accounts.controller'));

// swagger docs route
app.use('/api-docs', require('./_helpers/swagger'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000;
app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
