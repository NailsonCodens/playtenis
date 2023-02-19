import { Members } from "@modules/members/entities/Members";

interface ICreateQueueDTO {
  id?: string;
  modality_id: string;
  played: string;
  players?: Members[];
}

export { ICreateQueueDTO };
