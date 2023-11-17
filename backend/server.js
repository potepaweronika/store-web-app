const express = require('express');
const cors = require('cors');
const session = require('express-session');
const app = express();

app.use(express.json());
app.use(cors());

app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: true,
}));

app.get('/', (req, res) => {
  console.log(req.sessionID); // This will log the session ID
});

const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const sessionRoutes = require('./routes/session');

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/session', sessionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
