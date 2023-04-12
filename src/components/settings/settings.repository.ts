import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import createSettingsDto from './dto/create.settings.dto';
import { SettingsEntity } from './entity/settings.entity';

@Injectable()
export class SettingsRepository {
  constructor(
    @Inject('SETTINGS_REPOSITORY')
    private settingsRepository: Repository<SettingsEntity>,
  ) {}

  async save(createSettingsDto: createSettingsDto) {
    return await this.settingsRepository.save(createSettingsDto);
  }
}
