import { EnvConfig } from './env-config.interface';

const ProdConfig: EnvConfig = {
  ENV: 'PROD',
  APP_BASE: '/settings4net.ui/',
  SETTINGS4NET_API: 'localhost/settings4net.API/api',
};

export = ProdConfig;

