import { ActionTree, ActionContext } from "vuex"

import { State } from "./state"
import { Mutations, Mutation } from "./mutations"

import { getUsers } from "@/domain/users/Users.Repository"
import { UserInformation } from "@/domain/users/Users.Model"
import {
  GateWayInformation,
  ProjectInformation,
  Report,
  ReportFilter,
} from "@/domain/reports/Reports.Model"
import { getProjects, getGateways, postReport } from "@/domain/reports/Reports.Repository"

export enum Action {
  getUsers = "getUsers",
  getProjects = "getProjects",
  getGateways = "getGateways",
  filterReports = "filterReports",
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, "commit">

export interface Actions {
  [Action.getUsers]({ state, getters, commit, dispatch }: AugmentedActionContext): void
  [Action.getProjects](
    { state, getters, commit, dispatch }: AugmentedActionContext,
    userId: string,
  ): void
  [Action.getGateways](
    { state, getters, commit, dispatch }: AugmentedActionContext,
    userId: string,
  ): void
  [Action.filterReports](
    { state, getters, commit, dispatch }: AugmentedActionContext,
    filterOptions: ReportFilter,
  ): void
}

export const actions: ActionTree<State, State> & Actions = {
  [Action.getUsers](context: AugmentedActionContext) {
    getUsers().subscribe((response: UserInformation[]) => {
      context.commit(Mutation.SET_USERS, response)
    })
  },

  [Action.getProjects](context: AugmentedActionContext) {
    getProjects(context.getters.currentUser.userId).subscribe((response: ProjectInformation[]) => {
      context.commit(Mutation.SET_PROJECTS, response)
    })
  },

  [Action.getGateways](context: AugmentedActionContext) {
    getGateways(context.getters.currentUser.userId).subscribe((response: GateWayInformation[]) => {
      context.commit(Mutation.SET_GATEWAYS, response)
    })
  },

  [Action.filterReports](context: AugmentedActionContext, filterOptions: ReportFilter) {
    postReport(filterOptions).subscribe((response: Report[]) => {
      context.commit(Mutation.SET_REPORTS, response)
    })
  },
}
