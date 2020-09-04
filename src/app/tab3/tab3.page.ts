import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GoogleMap  } from '@ionic-native/google-maps';

import { GoogleMapService } from '../googleMap.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private googleMap: GoogleMapService, private platform: Platform) {}

  map3: GoogleMap;

  async ngOnInit() {
    //waiting platform.ready
    await this.platform.ready();
    await this.loadMap();
  }

  async loadMap() {
    this.map3 = this.googleMap.createMap("map_canvas3", this.map3);
  }

  async getMyLocation() {
    this.map3.clear();
    this.googleMap.getMyLocation(this.map3);
  }

  async getLocation(latlng: number) {
    this.map3.clear();
    this.googleMap.getLatLong(this.map3, latlng);
  }

  async getAddCircle() {
    
  }


}
