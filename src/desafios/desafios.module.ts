import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from 'src/categorias/categorias.module';
import { JogadoresModule } from 'src/jogadores/jogadores.module';
import { DesafiosController } from './desafios.controller';
import { DesafiosService } from './desafios.service';
import { DesafioSchema } from './interfaces/desafio.schema';
import { PartidaSchema } from './interfaces/partida.schema';

@Module({
  controllers: [DesafiosController],
  providers: [DesafiosService],
  imports: [
    MongooseModule.forFeature([
      { name: 'Desafio', schema: DesafioSchema },
      { name: 'Partida', schema: PartidaSchema },
    ]),
    JogadoresModule,
    CategoriasModule,
  ],
})
export class DesafiosModule {}
