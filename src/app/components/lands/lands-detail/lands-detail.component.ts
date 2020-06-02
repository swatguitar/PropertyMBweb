import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthenticationService, ID, UserDetails, PropertyDetails, ImageID } from '../../../authentication.service'
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { } from 'googlemaps';
import { MapsAPILoader, MouseEvent } from '@agm/core';


@Component({
  selector: 'app-lands-detail',
  templateUrl: './lands-detail.component.html',
  styleUrls: ['./lands-detail.component.css']
})
export class LandsDetailComponent implements OnInit {
  details: PropertyDetails[];
  imgbox: any[];
  imagenew: any[];
  zoom: number = 5;
  latitude: number = 13.7348534;
  showSpinner: boolean;
  longitude: number = 100.4997134999999;
  lat: number;
  lng: number;
  public postID: string;
  public activePage: number;
  public results: any;
  isPlaying = true;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  selectContact: any[];
  selectContact2: any[];
  selectContact3: any[];
  contactUser: any[];
  IDcontact1: string
  IDcontact2: string
  IDcontact3: string
  conS1: string
  conS2: string
  conS3: string
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
  constructor(private auth: AuthenticationService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.showSpinner = true
    //************* set show image *************
    this.galleryOptions = [
      { "imageAutoPlay": true, "imageAutoPlayPauseOnHover": true, "previewAutoPlay": true, "previewAutoPlayPauseOnHover": true },
      { "breakpoint": 500, "width": "300px", "height": "300px", "thumbnailsColumns": 3 },
      { "breakpoint": 300, "width": "100%", "height": "200px", "thumbnailsColumns": 2 }
    ]

    //************* แบ่งหน้า &&  get id property *************
    let params = this.route.snapshot.paramMap;
    if (params.has('id')) {
      this.postID = params.get('id');
    }
    this.route
      .queryParams
      .subscribe((data: { page: any }) => {
        if (data != null && data.page != null) {
          this.activePage = +data.page;
        }
      });

    this.ImageID.ID_Lands = this.postID
    this.credentials.ID_Lands = this.postID;
    this.getLand()
    this.getImage()
  }

  //************* get property *************
  getLand() {
    this.auth.GetLandDetail(this.credentials).subscribe((land) => {
      if (land) {
        this.results = land
        this.credentials.ContactU = land[0].ContactU
        this.credentials.ContactUt = land[0].ContactUt
        this.credentials.ContactUo = land[0].ContactUo
        this.conS1 = land[0].ContactS
        this.conS2 = land[0].ContactSt
        this.conS3 = land[0].ContactSo
        this.latitude = Number(land[0].Latitude)
        this.longitude = Number(land[0].Longitude)
        this.zoom = 15
        this.getContact()
        this.showSpinner = false
      }
    },
      err => {
        console.error(err)
      })
  }

  //************* get Image *************
  getImage() {
    this.auth.getimgland(this.ImageID).subscribe((img) => {
      if (img) {
        this.imgbox = img
      }
      if (img.length == 0) {
        this.galleryImages = [
          {
            small: 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/placeholder.jpg',
            medium: 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/placeholder.jpg',
            big: 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/placeholder.jpg'
          },
          {
            small: 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/placeholder.jpg',
            medium: 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/placeholder.jpg',
            big: 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/placeholder.jpg'
          },
          {
            small: 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/placeholder.jpg',
            medium: 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/placeholder.jpg',
            big: 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/placeholder.jpg'
          },
          {
            small: 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/placeholder.jpg',
            medium: 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/placeholder.jpg',
            big: 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/placeholder.jpg'
          },
          {
            small: 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/placeholder.jpg',
            medium: 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/placeholder.jpg',
            big: 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/placeholder.jpg'
          },
        ]
      } else {
        this.galleryImages = this.imgbox.map(item => {
          return {
            small: item.URL,
            medium: item.URL,
            big: item.URL
          };
        });
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

  //************* Delete house *************
  onDelete() {
    this.auth.DeleteLands(this.credentials).subscribe((results) => {
      if (!results.error) {
        alert(JSON.stringify("อสังหานี้ถูกลบแล้ว"))
        this.router.navigateByUrl('/home')
      } else {
        alert(JSON.stringify("ไม่สามารถลบอสังหาฯนี้ได้ กรุณาลองใหม่ภายหลัง"))
        console.log(results.error)
      }
    },
      err => {
        console.error(err)
      }
    )
  }

  //************* Update PPStatus house *************
  PPStatus(value) {
    this.credentials.PPStatus = value
  }
  UpdateStatus() {
    this.auth.UpdateStatusL(this.credentials).subscribe((result) => {
      if (!result.error) {
        this.refresh()
      } else {
        console.log(result.error)
      }
    },
      err => {
        console.error(err)

      }
    )
  }
  refresh(): void {
    window.location.reload();
  }

}
