export interface MemoDto {
  author: string;
  title: string;
  tags: string[];
  id: string;
  sharing: boolean;
}

export interface AuthenticatedUser {
    logo: string;
    name: string;
}