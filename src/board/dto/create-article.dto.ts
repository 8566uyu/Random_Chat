import { IsNumber, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  readonly title: string;
  
  @IsString()
  readonly content: string;
  
  @IsString()
  readonly password: string;
}
