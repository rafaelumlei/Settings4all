import { Routes } from '@angular/router';

import { ContainerRoutes } from './container/index';
import { ContainerComponent } from './container/index';

export const routes: Routes = [
	{ path: '', redirectTo: 'index', pathMatch: 'full' },
	...ContainerRoutes,
	{ path: '**', component: ContainerComponent }
];
