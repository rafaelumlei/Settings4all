import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Setting } from '../../shared/settings/setting';
import { SettingsService } from '../../shared/settings/settings.service';

// TODO: use sanitizer when adding json/xml values to the DON
// import { DomSanitizer, SafeHtml, SafeScript } from '@angular/platform-browser'

declare var prettyPrint: any;

@Component({
    moduleId: module.id,
    selector: 'setting-detail',
    templateUrl: './setting-detail.component.html'
})

export class SettingDetailComponent implements OnInit {

    @ViewChild('jsonValue') jsonValueEl: ElementRef;
    // Dropdown controls
    public disabled: boolean = false;
    public status: { isopen: boolean } = { isopen: false };    
    private currentSetting: Setting;
    private currentSettingDescription: string = '';



    public constructor(private el: ElementRef,
        private activeRoute: ActivatedRoute,
        private router: Router,
        private settingsService: SettingsService) {
    }

    public getSettingDescription(): string {
        if (this.currentSettingDescription != null &&
            this.currentSetting != null &&
            this.currentSetting.fullpath != null) {
            this.currentSettingDescription = this.currentSetting.fullpath.split('.').reverse()[0];
        }

        return this.currentSettingDescription;
    }

    public deleteSetting() : void {

        this.settingsService.deleteSetting(this.currentSetting.id)
                            .then(res => {
                                this.router.navigate(['settings',
                                        this.currentSetting.application,
                                        this.currentSetting.environment]);                              
                            })
                            .catch(err => {
                                // TODO: deal with the error and log it
                            });
                            
    }

    public toggled(open: boolean): void {
        console.log('Dropdown is now: ', open);
    }

    public toggleDropdown($event: MouseEvent): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }

    public ngOnInit(): void {

        this.activeRoute.params.forEach((params: Params) => {
            let settingId = params['id'];

            this.settingsService.getSetting(settingId)
                .then(res => {
                    this.currentSetting = res;

                    try {
                        this.jsonValueEl.nativeElement.textContent = JSON.stringify(this.currentSetting.jsonvalue, null, 2);
                    } catch (e) {
                        this.jsonValueEl.nativeElement.textContent = 'Not a valid json value.';
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
