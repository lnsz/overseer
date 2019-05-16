export interface NavLink {
  name: string,
  page?: string,
  border: boolean,
  action?: string
}

export interface Dashboard {
  _id: string,
  name: string,
  description: string,
  creator: string,
  stars: number,
  copies: number
}
