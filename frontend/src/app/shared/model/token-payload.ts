export class TokenPayload {
    public nameid: string;
    public unique_name: string;
    public role: string;
    public Permission: string[] = [];
    public sub: string;
    public token_usage: string;
    public jti: string;
    public scope: string[] = [];
    public aud: string;
    public azp: string;
    public nbf: string;
    public exp: string;
    public iat: string;
    public iss: string;

}