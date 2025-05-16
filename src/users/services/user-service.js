
import User from '../model/user.entity.js'

const dummyUsers = [
  new User({ id: 1, name: 'Cliente Juan', email: 'cliente@example.com', password: '1234', role: 'cliente' }),
  new User({ id: 2, name: 'Diseñador Valentino', email: 'disenador@example.com', password: 'abcd', role: 'disenador' }),
]

export async function loginUser(email, password) {
  const user = dummyUsers.find(
    (u) => u.email === email && u.password === password
  )
  return user || null
}

export async function registerUser(data) {
  const newUser = new User({ ...data, id: Date.now(), role: data.role || 'cliente' })
  dummyUsers.push(newUser)
  return newUser
}

export function getCurrentUser() {
    const user = localStorage.getItem('currentUser')
    return user ? JSON.parse(user) : null
  }
  
  export function logoutUser() {
    localStorage.removeItem('currentUser')
  }
  
