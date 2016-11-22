import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Setting } from '../../shared/settings/setting';
import { SettingsService } from '../../shared/settings/settings.service';

// TODO: use sanitizer when adding json/xml values to the DOM
// import { DomSanitizer, SafeHtml, SafeScript } from '@angular/platform-browser'

declare var prettyPrint: any;

@Component({
    moduleId: module.id,
    selector: 'setting-edit',
    templateUrl: './setting-edit.component.html'
})

export class SettingEditComponent implements OnInit {

    currentSetting: Setting;
    currentSettingDescription: string = '';
    newSettingValue: string = '';

    public constructor(private el: ElementRef,
        private activeRoute: ActivatedRoute,
        private settingsService: SettingsService,
        private router: Router) {
    }

    public getSettingDescription(): string {
        if (this.currentSettingDescription != null &&
            this.currentSetting != null &&
            this.currentSetting.fullpath != null) {
            this.currentSettingDescription = this.currentSetting.fullpath.split('.').reverse()[0];
        }

        return this.currentSettingDescription;
    }

    public updateSetting(): void {
        let updatedSetting: Setting = new Setting;
        updatedSetting.id = this.currentSetting.id;
        updatedSetting.jsonvalue = JSON.parse(this.newSettingValue);

        this.settingsService.updateSetting(updatedSetting)
                            .then(res => {
                                // navigate to detail
                                this.router.navigate([
                                     'settings',
                                     this.currentSetting.application,
                                     this.currentSetting.environment,
                                     this.currentSetting.id,
                                     'detail']);
                            })
                            .catch(e => {
                                // TODO: deal with the error and log it 
                            });

    }

    public ngOnInit(): void {

        this.activeRoute.params.forEach((params: Params) => {
            let settingId = params['id'];

            this.settingsService.getSetting(settingId)
                .then(res => {
                    this.currentSetting = res;

                    try {
                        this.newSettingValue = JSON.stringify(this.currentSetting.jsonvalue, null, 2);
                    } catch (e) {
                        this.newSettingValue = 'Not a valid json value.';
                    }

                    // calling pretty printing lib
                    prettyPrint();
                })
                .catch(e => {
                    // TODO: deal with exception and log it
                });
        });
    }
}
