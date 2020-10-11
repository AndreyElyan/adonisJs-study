'use strict'

const User = use('App/Models/User')

class ForgotPasswordController {
  async store ({ request }) {
    const email = request.input('email')
    const user = await User.findBy('email', email)

    user.token = '123123'
    user.token_created_at = new Date()

    await user.save()
  }
}

module.exports = ForgotPasswordController
