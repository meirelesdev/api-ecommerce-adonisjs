'use strict'

const Route = use('Route')

Route.group(() => { 
     // Rotas de categorias
    Route.resource('categories', 'CategoryController').apiOnly()
    // Rotas Coupons
    Route.resource('coupons', 'CouponController').apiOnly()
    // Rotas Images
    Route.resource('images', 'ImageController').apiOnly()
    // Rotas Orders
    Route.resource('orders', 'OrderController').apiOnly()
    // Rotas Products
    Route.resource('products', 'ProductController').apiOnly()
    // Rotas Users
    Route.resource('users', 'UserController').apiOnly()    
})
.prefix('v1/admin')
.namespace('Admin')