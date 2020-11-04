export interface AuthenticationRequest {
    email : string,
    password : string,
}

export interface AuthenticationResponse {
    accessToken : string,
    roleType : RoleType,
}

export interface ChangePasswordRequest {
    oldPassword : string,
    newPassword : string,
    AccessToken : string,
}

export enum RoleType {
    Admin = 0,
    User= 1,
    Guest = 2,
}