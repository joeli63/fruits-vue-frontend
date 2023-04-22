import { IFruit } from "@/domain/fruits/Fruits.Models"

export interface State {
  debug: boolean
  version: string
  pageNumber: number
  fruitsPerPage: number
  fruits: IFruit[]
  nameFilter: string
  familyFilter: string
  total: number
  totalPage: number
}

const versionString =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_APP_VERSION + "-dev"
    : import.meta.env.VITE_APP_VERSION

export const state: State = {
  debug: import.meta.env.MODE === "development",
  version: versionString,
  pageNumber: 1,
  fruitsPerPage: 10,
  fruits: [],
  nameFilter: "",
  familyFilter: "",
  total: 0,
  totalPage: 1,
}
