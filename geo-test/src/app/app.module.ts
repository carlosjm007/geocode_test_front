import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MapaComponent } from './mapa/mapa.component';
import { TableComponent } from './table/table.component';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
	{ path: 'mapa', component: MapaComponent },
	{ path: 'tabla', component: TableComponent },
];

@NgModule({
	declarations: [
		AppComponent,
		MapaComponent,
		TableComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		RouterModule.forRoot(
			appRoutes,
			{ enableTracing: true } // <-- debugging purposes only
		),
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyAYVHSbEo-Rh1qBeOOk_BKiXns7bzVniyQ'
		}),
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
