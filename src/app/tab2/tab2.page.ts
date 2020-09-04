import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GoogleMap  } from '@ionic-native/google-maps';

import { GoogleMapService } from '../googleMap.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private googleMap: GoogleMapService, private platform: Platform) {}

  map2: GoogleMap;


  async ngOnInit() {
    //waiting platform.ready
    await this.platform.ready();
    await this.loadMap();
  }

  async loadMap() {
    this.map2 = this.googleMap.createMap("map_canvas2", this.map2);
  }

  async getMyLocation() {
    this.map2.clear();
    this.googleMap.getMyLocation(this.map2);
  }

  async getLocation(val: string) {
    this.map2.clear();
    this.googleMap.getLatLong(this.map2, val);
  }

  async getAddCircle() {
    
  }


}
