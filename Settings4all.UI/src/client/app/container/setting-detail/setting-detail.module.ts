import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';

import { SettingDetailComponent } from './setting-detail.component';

@NgModule({
    imports: [RouterModule, DropdownModule],
    declarations: [SettingDetailComponent],
    exports: [SettingDetailComponent]
})

export class SettingDetailModule { }
