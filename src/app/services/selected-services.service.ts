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
   public isCheckedService(service_id: string, app_id:string): boolean{
    var checked: boolean = false;
    let app1 = this.AllMigEndpoints.find((app, index1) => {
      if (app.app_id === app_id) {
          let service1 = this.AllMigEndpoints[index1].service_details.find((service, index2) => {
            if(service.service_id === service_id){
              
                
                  checked = this.AllMigEndpoints[index1].service_details[index2].isSelected;
              
            }
          }) 
          
        }
   });
   return checked;
  }
}
