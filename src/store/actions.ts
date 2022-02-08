import { ActionTree, ActionContext } from "vuex"

import { State } from "./state"
import { Mutations, Mutation } from "./mutations"

import { getUsers } from "@/domain/users/Users.Repository"
import { UserInformation } from "@/domain/users/Users.Model"
import { GateWay, Project } from "@/domain/reports/Reports.Model"
import { getProjects, getGateways } from "@/domain/reports/Reports.Repository"

export enum Action {
  getUsers = "getUsers",
  getProjects = "getProjects",
  getGateways = "getGateways",
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload?: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, "commit">

export interface Actions {
  [Action.getUsers]({ state, commit, dispatch }: AugmentedActionContext): void
  [Action.getProjects]({ state, commit, dispatch }: AugmentedActionContext): void
  [Action.getGateways]({ state, commit, dispatch }: AugmentedActionContext): void
}

export const actions: ActionTree<State, State> & Actions = {
  [Action.getUsers](context: AugmentedActionContext) {
    getUsers().subscribe((response: UserInformation[]) => {
      context.commit(Mutation.SET_USERS, response)
    })
  },

  [Action.getProjects](context: AugmentedActionContext) {
    getProjects().subscribe((response: Project[]) => {
      context.commit(Mutation.SET_PROJECTS, response)
    })
  },

  [Action.getGateways](context: AugmentedActionContext) {
    getGateways().subscribe((response: GateWay[]) => {
      context.commit(Mutation.SET_GATEWAYS, response)
    })
  },
}
