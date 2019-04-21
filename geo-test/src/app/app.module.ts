import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMaterialModule } from './app.material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MapaComponent } from './mapa/mapa.component';
import { TableComponent, TableComponentEditForm } from './table/table.component';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
	{ path: 'mapa', component: MapaComponent },
	{ path: 'tabla', component: TableComponent },
];

@NgModule({
	declarations: [
		AppComponent,
		MapaComponent,
		TableComponent,
		TableComponentEditForm
	],
	imports: [
		ReactiveFormsModule,
		FormsModule,
		BrowserModule,
		AppRoutingModule,
		RouterModule.forRoot(
			appRoutes,
			{ enableTracing: true } // <-- debugging purposes only
		),
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyAYVHSbEo-Rh1qBeOOk_BKiXns7bzVniyQ'
		}),
		HttpClientModule,
		AppMaterialModule,
		BrowserAnimationsModule
	],
	providers: [],
	bootstrap: [AppComponent],
	entryComponents: [TableComponent, TableComponentEditForm]
})
export class AppModule { }
