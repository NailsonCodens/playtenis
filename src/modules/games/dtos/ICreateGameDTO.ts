import { Members } from "@modules/members/entities/Members";

interface ICreateGameDTO {
  court_id: string;
  modality_id: string;
  modality_time: number;
  start_time_game: string;
  end_time_game: string;
  players?: Members[];
  id?: string;
}

export { ICreateGameDTO };
