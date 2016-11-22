import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

import { SettingsGridModule } from './settings-grid/settings-grid.module';
import { SettingDetailModule } from './setting-detail/setting-detail.module';
import { SettingEditModule } from './setting-edit/setting-edit.module';
import { ContainerComponent } from './container.component';
import {TopNavComponent} from '../shared/index';
import {SidebarComponent} from '../shared/index';

@NgModule({
    imports: [
        CommonModule,
    	RouterModule,
    	DropdownModule,
        ModalModule,
        SettingsGridModule,
        SettingDetailModule,
        SettingEditModule,
    ],
    declarations: [ContainerComponent, TopNavComponent, SidebarComponent],
    exports: [ContainerComponent, TopNavComponent, SidebarComponent]
})

export class ContainerModule { }
