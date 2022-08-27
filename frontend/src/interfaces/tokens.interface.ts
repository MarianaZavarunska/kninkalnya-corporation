export interface ITokensPair {
  id: number;
  accessToken: string;
  refreshToken: string;
  authorId: number;
}

export interface ITokenData {
  role: string;
  id: string;
}
