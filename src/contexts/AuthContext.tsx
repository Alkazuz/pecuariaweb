import React, { createContext, useState, useEffect } from 'react'
import { set } from 'react-hook-form'

import api from 'services/api'

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

type AuthContextType = {
  user: User | undefined
  loading: boolean
  login: (email: string, password: string) => void
  logout: () => void
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
  const [token, setToken] = useState<string | undefined>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Aqui você deve interagir com um serviço de autenticação
    // Por exemplo, verificar se o usuário já está logado
    // e, em caso afirmativo, definir o estado do usuário.
    // Após a conclusão, você deve definir o estado de carregamento como false.

    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const { data } = await api.post<LoginResponse>('/login', {
      email,
      password
    })
    setUser(data.user)
    setToken(data.token)
  }

  const logout = () => {
    // Aqui você faria logout do usuário, possivelmente invalidando uma sessão no seu backend
    // Em seguida, você deve definir o estado do usuário como null.
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, token }}>
      {children}
    </AuthContext.Provider>
  )
}
