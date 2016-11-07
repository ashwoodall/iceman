import { authenticate, register } from './methods'

const routes = (app, passport) => {
  app.post('/auth/login', authenticate)
  app.post('/auth/register', register)
}

export default routes