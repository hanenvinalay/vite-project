// services/api.js
//const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export const API_URL = 'http://localhost:8000/api'
export const API_BASE_URL = API_URL

export async function fetchBase (endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw error
  }

  return response.json()
}
// services/authFetch.js

export function fetchAuth (endpoint, options = {}) {
  const token = localStorage.getItem('token')

  return fetchBase(endpoint, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...options.headers
    }
  })
}

export async function login (email) {
  const response = await fetchBase('/login', {
    method: 'POST',
    body: JSON.stringify({ email })
  })

  const { token, ...user } = response

  if (!token) {
    throw new Error('Token no recibido')
  }

  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))

  return user
}

export async function apiRequest (endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  })

  if (!response.ok) {
    let error
    try {
      error = await response.json()
    } catch {
      error = { message: 'Error en la petición' }
    }

    throw new Error(error.message || `Error ${response.status}`)
  }

  return response.json()
}
// services/authApi.js

export function authenticatedRequest (endpoint, options = {}) {
  const token = localStorage.getItem('token')

  if (!token) {
    throw new Error('No autenticado')
  }

  return apiRequest(endpoint, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...options.headers
    }
  })
}
// services/session.js
export function getUser () {
  const rawUser = localStorage.getItem('user')

  if (!rawUser) return null

  try {
    return JSON.parse(rawUser)
  } catch {
    return null
  }
}
export async function getOrder (orderNumber) {
  return authenticatedRequest(`/orders/${orderNumber}`)
}
