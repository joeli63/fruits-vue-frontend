export interface INutritions {
  calories: number
  carbohydrates: number
  fat: number
  protein: number
  sugar: number
}

export interface IFruit {
  id: number
  name: string
  family: string
  order: string
  genus: string
  nutritions: INutritions
}

export interface IFruitFilter {
  page?: number
  perNumber?: number
  name?: string
  family?: string
}
