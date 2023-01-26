interface ICreateGameDTO {
  court_id: string;
  modality_id: string;
  modality_time: string;
  start_time_game: string;
  end_time_game: string;
  date_game: Date;
}

export { ICreateGameDTO };
