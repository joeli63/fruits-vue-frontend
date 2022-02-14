import { ORDERED_DATE_COMPARATOR, SortDirection } from '../Domain.Comparator'
import { Project, GateWay, Report, ProjectInformation, GateWayInformation } from "./Reports.Model"

export const projectMapper = (gateways: Project[], userId: string): ProjectInformation[] => {
  return gateways
    .filter((project) => project.userIds.includes(userId))
    .map((project) => ({
      id: project.projectId,
      name: project.name,
    }))
}

export const gatewayMapper = (gateways: GateWay[], userId: string): GateWayInformation[] => {
  return gateways
    .filter((gateway) => gateway.userIds.includes(userId))
    .map((gateway) => ({
      id: gateway.gatewayId,
      name: gateway.name,
    }))
}

export const reportsMapper = (reports: Report[] | undefined): Report[] => {
  if (reports === undefined) return []

  const sorted = reports.sort((a: Report, b: Report) => {
    const aDate = new Date(a.modified)
    const bDate = new Date(b.modified)

    return ORDERED_DATE_COMPARATOR(aDate, bDate, "asc")
  })

  return sorted
}
