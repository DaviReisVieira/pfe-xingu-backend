import { Controller, Get } from '@nestjs/common';
import { HomeService } from './home.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Home')
@Controller()
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  async appInfo() {
    return this.homeService.appInfo();
  }

  @Get('health')
  healthCheck() {
    return this.homeService.healthCheck();
  }
}
