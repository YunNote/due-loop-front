export type SocialProvider = "GOOGLE" | "KAKAO" | "NAVER";

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface TokenResponse extends TokenPair {
  tokenType: string;
}
