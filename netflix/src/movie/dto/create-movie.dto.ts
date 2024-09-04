import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty({
    message: '제목은 필수 입력 값입니다.',
  })
  @MinLength(1, {
    message: '제목은 최소 1글자 이상이어야 합니다.',
  })
  title: string;

  @IsString()
  @IsNotEmpty({
    message: '장르는 필수 입력 값입니다.',
  })
  @MinLength(1, {
    message: '장르는 최소 1글자 이상이어야 합니다.',
  })
  genre: string;
}
