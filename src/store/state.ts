import { Project, GateWay } from "@/domain/reports/Reports.Model"
import { UserInformation } from "@/domain/users/Users.Model"

export interface State {
  debug: boolean
  version: string
  users: UserInformation[]
  projects: Project[]
  gateways: GateWay[]
}

const versionString =
  import.meta.env.MODE === "development" ? import.meta.env.VITE_APP_VERSION + "-dev" : import.meta.env.VITE_APP_VERSION

export const state: State = {
  debug: import.meta.env.MODE === "development",
  version: versionString,
  users: [],
  projects: [],
  gateways: [],
}
