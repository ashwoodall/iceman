import { authenticate, register } from './methods'

const routes = (app) => {
  app.post('/auth/login', authenticate)
  app.post('/auth/register', register)
}

export default routes
