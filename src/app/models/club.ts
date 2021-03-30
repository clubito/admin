export interface Club {
    _id: string;
    name: string;
    logo: string;
    members: [{
        member: any,
        role: string
    }];
    events: [any];
    joinRequests: [{
        user: any,
        status: string,
        requestedAt: Date
    }];
    announcements: [any];
    roles: [{
        user: any,
        customTitle: string
    }];
    theme: string;
    tags: [string];
    isEnabled: boolean;
    deleted: {
        isDeleted: boolean,
        deletedAt: Date
    };
    createdAt: Date;
}
