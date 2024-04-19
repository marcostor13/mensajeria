export interface Session{
    user: User
    token: string
}

export interface User{
    _id?: string
    name: string
    email: string
}

export interface UserPayload{
    password: string
    email: string
}
