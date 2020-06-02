import { Component, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { } from 'googlemaps';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { AuthenticationService, ID, UserDetails, PropertyDetails, ImageID, PDF } from '../../../authentication.service'
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import domtoimage from 'dom-to-image';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-house-pdf',
  templateUrl: './house-pdf.component.html',
  styleUrls: ['./house-pdf.component.css']
})
export class HousePdfComponent implements OnInit {
  showSpinerImg: boolean;
  showSpiner: boolean;

  filename: any;




  UserProfile: any[];
  NameU: string
  details: PropertyDetails;
  imgbox: any[];
  imagenew: any[];
  public postID: string;
  public activePage: number;
  results: PropertyDetails[];
  zoom: number = 5;
  latitude: number = 13.7348534; loading: boolean;
  result: any;
  ;
  longitude: number = 100.4997134999999;
  lat: number;
  lng: number;
  conS1: string;
  conS2: string;
  conS3: string;
  imageIndex = 1;
  galleryId = 1;
  isPlaying = true;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  a: any
  imgMap: HTMLImageElement;
  selectContact: any[];
  selectContact2: any[];
  selectContact3: any[];
  contactUser: any[];
  IDcontact1: string
  IDcontact2: string
  IDcontact3: string
  lonnew: number;
  latnew: number;
  credentials: ID = {
    ID_Lands: '',
    ID_Property: '',
    ContactU: '',
    ContactUo: '',
    ContactUt: '',
    PPStatus: '',
  }
  ImageID: ImageID = {
    ID_Lands: '',
    ID_Property: '',
    ID_Photo: '',
    URL: '',
  }
  PDF: PDF = {
    ID_Property: '',
    ID_Lands: '',
    ID_Photo: '',
    content: '',
    URL: '',
    filename: '',
  }
  constructor(private auth: AuthenticationService, private route: ActivatedRoute, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private router: Router) { }



  ngOnInit() {
    let params = this.route.snapshot.paramMap;
    if (params.has('id')) {
      this.postID = params.get('id');
    }
    this.credentials.ID_Property = this.postID;
    this.ImageID.ID_Property = this.postID;
    this.getHouse()
    this.getProfile()
    this.getImage()

  }

  //************* get property *************
  getHouse() {
    this.auth.GetHouseDetail(this.credentials).subscribe((house) => {
      if (house) {
        this.results = house
        this.details = house
        this.credentials.ContactU = house[0].ContactU
        this.credentials.ContactUt = house[0].ContactUt
        this.credentials.ContactUo = house[0].ContactUo
        this.conS1 = house[0].ContactS
        this.conS2 = house[0].ContactSt
        this.conS3 = house[0].ContactSo
        this.latitude = Number(house[0].Latitude)
        this.longitude = Number(house[0].Longitude)
        this.getContact()
        this.showSpiner = true
        setTimeout(() => {
          this.Export()
        }, 3000);

        //this.showSpinner = false
      }
    },
      err => {
        console.error(err)
      })
  }

  //************* get owner*************
  getProfile() {
    this.auth.profile().subscribe(
      user => {
        this.UserProfile = user
      },
      err => {
        console.error(err)
      }
    )
  }

  //************* get Image *************
  getImage() {
    this.showSpinerImg = true
    this.auth.getimghouse(this.ImageID).subscribe((img) => {
      if (img) {
        this.showSpinerImg = false
        this.imgbox = img
      }
    })
  }
  //************* get PDF *************
  getPDF() {
    this.loading = true
    if(this.PDF.ID_Property == ''){
      alert(JSON.stringify("กำลังโหลดแผนที่ กรุณาลองอีกครั้ง"))
      return;
    }
    this.auth.PDFHouse(this.PDF).subscribe((result) => {
 
      if (result) {
        var file = new Blob([result], {type: 'application/pdf'});
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
        this.showSpiner= false
        this.loading = false
      }
    })
  }

  //************* get contact *************
  getContact() {
    this.selectContact = []
    this.selectContact2 = []
    this.selectContact3 = []
    this.auth.getContactDetail(this.credentials).subscribe((contactUser) => {
      if (contactUser) {
        this.contactUser = contactUser;
        this.selectContact.push(this.contactUser[0])
        if (contactUser.length == 2) {
          this.selectContact2.push(this.contactUser[1])
        } else if (contactUser.length == 3) {
          this.selectContact3.push(this.contactUser[2])
          this.selectContact2.push(this.contactUser[1])
        }
      }
    },
      err => {
        console.error(err)
      }
    )
  }

  Export() {
    var map, mapOptions;
    mapOptions = {
      center: new google.maps.LatLng(this.latitude, this.longitude),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    //URL of Google Static Maps.
    var staticMapUrl = "https://maps.googleapis.com/maps/api/staticmap";

    //Set the Google Map Center.
    staticMapUrl += "?center=" + mapOptions.center.lat() + "," + mapOptions.center.lng();

    //Set the Google Map Size.
    staticMapUrl += "&size=700x350";

    //Set the Google Map Zoom.
    staticMapUrl += "&zoom=" + mapOptions.zoom;

    //Set the Google Map Type.
    staticMapUrl += "&maptype=" + mapOptions.mapTypeId;

    //Loop and add Markers.

    staticMapUrl += "&markers=color:red|" + this.latitude + "," + this.longitude + "&key=AIzaSyCtHlvZUC6SiC7cWqS0xm4_PnS9Qc3gF3o";


    //Display the Image of Google Map.
    this.showSpiner = false
    this.PDF.URL = staticMapUrl
    this.PDF.ID_Property = this.postID
    
    var imgMap = document.getElementById("imgMap");
    imgMap.setAttribute("src", staticMapUrl);
    imgMap.style.display = "block";
    console.log(imgMap)
  }






}
