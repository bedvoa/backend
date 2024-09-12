import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Director } from './entity/director.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DirectorService {
  constructor(
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>,
  ) {}

  async create(createDirectorDto: CreateDirectorDto) {
    return await this.directorRepository.save(createDirectorDto);
  }

  async findAll() {
    return await this.directorRepository.find();
  }

  async findOne(id: number) {
    return await this.directorRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateDirectorDto: UpdateDirectorDto) {
    const director = await this.directorRepository.findOne({
      where: { id },
    });

    if (!director) {
      throw new NotFoundException('존재하지 않는 ID 값의 감독입니다.');
    }

    await this.directorRepository.save({
      id,
      ...updateDirectorDto,
    });

    return await this.directorRepository.findOne({
      where: { id },
    });
  }

  async remove(id: number) {
    const director = await this.directorRepository.findOne({
      where: { id },
    });

    if (!director) {
      throw new NotFoundException('존재하지 않는 ID 값의 감독입니다.');
    }

    await this.directorRepository.delete({ id });

    return { id };
  }
}
