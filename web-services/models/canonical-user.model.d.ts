export interface Credentials {
    username?: string;
    password: string;
    newPassword?: string;
}
export declare class UpdateCanonicalUserRequest {
    id: string;
    first: string;
    last: string;
    initials: string;
    phone: string;
    constructor(user: CanonicalUser);
}
export declare class CanonicalUserResponse {
    id: string;
    first: string;
    middle: string;
    last: string;
    initials: string;
    phone: string;
    constructor(user: CanonicalUserResponse | Object);
}
export declare class CanonicalUser {
    id: string;
    first: string;
    middle: string;
    last: string;
    initials: string;
    phone: string;
    constructor(user?: CanonicalUser | CanonicalUserResponse);
}
