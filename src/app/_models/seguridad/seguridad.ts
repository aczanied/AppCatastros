export interface UsuarioAplicacion {
    // Set fields
}

export interface LoginResult {
    '.expires': string;
    '.issued': string;
    Roles: string;
    TwoFactorEnabled: boolean;
    access_token: string;
    expires_in: number;
    token_type: string
    UserName: string;
  }