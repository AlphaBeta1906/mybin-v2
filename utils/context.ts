import react, { ContextType } from "react"

export interface userObject{
    id?: number,
    username?: string,
    email?: string,
    role?: string,
    activate_status?: boolean,
    error?: boolean
}

interface token{
    token?: string,
    refresh_token?: string
}

export const UserContext = react.createContext<userObject[] | null >(null)
const UserProvider = UserContext.Provider

export const ThemeContext = react.createContext("light")
const ThemeProvider = ThemeContext.Provider

export const TokenContext = react.createContext<token>({})
const TokenProvider = TokenContext.Provider

export { UserProvider, ThemeProvider,TokenProvider }