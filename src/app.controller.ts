/*
 * @Descriptin:
 * @Version: 0.1
 * @Autor: boide gui
 * @Date: 2020-12-30 12:08:32
 * @LastEditors: boide gui
 * @LastEditTime: 2021-01-06 18:38:06
 */
import { Controller, Redirect, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Redirect('https://www.wisdoms.xin', 302)
  getHello(): {
    url: string;
  } {
    return { url: 'https://www.wisdoms.xin' };
  }
}
