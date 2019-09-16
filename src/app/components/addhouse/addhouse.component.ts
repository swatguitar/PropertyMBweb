import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { } from 'googlemaps';
import { AuthenticationService, TokenPayload, locationsDetails } from '../../authentication.service'
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';





@Component({
  selector: 'app-addhouse',
  templateUrl: './addhouse.component.html',
  styleUrls: ['./addhouse.component.css'],

})

export class AddhouseComponent implements OnInit {
  addhouseForm: FormGroup;
  formSubmitted = false;
  constructor(private formBuilder: FormBuilder, private auth: AuthenticationService, private router: Router, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {}
      buildForm() {
        this.addhouseForm = new FormGroup ({
          PropertyType: new FormControl (''),
        AnnounceTH: new FormControl ('', Validators.required),
        SellPrice: new FormControl ('', Validators.required),
        CodeDeed: new FormControl ('', Validators.required),
        Costestimate: new FormControl ('', Validators.required),
        MarketPrice: new FormControl ('', Validators.required),
        HouseArea: new FormControl ('', Validators.required),
        BathRoom: new FormControl ('', Validators.required),
        BedRoom: new FormControl ('', Validators.required),
        CarPark: new FormControl ('', Validators.required),
        GroundValue: new FormControl ('', Validators.required),
        Floor: new FormControl ('', Validators.required),
        MFee: new FormControl ('', Validators.required),
        newhouse: new FormControl (''),
        oldhouse: new FormControl (''),
        AsseStatus: new FormControl (''),
        BuildingAge: new FormControl ('', Validators.required),
        BuildFD: new FormControl (''),
        BuildFM: new FormControl (''),
        BuildFY: new FormControl (''),
        ObservationPoint: new FormControl ('', Validators.required),
        Directions: new FormControl (''),
        LandR: new FormControl ('', Validators.required),
        LandG: new FormControl ('', Validators.required),
        LandWA: new FormControl ('', Validators.required),
        LandAge: new FormControl ('', Validators.required),
        Location: new FormControl ('', Validators.required),
        LProvince: new FormControl ('', Validators.required),
        LAmphur: new FormControl ('', Validators.required),
        LDistrict: new FormControl ('', Validators.required),
        RoadWide: new FormControl (''),
        });
      }
  
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  province: locationsDetails;
  amphur: any[];
  PA: locationsDetails;
  district: locationsDetails;
  zipcode: any[];
  private geoCoder;
  public details: any;
  createID: string
  years: any[];
  contactUser: any[];
  selectContact: any[];
  selectContact2: any[];
  selectContact3: any[];
  Name:string 
  ZIPCODE:string
  EmailContact:string
  PhoneContact:string
  LineContact:string
  @ViewChild('search', { static: true })
  public searchElementRef: ElementRef;

  credentials: TokenPayload = {
    ID_User: 0,
    Firstname: '',
    Lastname: '',
    Email: '',
    Password: '',
    Birthday: '',
    CodeProperty: '',
    LocationU: '',
    Phone: '',
    ProfileImg: '',
    Age: '',
    Gender: '',
    ID_Property: '',
    PropertyType: '',
    AnnounceTH: '',
    CodeDeed: '',
    SellPrice: '',
    Costestimate: '',
    CostestimateB: '',
    MarketPrice: '',
    BathRoom: '',
    BedRoom: '',
    CarPark: '',
    HouseArea: '',
    Floor: '',
    LandR: '',
    LandG: '',
    LandWA: '',
    LandU: '',
    HomeCondition: '',
    BuildingAge: '',
    BuildFD: '',
    BuildFM: '',
    BuildFY: '',
    Directions: '',
    RoadType: '',
    RoadWide: '',
    GroundLevel: '',
    GroundValue: '',
    MoreDetails: '',
    Latitude: 0,
    Longitude: 0,
    AsseStatus: '',
    ObservationPoint: '',
    Location: '',
    LProvince: '',
    LAmphur: '',
    LDistrict: '',
    LZipCode: '',
    ContactU: 0,
    ContactS: '',
    ContactUo: 0,
    ContactSo: '',
    ContactUt: 0,
    ContactSt: '',
    LandAge: '',
    PPStatus: '',
    ImageEX: '',
    TypeCode: '',
    PriceWA: '',
    WxD: '',
    Owner: '',
    //------ forniture-----
    ShuttleBus: 0,
    Publicarea: 0,
    Fitness: 0,
    pool: 0,
    Securityguard: 0,
    CCTV: 0,
    shelves: 0,
    sofa: 0,
    TCset: 0,
    wardrobe: 0,
    gasstove: 0,
    microwave: 0,
    refrigerator: 0,
    TV: 0,
    WIFI: 0,
    Waterheater: 0,
    AirPurifier: 0,
    afan: 0,
    airconditioner: 0,

    //-------locate--
    Blind: 0,
    Neareducation: 0,
    Cenmarket: 0,
    Market: 0,
    River: 0,
    Mainroad: 0,
    Insoi: 0,
    Letc: '',
    WVmachine: 0,
    CWmachine: 0,
    Elevator: 0,
    Lobby: 0,
    ATM: 0,
    BeautySalon: 0,
    Hairsalon: 0,
    Laundry: 0,
    Store: 0,
    Balcony: 0,
    MeetingR: 0,
    EventR: 0,
    LivingR: 0,
    Supermarket: 0,
    CStore: 0,
    MFee: '',
    ID_Lands: '',
    ColorType: '',
    PricePM: '',
    Land: '',
    Deed: '',
    Place: '',
    imgProperty: null,
    //------ contact ------
    ID_Contact: 0,
    ContactName: " ",
    ContactEmail: " ",
    ContactLine: " ",
    ContactPhone: " ",
  }

  ngOnInit() {
    this.buildForm();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 15;
        });
      });
    });


    //-------------------------------------------------
    var year = new Date().getFullYear();
    var yearth = year + 543
    var range = [];
    range.push(yearth);
    for (var i = 1; i < 100; i++) {
      range.push(yearth - i);

    }
    this.years = range;


    //------------getlocation-------
    this.auth.getProvine().subscribe((province) => {
      this.province = province;
    },
      err => {
        console.error(err)

      }
    )
    this.onResiveContact()
  }
  get f() { return this.addhouseForm.controls; }
  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 15;
          this.address = results[0].formatted_address;
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }

    });

  }

  selectprovince(data) {
   this.credentials.LProvince = data.PROVINCE_NAME
    this.auth.getAmphur().subscribe((amphur) => {
      // กรณี resuponse success
      this.amphur = amphur.filter(article => {
        return article.PROVINCE_ID == data.PROVINCE_ID;
      });
    },
      err => {
        console.error(err)
      }
    )
  }

  selectamphur(data) {
    this.credentials.LAmphur = data.AMPHUR_NAME
    this.auth.getDistrict().subscribe((district) => {
      // กรณี resuponse success
      this.district = district.filter(article => {
        return article.AMPHUR_ID == data.AMPHUR_ID;
      });
    },
      err => {
        console.error(err)
      }
    )
  }
  selectdistrict(data) {
    this.credentials.LDistrict= data.DISTRICT_NAME
    this.auth.getZipcode().subscribe((zipcode) => {
      // กรณี resuponse success
      this.zipcode = zipcode.filter(article => {
        return article.DISTRICT_ID == data.DISTRICT_ID;
      });
      
    },
      err => {
        console.error(err)
      }
    )

  }
  getZipCode(){
    this.zipcode.forEach((element, index) => {
        this.credentials.LZipCode = element.ZIPCODE 
    });
    
  }

  propType: string;
  IDprop: string;
  onFinish() {
    this.auth.uploadftp().subscribe(() => {
    },
      err => {
        console.error(err)
      }
    )

  }
  onResiveContact() {
    //-------- get contact ----
    this.auth.getContact().subscribe((contactUser) => {
      this.contactUser = contactUser;
    },
      err => {
        console.error(err)
      }
    )
  }
  onCreateContact() {
    this.auth.addcontact(this.credentials).subscribe(() => {
      this.onResiveContact()
      alert(JSON.stringify("บันทึกสำเร็จ"))
    },
      err => {
        console.error(err)
      }
    )
  }

  onEditContact() {
    this.auth.EditContact(this.credentials).subscribe(() => {
    },
      err => {
        console.error(err)
      }
    )
  }

  onGetContact(value) {
    this.credentials.ID_Contact = value
    this.credentials.ContactUt = value
    this.credentials.ContactUo = value
    this.credentials.ContactName = this.Name
    this.credentials.ContactEmail = this.EmailContact
    this.credentials.ContactPhone = this.PhoneContact
    this.credentials.ContactLine = this.LineContact
    this.selectContact = this.contactUser.filter(article => {
      return article.ID_Contact == value;
    });
  }
  onGetContact2(value) {
    this.credentials.ID_Contact = value
    this.credentials.ContactUo = value
    this.credentials.ContactName = this.Name
    this.credentials.ContactEmail = this.EmailContact
    this.credentials.ContactPhone = this.PhoneContact
    this.credentials.ContactLine = this.LineContact
    this.selectContact2 = this.contactUser.filter(article => {
      return article.ID_Contact == value;
    });
  }
  onGetContact3(value) {
    this.credentials.ID_Contact = value
    this.credentials.ContactName = this.Name
    this.credentials.ContactEmail = this.EmailContact
    this.credentials.ContactPhone = this.PhoneContact
    this.credentials.ContactLine = this.LineContact
    console.log(this.credentials.ContactName )
    this.selectContact3 = this.contactUser.filter(article => {
      return article.ID_Contact == value;
    });
  }

  nextstep:string ='false'
  onFirststep(event) {
    event.preventDefault();
    this.formSubmitted = true

    if (this.addhouseForm.valid) {
      console.log(this.addhouseForm.value); // Process your form
    }else{
      this.nextstep = 'true'
    }
   
    this.credentials.Latitude = this.latitude
    this.credentials.Longitude = this.longitude
    if (this.credentials.PropertyType == "อาคารพานิชย์") {
      this.propType = "p"
    }
    if (this.credentials.PropertyType == "บ้าน") {
      this.propType = "h"
    }
    if (this.credentials.PropertyType == "คอนโด") {
      this.propType = "c"
    }

    this.onRandom()
    this.auth.getallhouse().subscribe((house) => {
      this.details = house

      this.details.filter(article => {
        this.IDprop = article.ID_Property
        console.log(this.IDprop + "----------------data")
        this.onCheckTwo()
      });
      console.log("..........." + this.credentials.ID_Property + " END")

      this.auth.addhouse(this.credentials).subscribe(
        () => {

        },
        err => {
          console.error(err)

        }

      )
    },
      err => {
        console.error(err)
      }
    )





  }
  onSave() {

    this.router.navigateByUrl('/home')
  }
  onRandom() {
    var max = 9;
    var min = 0;
    var r = Math.floor(Math.random() * (max - min + 1) + min);
    var x = Math.floor(Math.random() * (max - min + 1) + min);
    var y = Math.floor(Math.random() * (max - min + 1) + min);
    var z = Math.floor(Math.random() * (max - min + 1) + min);
    this.createID = this.propType + r + x + y + z;

  }
  loopChack() {
    this.onRandom()
    this.auth.getallhouse().subscribe((house) => {
      this.details = house

      this.details.filter(article => {
        this.IDprop = article.ID_Property
        console.log(this.IDprop + "-------data2222 ")
        this.onCheckTwo()
      });
    },
      err => {
        console.error(err)
      }
    )
  }
  onCheckTwo() {
    console.log(this.createID + "FIrst ")
    while (this.IDprop == this.createID) {
      this.loopChack()
    }
    this.credentials.ID_Property = this.createID
    console.log(this.credentials.ID_Property)


  }
}




