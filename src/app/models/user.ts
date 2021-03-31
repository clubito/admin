export interface User {
    _id: string;
    name: string;
    email: string;
    isDisabled: boolean;
    isConfirmed: boolean;
    profilePicture: string;
    clubs: [
        {
            club: any,
            role: string,
            approvalDate: Date
        }
    ];
    joinRequests: [
        {
            club: any,
            status: string,
            requestedAt: Date
        }
    ];
    appRole: string;
    clubTags: [string];
    banned: boolean;
    bio: string;
    createdAt: Date;
}