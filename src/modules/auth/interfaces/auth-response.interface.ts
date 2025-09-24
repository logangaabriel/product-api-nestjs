export interface AuthResponse {
    user: {
        id: number;
        email: string;
        username: string;
        isAdmin: boolean;
    };
    accessToken: string;
    refreshToken: string;
}