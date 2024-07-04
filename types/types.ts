export interface User {
  given_name?: string ;
  family_name?: string;
  nickname?: string;
  name?: string;
  picture?: string;
  updated_at?: string;
  email?: string;
  email_verified?: boolean;
  sub?: string;
}


type TableData = {
  key: string;
  value: string;
};

export type TableProps = {
  data: TableData[];
  updateUser: (updatedValue: Record<string, string>) => void;
};