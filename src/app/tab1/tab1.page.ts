import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GoogleMap  } from '@ionic-native/google-maps';

import { GoogleMapService } from '../googleMap.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private googleMap: GoogleMapService, private platform: Platform) {}

  map1: GoogleMap;

  async ngOnInit() {
    //waiting platform.ready
    await this.platform.ready();
    await this.loadMap();
  }

  async loadMap() {
    this.map1 = this.googleMap.createMap("map_canvas1", this.map1);
  }

  async getMyLocation() {
    this.map1.clear();
    this.googleMap.getMyLocation(this.map1);
  }

  async getLocation(zip: number) {
    this.map1.clear();
    this.googleMap.getLatLong(this.map1, zip);
  }

  async getAddCircle(val: number) {
    if(val > 0){
      console.log(val);
      
    }
    console.log("must greater than 0");
  }


}
