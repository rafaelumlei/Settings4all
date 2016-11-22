import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SettingEditComponent } from './setting-edit.component';

@NgModule({
    imports: [RouterModule, FormsModule],
    declarations: [SettingEditComponent],
    exports: [SettingEditComponent]
})

export class SettingEditModule { }
