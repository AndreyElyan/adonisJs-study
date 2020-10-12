'use strict'

const User = use('App/Models/User')
const Mail = use('Mail')

class UserController {
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])

    const user = await User.create(data)

    await Mail.send('emails.welcome', user.toJSON(), message => {
      message
        .to(user.email)
        .from('andrey.silveira@ilegra.com')
        .subject('Seja bem vindo')
    })

    return user
  }
}

module.exports = UserController
