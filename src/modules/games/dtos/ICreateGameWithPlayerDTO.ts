import { Members } from "@modules/members/entities/Members";

interface ICreateGameWithPlayerDTO {
  court_id: string;
  modality_id: string;
  modality_time: number;
  start_time_game: Date;
  end_time_game: Date;
  players?: string[];
  id?: string;
}

export { ICreateGameWithPlayerDTO };
