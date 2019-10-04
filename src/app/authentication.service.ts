import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'



export interface UserDetails {
  ID_User: number
  Firstname: string
  Lastname: string
  Email: string
  Password: string
  Birthday: string
  LocationU: string
  Phone: string
  ProfileImg: string
  Age: string
  Gender: string
  Created: Date
  exp: number
  iat: number
}

export interface locationsDetails {
  PROVINCE_ID: number
  PROVINCE_CODE: string
  PROVINCE_NAME: string
  GEO_ID: number
  AMPHUR_ID: number
  AMPHUR_CODE: string
  AMPHUR_NAME: string
  DISTRICT_ID: number
  DISTRICT_CODE: string
  DISTRICT_NAME: string
  ZIPCODE_ID: number
  ZIPCODE: string
}

export interface GroupDetails {
  ID_Group: number
  name: string
  Img: string
  created: Date
}

export interface PropertyDetails {
  //----land---
  ID_Lands: string
  ColorType: string
  CodeProperty: string
  Land: string
  Deed: string
  Place: string
  TypeCode: string
  PriceWA: string
  WxD: string
  //------house-----
  ID_Property: string
  PropertyType: string
  AnnounceTH: string
  CodeDeed: string
  SellPrice: string
  CostestimateB: string
  Costestimate: string
  MarketPrice: string
  BathRoom: string
  BedRoom: string
  CarPark: string
  HouseArea: string
  Floor: string
  LandR: string
  LandG: string
  LandWA: string
  LandU: string
  HomeCondition: string
  BuildingAge: string
  BuildFD: string
  BuildFM: string
  BuildFY: string
  Directions: string
  RoadType: string
  RoadWide: string
  GroundLevel: string
  GroundValue: string
  MoreDetails: string
  Latitude: number
  Longitude: number
  AsseStatus: string
  ObservationPoint: string
  Location: string
  LProvince: string
  LAmphur: string
  LDistrict: string
  LZipCode: string
  ContactU: string
  ContactS: string
  ContactUo: string
  ContactSo: string
  ContactUt: string
  ContactSt: string
  LandAge: string
  PPStatus: string
  ImageEX: string
  Owner: string
  //------ forniture-----

  ShuttleBus: number
  Publicarea: number
  Fitness: number
  pool: number
  Securityguard: number
  CCTV: number
  shelves: number
  sofa: number
  bed: number
  TCset: number
  wardrobe: number
  gasstove: number
  microwave: number
  refrigerator: number
  TV: number
  WIFI: number
  Waterheater: number
  AirPurifier: number
  afan: number
  airconditioner: number
  //-----อสังหา---
  MFee: string
  //-----condo---
  WVmachine: number
  CWmachine: number
  Elevator: number
  Lobby: number
  ATM: number
  BeautySalon: number
  Hairsalon: number
  Laundry: number
  Store: number
  Balcony: number
  MeetingR: number
  EventR: number
  LivingR: number
  Supermarket: number
  CStore: number
  //-------locate--
  Blind: number
  Neareducation: number
  Cenmarket: number
  Market: number
  River: number
  Mainroad: number
  Insoi: number
  Letc: string
  //------ contact ------
  ID_Contact: string
  ContactName: string
  ContactEmail: string
  ContactLine: string
  ContactPhone: string


}


interface TokenResponse {
  token: string
}

export interface TokenPayload {
  //------user----
  ID_User: number
  Firstname: string
  Lastname: string
  Email: string
  Password: string
  Birthday: string
  LocationU: string
  Phone: string
  ProfileImg: string
  Age: string
  Gender: string
  //----land---
  ID_Lands: string
  ColorType: string
  PricePM: string
  Land: string
  CodeProperty: string
  Deed: string
  Place: string
  TypeCode: string
  PriceWA: string
  WxD: string
  //------house-----
  ID_Property: string
  PropertyType: string
  AnnounceTH: string
  CodeDeed: string
  SellPrice: string
  Costestimate: string
  CostestimateB: string
  MarketPrice: string
  BathRoom: string
  BedRoom: string
  CarPark: string
  HouseArea: string
  Floor: string
  LandR: string
  LandG: string
  LandWA: string
  LandU: string
  HomeCondition: string
  BuildingAge: string
  BuildFD: string
  BuildFM: string
  BuildFY: string
  Directions: string
  RoadType: string
  RoadWide: string
  GroundLevel: string
  GroundValue: string
  MoreDetails: string
  Latitude: number
  Longitude: number
  AsseStatus: string
  ObservationPoint: string
  Location: string
  LProvince: string
  LAmphur: string
  LDistrict: string
  LZipCode: string
  ContactU: string
  ContactS: string
  ContactUo: string
  ContactSo: string
  ContactUt: string
  ContactSt: string
  LandAge: string
  PPStatus: string
  ImageEX: string
  Owner: string
  //------ forniture-----

  ShuttleBus: number
  Publicarea: number
  Fitness: number
  pool: number
  Securityguard: number
  CCTV: number
  shelves: number
  sofa: number
  bed: number
  TCset: number
  wardrobe: number
  gasstove: number
  microwave: number
  refrigerator: number
  TV: number
  WIFI: number
  Waterheater: number
  AirPurifier: number
  afan: number
  airconditioner: number
  //-----อสังหา---
  MFee: string
  //-----condo---
  WVmachine: number
  CWmachine: number
  Elevator: number
  Lobby: number
  ATM: number
  BeautySalon: number
  Hairsalon: number
  Laundry: number
  Store: number
  Balcony: number
  MeetingR: number
  EventR: number
  LivingR: number
  Supermarket: number
  CStore: number
  //-------locate--
  Blind: number
  Neareducation: number
  Cenmarket: number
  Market: number
  River: number
  Mainroad: number
  Insoi: number
  Letc: string
  imgProperty: File
  //------ contact ------
  ID_Contact: string
  ContactName: string
  ContactEmail: string
  ContactLine: string
  ContactPhone: string
  

 
}

@Injectable()
export class AuthenticationService {
  ROOT_URL = "http://localhost:3001";
  private token: string

  constructor(private http: HttpClient, private router: Router) { }

  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token)
    this.token = token
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken')
    }
    return this.token
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } else {
      return null
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if (user) {
      return true
    } else {
      return false
    }
  }

  public register(user: TokenPayload): Observable<any> {
    return this.http.post(this.ROOT_URL + `/users/register`, user)
  }

  public addgroup(group: TokenPayload): Observable<any> {
    return this.http.post(this.ROOT_URL + `/users/addgroup`, group, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public addland(land: TokenPayload): Observable<any> {
    return this.http.post(this.ROOT_URL + `/users/addland`, land, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public EditContact(contact: TokenPayload): Observable<any> {
    return this.http.put(this.ROOT_URL + `/users/EditContact`, contact, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public addcontact(contact: TokenPayload): Observable<any> {
    return this.http.post(this.ROOT_URL + `/users/addContact`, contact, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public addhouse(house: TokenPayload): Observable<any> {
    return this.http.post(this.ROOT_URL + `/users/addhouse`, house, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public EditHouse(house: TokenPayload): Observable<any> {
    return this.http.put(this.ROOT_URL + `/users/EditHouse`, house, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public EditLand(land: TokenPayload): Observable<any> {
    return this.http.put(this.ROOT_URL + `/users/EditLand`, land, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public uploadimg(house: TokenPayload): Observable<any> {
    return this.http.post(this.ROOT_URL + `/users/upload`, house, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }


  public login(user: TokenPayload): Observable<any> {
    const base = this.http.post(this.ROOT_URL + `/users/login`, user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )

    return request
  }

  public profile(): Observable<any> {
    return this.http.get(this.ROOT_URL + `/users/profile`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public getland(): Observable<any> {
    return this.http.get(this.ROOT_URL + `/users/land`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public getContact(): Observable<any> {
    return this.http.get(this.ROOT_URL + `/users/contact`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public uploadftp(): Observable<any> {
    return this.http.get(this.ROOT_URL + `/users/uploadftp`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public getAllland(): Observable<any> {
    return this.http.get(this.ROOT_URL + `/users/landsall`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public getgroup(): Observable<any> {
    return this.http.get(this.ROOT_URL + `/users/group`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public gethouse(): Observable<any> {
    return this.http.get(this.ROOT_URL + `/users/house`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public getallhouse(): Observable<any> {
    return this.http.get(this.ROOT_URL + `/users/houses`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public getimghouse(): Observable<any> {
    return this.http.get(this.ROOT_URL + `/users/imghouse`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
   public getimgland(): Observable<any> {
    return this.http.get(this.ROOT_URL + `/users/imgland`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public getProvine(): Observable<any> {
    return this.http.get(this.ROOT_URL + `/users/Province`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public getAmphur(): Observable<any> {
    return this.http.get(this.ROOT_URL + `/users/Amphur`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public getDistrict(): Observable<any> {
    return this.http.get(this.ROOT_URL + `/users/District`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public getZipcode(): Observable<any> {
    return this.http.get(this.ROOT_URL + `/users/Zipcode`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('/')
  }
}
