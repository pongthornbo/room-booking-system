import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Delete,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingsService } from './bookings.service';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingService: BookingsService) {}

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookingService.findOne(id);
  }

  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    return this.bookingService.update(id, updateBookingDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.bookingService.delete(id);
  }
}
