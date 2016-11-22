import { Route } from '@angular/router';

import { SettingsGridComponent } from './index';

export const SettingsGridRoutes: Route[] = [
	{
		path: 'index',
		component: SettingsGridComponent
	},
	{
		path: 'settings',
		component: SettingsGridComponent
	},	
	{
		path: 'settings/:app',
		component: SettingsGridComponent
	},
	{
		path: 'settings/:app/:env',
		component: SettingsGridComponent
	}		
];
