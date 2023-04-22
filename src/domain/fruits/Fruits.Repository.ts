import { Observable, map } from "rxjs"

import apiCall from "@/domain/Domain.Axios.Api"
import { DomainResponse } from "@/domain/Domain.Model"
import { IFruit, IFruitFilter } from "./Fruits.Models"

interface IResponse {
  fruits: IFruit[]
  total: number
}

export const getFruitsData = (params: IFruitFilter): Observable<IResponse> => {
  return apiCall
    .get<IResponse>("fruits", params)
    .pipe(
      map((fruitsResponse: DomainResponse<IResponse>) => fruitsResponse as unknown),
    ) as Observable<IResponse>
}
