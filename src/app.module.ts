import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:UZJkC490Np5Hgo5o@cluster0.tbh8fxw.mongodb.net/smartranking?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
      },
    ),
    JogadoresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
