import { defer, Observable } from "rxjs"
import { map } from "rxjs/operators"

import initializeAxios from "./Domain.Axios.Setup"
import { axiosRequestConfiguration } from "./Domain.Axios.Config"
import { DomainResponse } from "./Domain.Model"

const axiosInstance = initializeAxios(axiosRequestConfiguration)

const get = <T>(url: string, queryParams?: object): Observable<DomainResponse<T>> => {
  return defer(() => axiosInstance.get<DomainResponse<T>>(url, { params: queryParams })).pipe(
    map((result) => result.data),
  )
}

const post = <T>(
  url: string,
  body: object,
  queryParams?: object,
): Observable<DomainResponse<T> | void> => {
  return defer(() =>
    axiosInstance.post<DomainResponse<T>>(url, body, { params: queryParams }),
  ).pipe(map((result) => result.data))
}

const put = <T>(
  url: string,
  body: object,
  queryParams?: object,
): Observable<DomainResponse<T> | void> => {
  return defer(() => axiosInstance.put<DomainResponse<T>>(url, body, { params: queryParams })).pipe(
    map((result) => result.data),
  )
}

const patch = <T>(
  url: string,
  body: object,
  queryParams?: object,
): Observable<DomainResponse<T> | void> => {
  return defer(() =>
    axiosInstance.patch<DomainResponse<T>>(url, body, { params: queryParams }),
  ).pipe(map((result) => result.data))
}

const deleteR = <T>(url: string, id: number): Observable<DomainResponse<T> | void> => {
  return defer(() => axiosInstance.delete(`${url}/${id}`)).pipe(map((result) => result.data))
}

export default { get, post, put, patch, delete: deleteR }
