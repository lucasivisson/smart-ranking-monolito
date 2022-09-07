import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';
import { Evento } from '../interfaces/categoria.interface';

export class AtualizarCategoriaDto {
  @IsString()
  @IsOptional()
  descricao: string;

  @IsArray()
  @IsOptional()
  @ArrayMinSize(1)
  eventos: Array<Evento>;
}
