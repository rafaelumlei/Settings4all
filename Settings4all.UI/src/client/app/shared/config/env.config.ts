// Feel free to extend this interface
// depending on your app specific config.
export interface EnvConfig {
  	SETTINGS4NET_API?: string;
  	ENV?: string;
	APP_BASE?: string;
}

export const Config: EnvConfig = JSON.parse('<%= ENV_CONFIG %>');
