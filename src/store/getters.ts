import { GetterTree } from "vuex"
import { State } from "./state"
import { UserInformation } from "@/domain/users/Users.Model"

export type Getters = {
  currentUser(state: State): UserInformation | null
}

export const getters: GetterTree<State, State> & Getters = {
  currentUser(state) {
    return state.users.length ? state.users[0] : null
  },
}
