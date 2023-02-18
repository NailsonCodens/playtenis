import { Courts } from "@modules/courts/entities/Courts";
import { Members } from "@modules/members/entities/Members";
import { Modalities } from "@modules/modalities/entities/Modalities";

interface IGameMapDTO {
  court_id: string;
  modality_id: string;
  modality_time: number;
  start_time_game: Date;
  end_time_game: Date;
  players?: Members[];
  court?: Courts;
  modality?: Modalities;
  id?: string;
  time: () => number;
}

export { IGameMapDTO };
