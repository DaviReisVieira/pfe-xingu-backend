import { Controller, Get, Req } from '@nestjs/common';
import { HomeService } from './home.service';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import arp from '@network-utils/arp-lookup';
import { convertIPv6toIPv4 } from 'src/utils/ipv6-to-ipv4';

@ApiTags('Home')
@Controller()
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  async appInfo(@Req() request: Request) {
    const ipAddress = request.ip;
    const ipv4 = convertIPv6toIPv4(ipAddress);
    console.log(ipAddress, ipv4);
    const mac = await arp.toMAC(ipv4);
    console.log(mac);
    console.table(await arp.getTable());
    return this.homeService.appInfo();
  }

  @Get('health')
  healthCheck() {
    return this.homeService.healthCheck();
  }
}
