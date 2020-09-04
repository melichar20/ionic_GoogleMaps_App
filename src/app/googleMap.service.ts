import { Injectable } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { GoogleMaps, GoogleMap, Marker, GoogleMapsAnimation, MyLocation, ILatLng, Circle, Spherical, GoogleMapsEvent  } from '@ionic-native/google-maps';

import {HttpService } from './http.service';
import { Location } from './iLocation'
import { __makeTemplateObject } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapService {
  location: Location;
  map: GoogleMap;
  lat: any;
  long: any;
  city: any;
  state: any;

  constructor(private platform: Platform, private http: HttpService, private alertCtrl: AlertController) { }

  createMap(el: string, mapTab: GoogleMap) {
    mapTab = GoogleMaps.create(el, {
      camera: {
        target: {
          lat: 27.949992,
          lng: -82.456720
        },
        zoom: 8,
        tilt: 30
      }
    });
    return mapTab;
  }

  getMyLocation(mapTab: GoogleMap) {
    mapTab.getMyLocation().then((location: MyLocation) => {
      console.log(JSON.stringify(location, null ,2));

      this.moveMapView(mapTab, location.latLng.lat, location.latLng.lng);

      this.addMarker(mapTab, location.latLng.lat, location.latLng.lng);
    });
  }

  moveMapView(mapTab: GoogleMap, lat: number, long: number) {
    mapTab.animateCamera({
      target: {
        lat: lat,
        lng: long
      },
      zoom: 15,
      tilt: 30
    });
    return mapTab;
  }

  addMarker(mapTab: GoogleMap, lat: number, long: number, city: string = 'your', state: string = 'spot!') {
    let marker: Marker = mapTab.addMarkerSync({
      title: `Welcome to ${city}, ${state}`,
      snippet: `${lat}, ${long}`,
      position: {
        lat: lat,
        lng: long
      },
      draggable: true,
      disableAutoPan: true,
      animation: GoogleMapsAnimation.BOUNCE
    });
    //marker.trigger(GoogleMapsEvent.MARKER_CLICK);

    let center: ILatLng = {"lat": lat, "lng": long};
    let radius = 300;

    // Calculate the positions
    let positions: ILatLng[] = [0, 90, 180, 270].map((degree: number) => {
      return Spherical.computeOffset(center, radius, degree);
    });

    let circle: Circle = mapTab.addCircleSync({
      'center': center,
      'radius': radius,
      'strokeColor' : '#AA00FF',
      'strokeWidth': 5,
      'fillColor' : '#00880055',
    });

    marker.on('position_changed').subscribe((params: any) => {
      let newValue: ILatLng = <ILatLng>params[1];
      let newRadius: number = Spherical.computeDistanceBetween(center, newValue);
      circle.setRadius(newRadius);
    });
    return mapTab;
  }

  getLatLong(mapTab: GoogleMap, val: number | string) {
    console.log(`Location: ${val}`);
 
    this.http.getAerisLatLong(val).subscribe((data: Location) => {
      console.log(data);
      if(!data.success){
        return this.alertCtrl.create({
          header: `${data.error.description} Don't forget the comma.`
        }).then(promptElement => {promptElement.present()});
      }
      
      this.lat = data.response.loc.lat;
      this.long = data.response.loc.long;
      this.city = data.response.place.city;             // <<<<<<<<<----------Refactor
      this.state = data.response.place.state
   
      console.log(data.response.loc);

      //-----------Call Map Service and display Lat/Long Marker---------------//
      mapTab = this.moveMapView(mapTab, this.lat, this.long);
      mapTab = this.addMarker(mapTab, this.lat, this.long, this.city, this.state);

      return mapTab;
    });
  }









}
