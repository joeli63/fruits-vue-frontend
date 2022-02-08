import { MutationTree } from "vuex"
import { State } from "./state"
import { UserInformation } from "@/domain/users/Users.Model"
import { GateWay, Project } from "@/domain/reports/Reports.Model"

export enum Mutation {
  SET_USERS = "SET_USERS",
  SET_PROJECTS = "SET_PROJECTS",
  SET_GATEWAYS = "SET_GATEWAYS",
}

export type Mutations<S = State> = {
  [Mutation.SET_USERS](state: S, payload: UserInformation[]): void

  [Mutation.SET_PROJECTS](state: S, payload: Project[]): void

  [Mutation.SET_GATEWAYS](state: S, payload: GateWay[]): void
}

export const mutations: MutationTree<State> & Mutations = {
  [Mutation.SET_USERS](state: State, payload: UserInformation[]) {
    state.users = payload
  },

  [Mutation.SET_PROJECTS](state: State, payload: Project[]) {
    state.projects = payload
  },

  [Mutation.SET_GATEWAYS](state: State, payload: GateWay[]) {
    state.gateways = payload
  },
}
