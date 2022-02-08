import { MutationTree } from "vuex"
import { State } from "./state"
import { UserInformation } from "@/domain/users/Users.Model"
import { GateWayInformation, ProjectInformation, Report } from "@/domain/reports/Reports.Model"

export enum Mutation {
  SET_USERS = "SET_USERS",
  SET_PROJECTS = "SET_PROJECTS",
  SET_GATEWAYS = "SET_GATEWAYS",
  SET_REPORTS = "SET_REPORTS",
}

export type Mutations<S = State> = {
  [Mutation.SET_USERS](state: S, payload: UserInformation[]): void
  [Mutation.SET_PROJECTS](state: S, payload: ProjectInformation[]): void
  [Mutation.SET_GATEWAYS](state: S, payload: GateWayInformation[]): void
  [Mutation.SET_REPORTS](state: S, payload: Report[]): void
}

export const mutations: MutationTree<State> & Mutations = {
  [Mutation.SET_USERS](state: State, payload: UserInformation[]) {
    state.users = payload
  },

  [Mutation.SET_PROJECTS](state: State, payload: ProjectInformation[]) {
    state.projects = payload
  },

  [Mutation.SET_GATEWAYS](state: State, payload: GateWayInformation[]) {
    state.gateways = payload
  },

  [Mutation.SET_REPORTS](state: State, payload: Report[]) {
    state.reports = payload
  },
}
