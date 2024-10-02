import { Controller, Get, Render, Post, Body, HttpRedirectResponse, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Personal } from './Personal';
import { PersonalDto } from './PersonalDto.dto';
import { Response } from 'express';
import { error } from 'console';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Get('termekek')
  @Render('termekek')
  getTermekek(@Res() response: Response){
    // response.redirect('/personalForm');
  }

  @Get('personalForm')
  @Render('PersonalForm')
  getPersonalForm(){ }

  @Post('personalForm')
  postPersonals(@Body() personalDto: PersonalDto, @Res() response: Response){

  }
}
