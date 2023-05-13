import Router from 'next/router'
import React, { createContext, useState, useEffect } from 'react'

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

  const login = async (email: string, password: string) => {
    const { data } = await api.post<LoginResponse>('/auth/login', {
      email,
      password
    })
    setUser(data.user)
    Cookies.set('authToken', data.token, { expires: 1 })
  }

  const logout = async () => {
    Cookies.remove('authToken')
    setUser(undefined)
    await api.get('/auth/logout')
    Router.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
