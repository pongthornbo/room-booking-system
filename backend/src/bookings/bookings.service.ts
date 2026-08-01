import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.booking.findMany({
      orderBy: { startTime: 'asc' },
      include: { room: { select: { id: true, name: true, capacity: true } } },
    });
  }

  async findOne(id: number) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        room: { select: { id: true, name: true, capacity: true } },
      },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with id: ${id} not found`);
    }

    return booking;
  }

  async create(createBookingDto: CreateBookingDto) {
    const startTime = new Date(createBookingDto.startTime);
    const endTime = new Date(createBookingDto.endTime);
    if (startTime >= endTime) {
      throw new BadRequestException('Start time must be before end time');
    }

    const conflictingBooking = await this.prisma.booking.findFirst({
      where: {
        roomId: createBookingDto.roomId,
        startTime: {
          lt: endTime,
        },
        endTime: {
          gt: startTime,
        },
      },
    });

    if (conflictingBooking) {
      throw new ConflictException(
        'This room is already booked during the selected time',
      );
    }

    const room = await this.prisma.room.findUnique({
      where: { id: createBookingDto.roomId },
    });
    if (!room) {
      throw new NotFoundException(
        `Room with id ${createBookingDto.roomId} not found`,
      );
    }

    return this.prisma.booking.create({
      data: {
        title: createBookingDto.title,
        startTime: startTime,
        endTime: endTime,
        roomId: createBookingDto.roomId,
      },
      include: {
        room: { select: { id: true, name: true, capacity: true } },
      },
    });
  }
}
