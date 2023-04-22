import { MutationTree } from "vuex"
import { State } from "./state"
import { IFruit } from "@/domain/fruits/Fruits.Models"

export enum Mutation {
  SET_FRUITS = "SET_FRUITS",
  SET_TOTAL = "SET_TOTAL",
  SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
  SET_NAME = "SET_NAME",
  SET_FAMILY = "SET_FAMILY",
}

export type Mutations<S = State> = {
  [Mutation.SET_FRUITS](state: S, payload: IFruit[]): void
  [Mutation.SET_TOTAL](state: S, payload: number): void
  [Mutation.SET_CURRENT_PAGE](state: S, payload: number): void
  [Mutation.SET_NAME](state: S, payload: string): void
  [Mutation.SET_FAMILY](state: S, payload: string): void
}

export const mutations: MutationTree<State> & Mutations = {
  [Mutation.SET_FRUITS](state: State, payload: IFruit[]) {
    state.fruits = payload
  },
  [Mutation.SET_TOTAL](state: State, payload: number) {
    state.total = payload
    state.totalPage = Math.floor(payload / state.fruitsPerPage)
  },
  [Mutation.SET_CURRENT_PAGE](state: State, payload: number) {
    state.pageNumber = payload
  },
  [Mutation.SET_NAME](state: State, payload: string) {
    state.nameFilter = payload
  },
  [Mutation.SET_FAMILY](state: State, payload: string) {
    state.familyFilter = payload
  },
}
