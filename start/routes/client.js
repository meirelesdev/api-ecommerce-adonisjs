'use strict'

const Route = use('Route')


Route.group(() => { 
    Route.resource('products', 'ProductController') .apiOnly()
    Route.resource('orders', 'OrderController') .apiOnly()
})
.prefix('v1')
.namespace('Client')