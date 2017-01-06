export const registrationSchema = {
  'email': {
    notEmpty: true,
    isEmail: {
      errorMessage: 'Invalid Email'
    }
  },
  'password': {
    notEmpty: true,
    isLength: {
      options: [{ min: 8 }],
      errorMessage: 'Password must be at least 8 characters'
    },
    errorMessage: 'Invalid password'

  },
  'current_station': {
    notEmpty: true,
    errorMessage: 'Must include current_station'
  }
}

export const authenticationSchema = {
  'email': {
    notEmpty: true,
    isEmail: {
      errorMessage: 'Invalid Email'
    }
  },
  'password': {
    notEmpty: true,
    isLength: {
      options: [{ min: 8 }],
      errorMessage: 'Password must be at least 8 characters'
    },
    errorMessage: 'Invalid password'

  }
}

export const resetSchema = {
  'password': {
    notEmpty: true,
    isLength: {
      options: [{ min: 8 }],
      errorMessage: 'Password must be at least 8 characters'
    },
    errorMessage: 'Invalid password'

  }
}

export const forgotPasswordSchema = {
  'email': {
    notEmpty: true,
    isEmail: {
      errorMessage: 'Invalid Email'
    }
  }
}
