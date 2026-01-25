//
//const API_URL = "https://chatroom.fantickets.cloud/api";

import { API_URL } from './index'

export const getToken = () => localStorage.getItem('token')
export const setToken = token => localStorage.setItem('token', token)
export const clearToken = () => localStorage.removeItem('token')

export async function login (email) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || 'Error al iniciar sesión')
  }

  const data = await res.json()

  // Guardar token
  const token = data.token || data.access_token
  setToken(token)
}

export async function fetchProfileData () {
  const token = getToken()
  if (!token) throw new Error('No token')

  try {
    const res = await fetch(`${API_URL}/profile`, {
      headers: { Authorization: 'Bearer ' + token }
    })

    if (!res.ok) {
      const errorData = await res
        .json()
        .catch(() => ({ message: 'Error de conexión' }))
      throw new Error(
        errorData.message || `Error ${res.status}: ${res.statusText}`
      )
    }

    return res.json()
  } catch (error) {
    console.error('[v0] Profile fetch error:', error)
    throw error
  }
}

export async function getProfile () {
  const token = getToken()
  if (!token) throw new Error('No token')

  try {
    const res = await fetch(`${API_URL}/profile`, {
      headers: { Authorization: 'Bearer ' + token }
    })

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        clearToken()
        throw new Error('Token expired or invalid')
      }
      const errorData = await res
        .json()
        .catch(() => ({ message: 'Error de conexión' }))
      throw new Error(
        errorData.message || `Error ${res.status}: ${res.statusText}`
      )
    }

    return res.json()
  } catch (error) {
    console.error('[v0] Get profile error:', error)
    throw error
  }
}

export async function transferTickets ({
  recipient_email,
  recipient_name,
  recipient_lastname,
  ticket_ids,
  event_id
}) {
  const token = getToken()
  if (!token) throw new Error('No token')

  try {
    const res = await fetch(`${API_URL}/ticket-transfers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({
        recipient_email,
        recipient_name,
        recipient_lastname,
        ticket_ids,
        event_id
      })
    })

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        clearToken()
        throw new Error('Token expired or invalid')
      }
      const errorData = await res
        .json()
        .catch(() => ({ message: 'Error de conexión' }))
      throw new Error(
        errorData.message || `Error ${res.status}: ${res.statusText}`
      )
    }

    return res.json()
  } catch (error) {
    console.error('[v0] Transfer tickets error:', error)
    throw error
  }
}

export async function acceptTransfer (transferNumber) {
  const token = getToken()
  if (!token) throw new Error('No token')

  try {
    const res = await fetch(
      `${API_URL}/ticket-transfers/${transferNumber}/accept`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      }
    )

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        clearToken()
        throw new Error('Token expired or invalid')
      }
      const errorData = await res
        .json()
        .catch(() => ({ message: 'Error de conexión' }))
      throw new Error(
        errorData.message || `Error ${res.status}: ${res.statusText}`
      )
    }

    return res.json()
  } catch (error) {
    console.error('[v0] Accept transfer error:', error)
    throw error
  }
}

export async function getTransferByNumber (transferNumber) {
  const token = getToken()
  if (!token) throw new Error('No token')

  try {
    const res = await fetch(`${API_URL}/ticket-transfers/${transferNumber}`, {
      headers: { Authorization: 'Bearer ' + token }
    })

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        clearToken()
        throw new Error('Token expired or invalid')
      }
      const errorData = await res
        .json()
        .catch(() => ({ message: 'Error de conexión' }))
      throw new Error(
        errorData.message || `Error ${res.status}: ${res.statusText}`
      )
    }

    return res.json()
  } catch (error) {
    console.error('Get transfer error:', error)
    throw error
  }
}
