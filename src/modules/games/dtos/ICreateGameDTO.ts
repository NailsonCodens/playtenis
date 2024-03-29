import { Members } from "@modules/members/entities/Members";

interface ICreateGameDTO {
  court_id: string;
  modality_id: string;
  modality_time: number;
  start_time_game: Date;
  end_time_game: Date;
  players?: Members[];
  player_ids?: string[];
  id?: string;
}

export { ICreateGameDTO };
