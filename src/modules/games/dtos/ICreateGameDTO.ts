interface ICreateGameDTO {
  court_id: string;
  modality_id: string;
  modality_time: number;
  start_time_game: Date;
  end_time_game: Date;
}

export { ICreateGameDTO };
