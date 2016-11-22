import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../settings/settings.service';

@Component({
	moduleId: module.id,
	selector: 'sidebar-cmp',
	templateUrl: 'sidebar.html',
	providers: [SettingsService]
})

export class SidebarComponent implements OnInit {
	isActive = false;
	selectedApp: string = '';
	availableApps: Array<string>;
	currentAppEnvironments: Array<string> = [];

	public constructor(private settingsService : SettingsService) {
	}

	eventCalled() {
		this.isActive = !this.isActive;
	}

	selectApp(app: string) {
		if (app === this.selectedApp) {
			this.selectedApp = '0';
		} else {
			this.selectedApp = app;
			this.getAppEnvironments(app);
		}
	}

	getAppEnvironments(app: string) : Array<string> {
		this.settingsService.getAppEnvironments(app)
							.then(envs => this.currentAppEnvironments = envs)
							.catch(r => {
								// to log and handle in the future
								this.currentAppEnvironments = [];
							});
							
		return this.currentAppEnvironments;
	}

	getApps() : Array<string> {
		this.settingsService.getApps()
							.then(apps => {
								this.availableApps = apps;
							})
							.catch(r => {
								// to log and handle in the future
							});

		return this.availableApps;
	}

	ngOnInit() : void {
		this.getApps();
	}

}
