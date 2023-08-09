import { LocationService } from './location.service';
import { Controller, Get, Param, Request } from '@nestjs/common';

@Controller('location/')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get('all')
  async getLocations(@Request() req) {
    return await this.locationService.findAll();
  }

  @Get(':city')
  async getLocationByCity(@Param('city') city: string) {
    return await this.locationService.findLocationByCity(city);
  }
}
