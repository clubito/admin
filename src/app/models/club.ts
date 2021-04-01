import { User } from "./user";

export interface Club {
    _id: string;
    name: string;
    logo: string;
    description: string;
    members: {
        member: User,
        role: string
    }[];
    events: any[];
    joinRequests: {
        user: User,
        status: string,
        requestedAt: Date
    }[];
    announcements: any[];
    roles: {
        user: User,
        customTitle: string
    }[];
    theme: string;
    tags: string[];
    isEnabled: boolean;
    deleted: {
        isDeleted: boolean,
        deletedAt: Date
    };
    createdAt: Date;
}
