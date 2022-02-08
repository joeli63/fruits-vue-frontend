import { Observable, map } from "rxjs"

import apiCall from "@/domain/Domain.Axios.Api"
import { UserInformation, UserResponse } from "./Users.Model"
import { userMap } from "./Users.Mapper"
import { DomainResponse } from "@/domain/Domain.Model"

export const getUsers = (): Observable<UserInformation[]> => {
  return apiCall
    .get<UserResponse[]>("users")
    .pipe(
      map((usersResponse: DomainResponse<UserResponse[]>) => userMap(usersResponse.data)),
    ) as Observable<UserInformation[]>
}
