'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('home');


Route.group(() => {
  Route.get('login', 'SessionController.create')
  Route.post('login', 'UserController.login')
  Route.get('register', 'UserController.create')
  Route.post('register', 'UserController.store')
}).middleware(['guest'])

// AUTH
Route
  .post('login', 'UserController.login')
  .middleware('guest')

Route
  .get('users/:id', 'UserController.show')
  .middleware('auth')

  Route.group(() => {
    Route.get('logout', 'SessionController.delete')
  }).middleware(['auth'])