import Cookies from 'js-cookie'

const TokenKey = 'loginToken'

export function getToken() {
  //console.info(Cookies.get(TokenKey))
  return Cookies.get(TokenKey)

}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
