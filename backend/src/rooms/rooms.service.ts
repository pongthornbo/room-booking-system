import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.room.findMany();
  }

  async findOne(id: number) {
    const room = await this.prisma.room.findUnique({ where: { id } });

    if (!room) {
      throw new NotFoundException(`Room with id ${id} not found`);
    }

    return room;
  }

  async create(createRoomDto: CreateRoomDto) {
    return await this.prisma.room.create({ data: createRoomDto });
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    await this.findOne(id);
    const updatedRoom = await this.prisma.room.update({
      where: { id },
      data: updateRoomDto,
    });

    return updatedRoom;
  }

  async delete(id: number) {
    await this.findOne(id);
    const deletedRoom = await this.prisma.room.delete({ where: { id } });

    return deletedRoom;
  }
}
