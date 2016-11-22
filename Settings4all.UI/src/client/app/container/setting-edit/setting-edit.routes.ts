import { Route } from '@angular/router';
import { SettingEditComponent } from './index';

export const SettingEditRoutes: Route[] = [
	{
		path: 'settings/:app/:env/:id/edit',
		component: SettingEditComponent
	}
];
