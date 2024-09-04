import {
  Contains,
  Equals,
  IsAlphanumeric,
  IsArray,
  IsBoolean,
  IsCreditCard,
  IsDate,
  IsDateString,
  IsDefined,
  IsDivisibleBy,
  IsEmpty,
  IsEnum,
  IsHexColor,
  IsIn,
  IsInt,
  IsLatLong,
  IsNegative,
  IsNotEmpty,
  IsNotIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
  NotContains,
  NotEquals,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

enum MovieEnum {
  Fantasy = '판타지',
  SF = 'SF',
  Action = '액션',
}

@ValidatorConstraint({ name: 'password', async: false })
class PasswordValidator implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    return value.length > 4 && value.length < 9;
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return '비밀번호는 5글자 이상 8글자 이하로 입력해주세요.';
  }
}

export class UpdateMovideDto {
  // IsNotEmpty와 IsOptional을 같이 사용하게 되면
  // 해당 값이 없을 경우에는 유효성 검사를 진행하지 않고
  // 해당 값이 있을 경우에만 IsString을 통해 유효성 검사를 진행
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  genre?: string;

  @IsDefined() // 정의가 되었는지 확인 -> null이나 undefined라면 유효성 검사 실패
  @IsOptional() // json에 test라는 키가 없으면 유효성 검사를 통과지만 있으면 값이 무엇이든 상관없음
  @Equals('test') // test라는 값과 일치하는지 확인 -> 일치하지 않으면 유효성 검사 실패
  @NotEquals('Test')
  @IsEmpty() // null || undefined || '' -> 유효성 검사 통과
  @IsNotEmpty() // null || undefined || '' -> 유효성 검사 실패
  @IsIn(['test']) // test라는 값이 있는지 확인 -> 없으면 유효성 검사 실패
  @IsNotIn(['Test']) // Test라는 값이 없는지 확인 -> 있으면 유효성 검사 실패
  @IsBoolean() // boolean 타입인지 확인
  @IsString() // string 타입인지 확인
  @IsNumber() // number 타입인지 확인
  @IsInt() // integer 타입인지 확인 -> 정수인지 확인
  @IsArray() // array 타입인지 확인
  @IsEnum(MovieEnum) // MovieEnum에 있는 값(value)인지 확인
  @IsDate() // Date 타입인지 확인 -> Date 객체인지 확인
  @IsDateString() // Date string 타입인지 확인 -> Date 객체를 string으로 변환한 값인지 확인 ex) '2024-09-04', '2024-09-04T00:00:00.000Z'
  @IsDivisibleBy(2) // 2로 나누어 떨어지는지 확인
  @IsPositive() // 양수인지 확인
  @IsNegative() // 음수인지 확인
  @Min(0) // 최소값이 0인지 확인
  @Max(10) // 최대값이 10인지 확인
  @Contains('test') // test라는 문자열이 포함되어 있는지 확인
  @NotContains('Test')
  @IsAlphanumeric() // **알파벳**과 **숫자**로만 이루어져 있는지 확인 -> 사이에 공백이 있으면 유효성 검사 실패
  @IsCreditCard() // 신용카드 번호인지 확인 -> Luhn 알고리즘을 통해 유효성 검사 -> 신뢰성은 그닥
  @IsHexColor() // 16진수 색상 코드인지 확인 -> #으로 시작하고 6자리 숫자로 이루어져 있는지 확인 ex) #FFFFFF
  @MaxLength(10) // 최대 길이가 10인지 확인
  @MinLength(5) // 최소 길이가 5인지 확인
  @IsUUID() // UUID인지 확인 -> 8-4-4-4-12 형태의 문자열인지 확인
  @IsLatLong() // 위도와 경도인지 확인 -> 위도와 경도를 나타내는 문자열인지 확인 ex) '37.1234,127.1234'
  @Validate(PasswordValidator) // PasswordValidator를 통해 유효성 검사
  test: string;
}
