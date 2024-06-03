import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // console.log(createUserDto);
    const { first_name, last_name, email, password, avatar } = createUserDto;
    if (!first_name || !last_name || !email || !password || !avatar) {
      // HttpException, HttpStatus, BAD_REQUEST => son funciones inlcuídas en NEST
      throw new HttpException('Missing data', HttpStatus.BAD_REQUEST);
    }
    const newUser = this.usersService.create(createUserDto);
    return { status: 'success', payload: newUser };
  }

  @Get()
  findAll(@Query() query) {
    console.log(query);
    const users = this.usersService.findAll(query);
    return { status: 'success', payload: users };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // +id => El + convierte a number
    if (isNaN(+id)) {
      throw new HttpException('Invalid param ID', HttpStatus.BAD_REQUEST);
    }
    const user = this.usersService.findOne(+id);
    return { status: 'success', payload: user };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = this.usersService.update(+id, updateUserDto);
    return { status: 'success', payload: updatedUser };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('/test/:id')
  requestTest(@Request() req) {
    console.log(req.query);
    console.log(req.body);
    console.log(req.params);
    return 'Complete Request';
  }
}
