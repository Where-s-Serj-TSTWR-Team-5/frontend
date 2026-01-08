interface User {
  id?: number,
  userName: string,
  email: string,
  password: string,
  points: number,
  createdAt?: Date,
  updatedAt?: Date
}

export type { User };