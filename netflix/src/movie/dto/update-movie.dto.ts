import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

enum MovieEnum {
  Fantasy = '판타지',
  SF = 'SF',
  Action = '액션',
}

export class UpdateMovideDto {
  // IsNotEmpty와 IsOptional을 같이 사용하게 되면
  // 해당 값이 없을 경우에는 유효성 검사를 진행하지 않고
  // 해당 값이 있을 경우에만 IsString을 통해 유효성 검사를 진행
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @ArrayNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  genreIds?: number[];

  @IsNotEmpty()
  @IsOptional()
  detail?: string;

  @IsNotEmpty()
  @IsOptional()
  directorId?: number;
}
