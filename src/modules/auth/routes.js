import { authenticate, register, forgotPassword, resetPassword } from './methods'

const routes = (app) => {
  app.post('/auth/login', authenticate)
  app.post('/auth/register', register)
  app.post('/auth/forgot', forgotPassword)
  app.post('/auth/reset/:token', resetPassword)
}

export default routes
