import { Members } from "@modules/members/entities/Members";

interface IRequestQueueDTO {
  id?: string;
  modality_id: string;
  players: string[];
}

export { IRequestQueueDTO };
