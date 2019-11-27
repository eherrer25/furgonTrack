import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;

declare var google;


@Component({
  selector: 'app-mapa-conductor',
  templateUrl: './mapa-conductor.page.html',
  styleUrls: ['./mapa-conductor.page.scss'],
})
export class MapaConductorPage implements OnInit {

  locations: Observable<any>;
  locationsCollection: AngularFirestoreCollection<any>;

  // Map related
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers = [];

  // Misc
  isTracking = false;
  watch: string;
  user = null;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.anonLogin();
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadMap();
  }
// Perform an anonymous login and load data
anonLogin() {
  this.afAuth.auth.signInAnonymously().then(res => {
    this.user = res.user;

    this.locationsCollection = this.afs.collection(
        `locations/${this.user.uid}/track`,
        ref => ref.orderBy('timestamp')
    );

    // Make sure we also get the Firebase item ID!
    this.locations = this.locationsCollection.snapshotChanges().pipe(
        map(actions =>
            actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            })
        )
    );

    // Update Map marker on every change
    this.locations.subscribe(locations => {
      this.updateMap(locations);
    });
  });
}

// Initialize a blank map
loadMap() {
  let latLng = new google.maps.LatLng(51.9036442, 7.6673267);

  let mapOptions = {
    center: latLng,
    zoom: 5,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
}

}
