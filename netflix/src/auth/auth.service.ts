import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  parseBasicToken(rawToken: string) {
    const basicSplit = rawToken.split(' ');

    if (basicSplit.length !== 2) {
      throw new BadRequestException('토큰 포맷이 잘못됐습니다.');
    }

    const [_, token] = basicSplit;
    const decoded = Buffer.from(token, 'base64').toString('utf-8');

    const tokenSplit = decoded.split(':');
    if (tokenSplit.length !== 2) {
      throw new BadRequestException('토큰 포맷이 잘못됐습니다.');
    }

    const [email, password] = tokenSplit;
    return {
      email,
      password,
    };
  }

  async register(token: string) {
    const { email, password } = this.parseBasicToken(token);
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (user) {
      throw new BadRequestException('이미 존재하는 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(
      password,
      this.configService.get<number>('HASH_ROUNDS'),
    );
    await this.userRepository.save({
      email,
      password: hashedPassword,
    });

    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
}
