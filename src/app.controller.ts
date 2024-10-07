import { Controller, Get, Render, Post, Body, HttpRedirectResponse, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Personal } from './Personal';
import { PersonalDto } from './PersonalDto.dto';
import { Response } from 'express';
import { error } from 'console';

@Controller()
export class AppController {
  #payment: Personal[] = [];

  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Get('termekek')
  @Render('termekek')
  getTermekek(@Res() response: Response) { }

  @Get('personalForm')
  @Render('PersonalForm')
  getPersonalForm() { 
    return {
      data: {},
      errors: []
    }
  }

  @Post('personalForm')
  postPersonals(@Body() personalDto: PersonalDto, @Res() response: Response) {

    let errors = []

    if(!personalDto.name || !personalDto.billingAdress || !personalDto.adress || !personalDto.card || !personalDto.expDate || !personalDto.secuCode){
      errors.push("Minden mezőt (a kupon kód kivételével) kötelező kitölteni!");
    }
    if(personalDto.cupon && !/^[A-Z]{2}-\d{4}$/.test(personalDto.cupon)){
      errors.push("Hibás kupon kód, helyes formátum: BB-SSSS, ahol a B nagybetű, az S szám, pl. PT-1255")
    }
    if(!/^\d{4}-\d{4}-\d{4}-\d{4}$/.test(personalDto.card)){
      errors.push("Kártyszám helyes formátuma: XXXX-XXXX-XXXX-XXXX")
    }
    if(!/^\d{3}$/.test(personalDto.secuCode)){
      errors.push("A biztonsági kód helyes formátuma: XXX");
    }
    if(!/^(0[1-9]|1[0-9])\/[0-9]{2}$/.test(personalDto.expDate)){
      errors.push("A lejárati dátum helyes formátuma: HH/ÉÉ");
    }

    if(errors.length > 0){
      response.render('personalForm', {
        data: personalDto,
        errors
      })
      return;
    }

    const newPersonal = {
      name: personalDto.name,
      billingAdress: personalDto.billingAdress,
      adress: personalDto.adress,
      cupon: personalDto.cupon,
      card: personalDto.card,
      expDate: personalDto.expDate,
      secuCode: personalDto.secuCode
    }

    this.#payment.push(newPersonal);
    console.log(this.#payment);

    response.redirect('/paymentSuccess');
  }

  @Get('paymentSuccess')
  getPaymentSuccess() {
    return "Sikeres fizetés!"
  }
}
