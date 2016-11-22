import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

import { ContainerModule } from './container/container.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		RouterModule.forRoot(routes),
		ContainerModule,
		SharedModule.forRoot()
	],
	declarations: [AppComponent],
	providers: [{
		provide: LocationStrategy, 
		useClass: HashLocationStrategy // overrides the default PathLocationStrategy
	},
	{
		provide: APP_BASE_HREF,
		useValue: '<%= APP_BASE %>'
	}],
	bootstrap: [AppComponent]

})

export class AppModule { }
