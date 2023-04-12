import { DataSource } from 'typeorm';
import { SettingsEntity } from '../entity/settings.entity';

export const settingsProviders = [
  {
    provide: 'SETTINGS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SettingsEntity),
    inject: ['DATA_SOURCE'],
  },
];
