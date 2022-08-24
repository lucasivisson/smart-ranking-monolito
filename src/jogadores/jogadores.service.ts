import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];

  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  public readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criarJogadorDto;

    // const jogadorEncontrado = this.jogadores.find(
    //   (jogador) => jogador.email === email,
    // );

    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (jogadorEncontrado) {
      await this.atualizar(criarJogadorDto);
    } else {
      await this.criar(criarJogadorDto);
    }
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return this.jogadorModel.find().exec();
    // return this.jogadores;
  }

  async consultarJogadorPeloEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com email ${email} não encontrado`);
    }

    return jogadorEncontrado;
  }

  async deletarJogador(email: string): Promise<any> {
    return this.jogadorModel.remove({ email }).exec();

    // const jogadorEncontrado = this.jogadores.find(
    //   (jogador) => jogador.email === email,
    // );

    // this.jogadores = this.jogadores.filter(
    //   (jogador) => jogador.email !== jogadorEncontrado.email,
    // );
  }

  private async criar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const jogadorCriado = new this.jogadorModel(criarJogadorDto);
    return jogadorCriado.save();

    // const { nome, telefoneCelular, email } = criarJogadorDto;

    // const jogador: Jogador = {
    //   _id: uuidv4(),
    //   nome,
    //   telefoneCelular,
    //   email,
    //   ranking: 'A',
    //   posicaoRanking: 1,
    //   urlFotoJogador: 'www.google.com/foto123.jpg',
    // };
    // this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}`);
    // this.jogadores.push(jogador);
  }

  private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    return this.jogadorModel
      .findOneAndUpdate(
        { email: criarJogadorDto.email },
        { $set: criarJogadorDto },
      )
      .exec();

    // const { nome } = criarJogadorDto;
    // jogadorEncontrado.nome = nome;
  }
}
