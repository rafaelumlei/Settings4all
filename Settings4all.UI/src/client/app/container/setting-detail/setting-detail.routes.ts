import { Route } from '@angular/router';
import { SettingDetailComponent } from './index';

export const SettingDetailRoutes: Route[] = [
	{
		path: 'settings/:app/:env/:id/detail',
		component: SettingDetailComponent
	}
];
