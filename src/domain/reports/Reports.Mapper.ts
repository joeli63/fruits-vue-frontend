import { Project, GateWay, ProjectInformation, GateWayInformation } from "./Reports.Model"

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
