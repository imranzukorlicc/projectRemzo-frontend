import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import api from '../api/client'

type User = { id: number; name: string; email: string }
type Ctx = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<Ctx>(null!)
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      api.get('/user').then((r) => setUser(r.data)).catch(() => localStorage.removeItem('token'))
    }
  }, [])

  const login = async (email: string, password: string) => {
    const r = await api.post('/login', { email, password })
    localStorage.setItem('token', r.data.token) // prilagodi ako backend vraća drugi naziv
    const me = await api.get('/user')
    setUser(me.data)
  }

  const register = async (name: string, email: string, password: string) => {
    await api.post('/register', { name, email, password })
    await login(email, password)
  }

  const logout = async () => {
    try { await api.post('/logout') } finally {
      localStorage.removeItem('token')
      setUser(null)
    }
  }

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
}