import { Route } from '@angular/router';

import { SettingsGridRoutes } from './settings-grid/index';
import { SettingDetailRoutes } from './setting-detail/index';
import { SettingEditRoutes } from './setting-edit/index';

import { ContainerComponent } from './index';

export const ContainerRoutes: Route[] = [
  	{
    	path: '',
    	component: ContainerComponent,
    	children: [
			...SettingDetailRoutes,
			...SettingEditRoutes,			
			...SettingsGridRoutes
    	]
  	}
];
