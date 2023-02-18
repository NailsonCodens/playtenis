import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { IGamesRepository } from "@modules/games/repositories/IGamesRepository";
import { MembersRepository } from "@modules/members/repositories/implementation/MembersRepository";
import { IModalitiesRepository } from "@modules/modalities/repositories/IModalitiesRepository";

@injectable()
class CreatePlayersInGameUseCase {
  constructor(
    @inject("GamesRepository") private gamesRepository: IGamesRepository,
    @inject("MembersRepository") private membersRepository: MembersRepository,
    @inject("ModalitiesRespository")
    private modalitiesRepository: IModalitiesRepository
  ) {}

  async execute(player_ids: string[], game_id: string): Promise<void> {
    const date_now = dayjs();
    const start_time_game = dayjs(date_now).toDate();

    const gameExists = await this.gamesRepository.findById(game_id);

    if (!gameExists) {
      throw new AppError("Este jogo não existe");
    }

    const findGame = await this.gamesRepository.findGameWithPlayers(
      player_ids,
      start_time_game
    );

    if (findGame) {
      throw new AppError(
        "Todos ou alguns destes jogadores estão jogando ainda. Só podem entrar na lista de espera após o seu jogo terminar"
      );
    }

    const modalityGame = await this.modalitiesRepository.findById(
      gameExists.modality_id
    );

    const amountPlayers = player_ids.length;

    const amoutPlayersAllowed =
      modalityGame.amount_players as unknown as number;

    if (amountPlayers > amoutPlayersAllowed) {
      throw new AppError(
        `Esta modalidade permite apenas ${amoutPlayersAllowed} jogadores(as)`
      );
    }

    if (amountPlayers < amoutPlayersAllowed) {
      throw new AppError(
        `Esta modalidade permite ${amoutPlayersAllowed} jogadores, por favor adicione outro(s) jogadores(as)`
      );
    }
    const players = await this.membersRepository.findByIds(player_ids);

    gameExists.players = players;

    await this.gamesRepository.create(gameExists);
  }
}

export { CreatePlayersInGameUseCase };
