import axios from "axios";
import { API, createHeaders } from "services";

export interface TeamForm {
  name: string;
  description: string;
  emails: string[];
}

export const getTeam = async (userId: string) => {
  console.log("userId ", userId);

  const res = await axios.get(API + "/v1/team/" + userId);
  return res;
};

export const getTeams = async (page: number, pageSize: number) => {
  const res = await axios.get(API + "/v1/teams");
  return res.data;
};

export const createTeam = async (token: string, form: TeamForm) => {
  console.log("form ", form);

  const headers = createHeaders(token);
  const res = await axios.post(
    API + "/v1/teams",
    {
      ...form,
    },
    { headers }
  );
  return res;
};
