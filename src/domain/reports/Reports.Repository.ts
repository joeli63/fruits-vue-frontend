import { Observable, map } from "rxjs"

import apiCall from "../Domain.Axios.Api"
import { DomainResponse } from "../Domain.Model"
import { projectMapper, gatewayMapper } from "./Reports.Mapper"
import {
  GateWay,
  Project,
  ProjectInformation,
  GateWayInformation,
  ReportFilter,
  Report,
} from "./Reports.Model"

export const getProjects = (userId: string): Observable<ProjectInformation[]> => {
  return apiCall
    .get<Project[]>("projects")
    .pipe(
      map((usersResponse: DomainResponse<Project[]>) => projectMapper(usersResponse.data, userId)),
    ) as Observable<ProjectInformation[]>
}

export const getGateways = (userId: string): Observable<GateWayInformation[]> => {
  return apiCall
    .get<GateWay[]>("gateways")
    .pipe(
      map((usersResponse: DomainResponse<GateWay[]>) => gatewayMapper(usersResponse.data, userId)),
    ) as Observable<GateWayInformation[]>
}

export const postReport = (item: ReportFilter): Observable<Report[]> => {
  return apiCall
    .post<Report[]>("report", item)
    .pipe(
      map((reportsResponse: void | DomainResponse<Report[]>) => reportsResponse?.data),
    ) as Observable<Report[]>
}
