import {
  Controller,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DesafiosService } from './desafios.service';

@Controller('api/v1/desafios')
export class DesafiosController {
  constructor(private readonly desafiosService: DesafiosService) {}

  private readonly logger = new Logger(DesafiosController.name);

  @Post()
  @UsePipes(ValidationPipe)
  async criarDesafio() {
    return;
  }
}
