import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';
import { CommonModule } from '@angular/common';

import { SettingsService  } from '../../shared/settings/settings.service';
import { SettingsGridComponent } from './settings-grid.component';

@NgModule({
    imports: [RouterModule,Ng2TableModule,PaginationModule,TabsModule,CommonModule],
    declarations: [SettingsGridComponent],
    exports: [SettingsGridComponent],
    providers: [SettingsService]
})

export class SettingsGridModule { }
