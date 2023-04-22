import { ActionTree, ActionContext } from "vuex"

import { State } from "./state"
import { Mutations, Mutation } from "./mutations"
import { getFruitsData } from "@/domain/fruits/Fruits.Repository"

export enum Action {
  getFruits = "getFruits",
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, "commit">

export interface Actions {
  [Action.getFruits]({ state, getters, commit, dispatch }: AugmentedActionContext): void
}

export const actions: ActionTree<State, State> & Actions = {
  [Action.getFruits](context: AugmentedActionContext) {
    getFruitsData({
      page: context.rootState.pageNumber,
      perNumber: context.rootState.fruitsPerPage,
      name: context.rootState.nameFilter,
      family: context.rootState.familyFilter,
    }).subscribe((response) => {
      context.commit(Mutation.SET_FRUITS, response.fruits)
      context.commit(Mutation.SET_TOTAL, response.total)
    })
  },
}
