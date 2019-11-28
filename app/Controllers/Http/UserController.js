'use strict'

const User = use('App/Models/User');
const { validateAll } = use('Validator');

class UserController {

    create ({ view }) {
        return view.render('user.create');
    }

    async store ({ auth, session, request, response }) {
        const data = request.only(['username', 'email', 'password', 'password_confirmation'])
    
        const validation = await validateAll(data, {
          username: 'required|unique:users',
          email: 'required|email|unique:users',
          password: 'required',
          password_confirmation: 'required_if:password|same:password',
        })
    
        if (validation.fails()) {
          session
            .withErrors(validation.messages())
            .flashExcept(['password'])
    
          return response.redirect('back')
        }
    
        delete data.password_confirmation
    
        const user = await User.create(data)

        await auth.login(user)
    
        return response.redirect('/')
    }

    async login ({ auth, request }) {

        const { username, password } = request.all();

        console.log(username, password)

        await auth.attempt(username, password);
    
        return 'Logged in successfully';
    }

    show ({ auth, params }) {
        if (auth.user.id !== Number(params.id)) {
          return "You cannot see someone else's profile";
        }
        return auth.user;
    }

}

module.exports = UserController
