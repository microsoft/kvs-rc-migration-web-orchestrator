import { Injectable } from '@angular/core';
import { allMigrationEndpoints } from '../models/allMigrationEndpoints';
import { ApplicationItem, Applications } from '../models/Application';
import { service, ServiceItem } from '../models/Service';
import { ListServicesComponent } from '../modules/service-selection/list-services/list-services.component';
import { selectedServices } from '../modules/service-selection/list-services/selectedService';
import { GetMigrationListenerService } from './get-migration-listener.service';
import { SelectedServicesService } from './selected-services.service';

@Injectable({
  providedIn: 'root'
})
export class StoreAllServicesService {
  public listApplications: string[] = [];
  public listServices = {};  // serviceid , ap
  public allServices : ServiceItem[] = [];
  public checked_Services : selectedServices[] = []; 

  public allMigrationListener: allMigrationEndpoints[];

  constructor(
    private getmigrationListener: GetMigrationListenerService,
    private selectedServices: SelectedServicesService,
    private listService: ListServicesComponent
  ) { }

  getAllApplications(){
    this.getmigrationListener.getAllApplications().subscribe(
      resp=> {
        var applications: Applications = resp;
        for(var item in applications.Items){
          var appid: string = applications.Items[item].Id;
          this.listApplications.push(appid);

          // update the global variable to store the application if not present
          this.updateGlobalApplications(applications.Items[item]);
          this.getAllServices(appid);
        } 
      
       
      }
    )
    this.listService.allServices = this.allServices;
    this.listService.listApplications = this.listApplications;
    this.listService.listServices = this.listServices;
  }
  updateGlobalApplications(app: ApplicationItem){
    if(!(this.selectedServices.AllMigEndpoints.some(o => o.app_id === app.Id))){
      this.selectedServices.AllMigEndpoints.push(
        {app_id: app.Id, 
          app_name: app.Name, 
          app_type: app.TypeName, 
          service_details:[]
        });
    }
  }

  getAllServices(ApplicationId: string){
    this.getmigrationListener.getAllServices(ApplicationId).subscribe(
      resp => {

        var services: service = resp;
        for(var item in services.Items){
          var serviceid: string = services.Items[item].Id;
          this.listServices[serviceid]= ApplicationId;
          this.allServices.push(services.Items[item]);
          
          //this.checkSelectedServices(serviceid);

          // update the global variable to store the services of the given application
          this.updateGlobalServices(services.Items[item], ApplicationId);
          
        
          //this.getAllPartitions(this.services.Items[item].Id);
          
        }
        this.selectedServices.AllServices = this.allServices;
        this.selectedServices.listServices = this.listServices;
       
      }
      
    );
  }

  updateGlobalServices(service: ServiceItem, ApplicationId: string){
    let obj = this.selectedServices.AllMigEndpoints.find((o, i) => {
      if (o.app_id === ApplicationId ) {
        if(!(this.selectedServices.AllMigEndpoints[i].service_details.some(o1 => o1.service_id === service.Id))){
          this.selectedServices.AllMigEndpoints[i].service_details.push({
              service_id: service.Id,
              service_name: service.Name,
              partition_details: []
            })
          }
          return true;
      }
  });

  }


}
