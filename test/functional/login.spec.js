'use strict'
const { test, trait, afterEach } = use('Test/Suite')('User registration')

const Mail = use('Mail')
const User = use('App/Models/User')

trait('Test/ApiClient')

afterEach(async () => {
  await User.query().delete()
})

test('Criar um usuário', async ({ client, assert }) => {
  Mail.fake()
  const response = await client
    .post('/users')
    .send({
      username: 'John Snow',
      email: 'John.snow@got.com',
      password: 'daenarys'
    }).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    username: 'John Snow',
    email: 'John.snow@got.com'
  })

  const user = await User.find(1) // busca pelo id 1

  assert.equal(user.toJSON().email, 'John.snow@got.com')

  Mail.restore()
})

test('Não criar um novo usuário', async ({ client, assert }) => {
  Mail.fake()

  const response = await client
    .post('/users')
    .end()

  response.assertStatus(500) // sei que ele vai me retornar 500 pq não fiz tratamento de erros

  const user = await User.findBy('email', 'John.snow@got.com') // busca pelo email

  assert.isNull(user)

  Mail.restore()
})
