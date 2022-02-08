import { UserInformation, UserResponse } from "./Users.Model"

export const userMap = (users: UserResponse[]): UserInformation[] => {
  return users.map((user) => ({
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
    avatarName: `${user.firstName[0]}${user.lastName[0]}`,
  }))
}
