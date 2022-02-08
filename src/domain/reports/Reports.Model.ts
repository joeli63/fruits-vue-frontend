export interface Project {
  projectId: string
  userIds: string[]
  rule: string
  gatewayIds: string[]
  structure: string
  industry: string
  website: string
  description: string
  image: string
  name: string
}

export interface ProjectInformation {
  id: string
  name: string
}

export interface GateWay {
  gatewayId: string
  userIds: string[]
  name: string
  type: string
  apiKey: string
  secondaryApiKey: string
  description: string
}

export interface GateWayInformation {
  id: string
  name: string
}

export interface ReportFilter {
  from?: string
  to?: string
  projectId?: string
  gatewayId?: string
}

export interface Report {
  paymentId: string
  amount: number
  projectId: string
  gatewayId: string
  userIds: string[]
  modified: string
  created: string
}
