import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
	title: string = 'Arrastra el marcador';
	lat: number = 51.678418;
	lng: number = 7.809007;
	coordenadas: string = '';
	constructor(public http: HttpClient) { }

	ngOnInit() {
	}

	encodeQueryData(data) {
		const ret = [];
		for (let d in data)
			ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
		return ret.join('&');
	}

	markerDragEnd(m: marker, $event: MouseEvent) {
		console.log('dragEnd', m, $event);
		//console.log(m.lat + " | " + m.lng);
		this.coordenadas = $event.coords.lat + " | " + $event.coords.lng;
	}

	buscar_direccion(direccion){
		const data = { 'address': direccion, 'key': 'AIzaSyAYVHSbEo-Rh1qBeOOk_BKiXns7bzVniyQ' };
		const variables = this.encodeQueryData(data);
		this.http.get("https://maps.googleapis.com/maps/api/geocode/json?"+variables).subscribe((res : any[])=>{
            this.markers[0].lat = res["results"][0]["geometry"]["location"]["lat"];
            this.markers[0].lng = res["results"][0]["geometry"]["location"]["lng"];
            this.lat = res["results"][0]["geometry"]["location"]["lat"];
            this.lng = res["results"][0]["geometry"]["location"]["lng"];
            this.coordenadas = this.lat + " | " + this.lng;
        });
	}

	markers: marker[] = [
	  {
		  lat: 51.678418,
		  lng: 7.809007,
		  label: 'A',
		  draggable: true
	  },
  ]

}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}