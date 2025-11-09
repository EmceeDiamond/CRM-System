class TokenManager {

    private accessToken: string | null = null;

    setAccessToken(token: string): void {
        this.accessToken = token;
    }

    getAccessToken(): string | null {
        return this.accessToken;
    }

    clearAccessToken(): void {
        this.accessToken = null;
    }
}

export const tokenManager = new TokenManager();
