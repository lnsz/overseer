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
  copies: number,
  refreshTimer: number,
  locked: boolean,
  style: any,
  layout: any,
  tileSettings: any,
  permissions: {
    users: any[]
  }
}

export interface FabData {
  name: string,
  icon: string,
  click?: () => void
}
