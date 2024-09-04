// import { Exclude, Expose, Transform } from 'class-transformer';

// @Exclude() // 해당 클래스의 모든 속성을 숨기는 옵션
export class Movie {
  id: number;
  title: string;

  // @Expose() // 해당 클래스의 모든 속성을 숨기는 옵션이 설정되어 있을 때 해당 속성을 노출하는 옵션
  // @Exclude() // 해당 속성을 숨기는 옵션
  // @Transform(({ value }) => value.toString().toUpperCase()) // 해당 속성의 값을 대문자로 변환하는 옵션
  genre: string;
}
