import useJwt from '@/auth/jwt/useJwt'

/**
 * Return if user is logged in
 * This is completely up to you and how you want to store the token in your frontend application
 * e.g. If you are using cookies to store the application please update this function
 */
// eslint-disable-next-line arrow-body-style
export const isUserLoggedIn = () => {
  return localStorage.getItem('userData') && localStorage.getItem(useJwt.jwtConfig.storageTokenKeyName)
}
export const isUserEmailVerified = () => {
  return localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).is_verified_email
}
export const isTwoFaChecked = () => {
  return JSON.parse(localStorage.getItem('isVerified2fa'))
}

export const getUserData = () => JSON.parse(localStorage.getItem('userData'))

export const save = (key, val) => {
  localStorage.setItem(key, JSON.stringify(val))
}
export const remove = (key) => localStorage.removeItem(key)
export const get = (key) => {
  const data = localStorage.getItem(key)
  if (data) {
    return JSON.parse(data)
  }
  return null
}

export const updateRegisterStep = (step) => {
  const storeStep = localStorage.getItem('step')
  console.log(step, storeStep)
  if (step > storeStep) {
    localStorage.setItem('step', step)
  }
}



/**
 * This function is used for demo purpose route navigation
 * In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 * Please note role field is just for showing purpose it's not used by anything in frontend
 * We are checking role just for ease
 * NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = userRole => {
  if (userRole === 'admin') return { name: 'admin-dashboard' }
  if (userRole === 'client') return { name: 'client-dashboard' }
  if (userRole === 'publisher') return { name: 'publisher-dashboard' }
  if (userRole === 'agent') return { name: 'agent-dashboard' }
  return { name: 'auth-login' }
}
