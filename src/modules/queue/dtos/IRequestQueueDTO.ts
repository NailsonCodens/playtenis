interface IRequestQueueDTO {
  id?: string;
  modality_id: string;
  court_id: string;
  players: Array<string>;
}

export { IRequestQueueDTO };
