import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
    private readonly rooms = [
        {
            id: 1,
            name: 'Meeting Room A',
            capacity: 6,
        },
        {
            id: 2,
            name: 'Meeting Room B',
            capacity: 12,
        },
    ];

    private nextID = 3;

    findAll() {
        return this.rooms;
    }

    findOne(id: number) {
        const room = this.rooms.find((room) => room.id === id);

        if (!room) {
        throw new NotFoundException(`Room with id ${id} not found`);
        }

        return room;
    }

    create(createRoomDto: CreateRoomDto) {
        const newRoom = { id: this.nextID, ...createRoomDto };
        this.nextID++;
        this.rooms.push(newRoom);

        return newRoom;
    }

    update(id: number, updateRoomDto: UpdateRoomDto) {
        const room = this.findOne(id);

        if (updateRoomDto.name !== undefined) {
        room.name = updateRoomDto.name;
        }

        if (updateRoomDto.capacity !== undefined) {
        room.capacity = updateRoomDto.capacity;
        }

        return room;
    }

    delete(id: number) {
        const roomIndex = this.rooms.findIndex((room) => room.id === id);

        if (roomIndex === -1) {
        throw new NotFoundException(`Room with id ${id} not found`);
        }

        this.rooms.splice(roomIndex, 1);

        return null;
    }
}
