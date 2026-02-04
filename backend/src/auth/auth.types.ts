export interface JwtPayload {
  sub: string
  role: 'CLIENT' | 'LAWYER'
}

export interface AuthUser {
  id: string
  role: 'CLIENT' | 'LAWYER'
}
