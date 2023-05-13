import Router from 'next/router'
import React, { createContext, useState, useEffect, use } from 'react'
import { set } from 'react-hook-form'

import Cookies from 'js-cookie'
import api from 'services/api'

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

type AuthContextType = {
  user: User | undefined
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isLogged: boolean
}

export type User = {
  id: number
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

type LoginResponse = {
  user: User
  token: string
}

export const AuthProvider = ({
  children
}: {
  children: React.ReactNode | Array<React.ReactNode>
}) => {
  const [user, setUser] = useState<User | undefined>()
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    setIsLogged(!!user)
  }, [user])

  useEffect(() => {
    const authToken = Cookies.get('authToken')
    if (authToken) {
      api
        .get<User>('/user/me')
        .then(({ data }) => setUser(data))
        .catch(() => {
          Cookies.remove('authToken')
          Router.push('/')
        })
    }
  }, [])

  const login = async (email: string, password: string) => {
    const request = api<LoginResponse>({
      url: '/auth/login',
      method: 'POST',
      data: { email, password }
    })
    const { data } = await request
    setUser(data.user)
    Cookies.set('authToken', data.token, { expires: 1 })
    Router.push('/dashboard')
  }

  const logout = async () => {
    Cookies.remove('authToken')
    setUser(undefined)
    await api.post('/auth/logout')
    Router.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
