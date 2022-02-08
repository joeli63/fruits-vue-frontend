import { Observable, map } from "rxjs"

import apiCall from "../Domain.Axios.Api"
import { DomainResponse } from "../Domain.Model"
import { GateWay, Project, ReportFilter } from "./Reports.Model"

export const getProjects = (): Observable<Project[]> => {
  return apiCall
    .get<Project[]>("projects")
    .pipe(map((usersResponse: DomainResponse<Project[]>) => usersResponse.data)) as Observable<Project[]>
}

export const getGateways = (): Observable<GateWay[]> => {
  return apiCall
    .get<GateWay[]>("gateways")
    .pipe(map((usersResponse: DomainResponse<GateWay[]>) => usersResponse.data)) as Observable<GateWay[]>
}

export const postReport = (url: string, item: ReportFilter): Observable<ReportFilter[]> => {
  return apiCall.post(url, item).pipe(map((reportsResponse) => reportsResponse?.data)) as Observable<ReportFilter[]>
}
