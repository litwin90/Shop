const users = require('./db/users.json');
const products = require('./db/products.json');
const cart = require('./db/cart.json');
const orders = require('./db/orders.json');
const settings = require('./db/app-settings.json');

module.exports = function() {
    return {
        users,
        products,
        cart,
        orders,
        settings,
    }
}
