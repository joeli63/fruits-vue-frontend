import { GetterTree } from "vuex"
import { State } from "./state"
import { IFruit } from "@/domain/fruits/Fruits.Models"

export type Getters = {
  currentFruits(state: State): IFruit[]
}

export const getters: GetterTree<State, State> & Getters = {
  currentFruits(state) {
    return state.fruits
  },
}
