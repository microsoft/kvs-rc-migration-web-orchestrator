import { Injectable } from '@angular/core';
import { allMigrationEndpoints } from '../models/allMigrationEndpoints';
import { ServiceItem } from '../models/Service';

@Injectable({
  providedIn: 'root'
})
export class SelectedServicesService {
  public static _instance: SelectedServicesService;
  public AllServices: ServiceItem[];
  public selectedServicesId : string[]; //service ids
  public listServices: {};
  public AllMigEndpoints: allMigrationEndpoints[];
  
  private constructor() {
    this.AllServices = [];
    this.selectedServicesId = [];
    this.listServices = {};
    this.AllMigEndpoints = [];
   }

   public static get_Instance(){
    return this._instance || (this._instance = new this());
   }
}
