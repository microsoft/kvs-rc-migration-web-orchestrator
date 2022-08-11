import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIurls } from 'src/app/Common/APIurls';
import { Constants } from 'src/app/Common/Constants';
import { allMigrationEndpoints } from 'src/app/models/allMigrationEndpoints';
import { ApplicationItem, Applications } from 'src/app/models/Application';
import { instance } from 'src/app/models/Instance';
import { MigrationProgressModel } from 'src/app/models/MigrationProgress';
import { Partition, PartitionItem } from 'src/app/models/Partition';
import { service, ServiceItem } from 'src/app/models/Service';
import { GetMigrationListenerService } from 'src/app/services/get-migration-listener.service';
import { SelectedServicesService } from 'src/app/services/selected-services.service';
import { selectedServices } from './selectedService';

@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.scss']
})
export class ListServicesComponent implements OnInit {

  
  public listApplications: string[] = [];
  public listServices = {};  // serviceid , appid
  public listPartitions = {};
  public listInstances = {};
  public allServices : ServiceItem[] = [];
  public MigrationListener :string ='';
  public checked_Services : selectedServices[] = []; 

  public allMigrationListener: allMigrationEndpoints[];

  applications : Applications;
  services: service;
  partition: Partition;
  instance: instance;
  migrationProgressDetails: MigrationProgressModel;
  checked: boolean = false;

  constructor(private getmigrationListener: GetMigrationListenerService, 
              private route: ActivatedRoute,
              private Apiurl: APIurls,
              private selectedServices: SelectedServicesService){}

  ngOnInit(): void {
    this.getAllApplications();
  }

  
 



  getAllApplications(){
    this.getmigrationListener.getAllApplications().subscribe(
      resp=> {
        this.applications = resp;
        for(var item in this.applications.Items){
          var appid: string = this.applications.Items[item].Id;
          this.listApplications.push(appid);

          // update the global variable to store the application if not present
          this.updateGlobalApplications(this.applications.Items[item]);
          this.getAllServices(appid);
        } 
    
        this.allMigrationListener = this.selectedServices.AllMigEndpoints;
      }
    )
    
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

        this.services = resp;
        for(var item in this.services.Items){
          var serviceid: string = this.services.Items[item].Id;
          this.listServices[serviceid]= ApplicationId;
          this.allServices.push(this.services.Items[item]);
          
          // update the global variable to store the services of the given application
          this.updateGlobalServices(this.services.Items[item], ApplicationId);
          
          this.getAllPartitions(this.services.Items[item].Id);
          
        }
        this.selectedServices.AllServices = this.allServices;
        this.selectedServices.listServices = this.listServices;
       
      }
      
    );
  }

  updateGlobalServices(service: ServiceItem, ApplicationId: string){
    let obj = this.selectedServices.AllMigEndpoints.find((o, i): true => {
      if (o.app_id === ApplicationId ) {
        if(!(this.selectedServices.AllMigEndpoints[i].service_details.some(o1 => o1.service_id === service.Id))){
          this.selectedServices.AllMigEndpoints[i].service_details.push({
              service_id: service.Id,
              service_name: service.Name,
              partition_details: [],
              isSelected: false
            })
          }
          return true;
      }
  });

  }

  getAllPartitions(ServiceId: string) {
    this.getmigrationListener.getAllPartitions(ServiceId).subscribe(
      resp=> {
        var partition: Partition = resp;
        
        for(var item in partition.Items){
          var partitionid: string = partition.Items[item].PartitionInformation.Id;
          this.getAllInstances(partitionid, ServiceId);
        }
        //this.setPartitions();
   
        
      }
    )
  }

  updateGlobalPartitions(ServiceId: string, partitionId: string, MigrationListener: string){
    var migrationdummy = {} as MigrationProgressModel;
    this.selectedServices.AllMigEndpoints.find((obj, i) => {
      if(obj.app_id == this.selectedServices.listServices[ServiceId]){
        
        this.selectedServices.AllMigEndpoints[i].service_details.find((obj1, i1) => {
          if(obj1.service_id === ServiceId){
            
            if(!(this.selectedServices.AllMigEndpoints[i].service_details[i1].partition_details.some(obj2 => obj2.partition_id === partitionId))){

              this.selectedServices.AllMigEndpoints[i].service_details[i1].partition_details.push({
                partition_id: partitionId,
                migEndpoint: MigrationListener,
                selected: false,
                progress: [],
                migration_details: migrationdummy,
                showInvokeDowntime: false
              });
            } 
          }
        })
      }
    })
    this.allMigrationListener = this.selectedServices.AllMigEndpoints;
  }

  // collect the migration listener endpoint from the getInstance response
  getAllInstances(PartitionId: string, serviceID: string){
    this.getmigrationListener.getAllInstances(PartitionId).subscribe(
      resp=> {
        var instance: instance;
        instance = resp;
        for(var item in instance.Items){
          //this.listInstances[this.instance.Items[item].ReplicaId] = PartitionId;
          var migrationListener = 'undefined';
          if(instance.Items[item].Address.length > 0){
            migrationListener = this.getMigrationListener(instance.Items[item].Address);  
          }
          if ( typeof migrationListener !== 'undefined'){
            this.MigrationListener = migrationListener;
          }else{
            migrationListener='';
          }
          // update the global variable to store the partitions of the given service
          this.updateGlobalPartitions(serviceID, PartitionId, migrationListener);

        }

      }                                                                                                                                                                                                                                                                                                                                                                           
    )              
  }

  getMigrationListener(Endpoints: string){
    var endpoints = JSON.parse(Endpoints);
    return (endpoints["Endpoints"]["Migration Listener"]);
  }



  isCheckedService(app_id:string, service_id:string){
    this.checked = false;
    let app1 = this.selectedServices.AllMigEndpoints.find((app, index1) => {
      if (app.app_id === app_id) {
          let service1 = this.selectedServices.AllMigEndpoints[index1].service_details.find((service, index2) => {
            if(service.service_id === service_id){
              let partition1 = this.selectedServices.AllMigEndpoints[index1].service_details[index2].partition_details.find((partition, index3)=>{
                  this.checked = this.checked || this.selectedServices.AllMigEndpoints[index1].service_details[index2].partition_details[index3].selected;
                  
              })
            }
          }) 
          
      }
  });
  return this.checked;

}
  isCheckedPartition(app_id: string, service_id: string, partition_id: string){
    var checked: boolean = false;
    let app1 = this.selectedServices.AllMigEndpoints.find((app, index1) => {
      if (app.app_id === app_id) {
          let service1 = this.selectedServices.AllMigEndpoints[index1].service_details.find((service, index2) => {
            if(service.service_id === service_id){
              let partition1 = this.selectedServices.AllMigEndpoints[index1].service_details[index2].partition_details.find((partition, index3)=>{
                if(partition.partition_id === partition_id){
                  checked= this.selectedServices.AllMigEndpoints[index1].service_details[index2].partition_details[index3].selected;
                  return checked;
                }
              })
            }
          }) 
          return true; // stop searching
      }
  });
  

  }


  
  checkSelectedServices(app_id:string, service_id: string){
    var checked: boolean = false;
    let app1 = this.selectedServices.AllMigEndpoints.find((app, index1) => {
      if (app.app_id === app_id) {
          let service1 = this.selectedServices.AllMigEndpoints[index1].service_details.find((service, index2) => {
            if(service.service_id === service_id){
              this.selectedServices.AllMigEndpoints[index1].service_details[index2].isSelected = true;
              let partition1 = this.selectedServices.AllMigEndpoints[index1].service_details[index2].partition_details.find((partition, index3)=>{
                    this.selectedServices.AllMigEndpoints[index1].service_details[index2].partition_details[index3].selected = false;
                  
                
              })
            }
          }) 
          return true; // stop searching
      }
  });


    
  }

  checkSelectedPartitions(app_id:string, service_id: string, partition_id: string){

    let app1 = this.selectedServices.AllMigEndpoints.find((app, index1) => {
      if (app.app_id === app_id) {
          let service1 = this.selectedServices.AllMigEndpoints[index1].service_details.find((service, index2) => {
            if(service.service_id === service_id){
              let partition1 = this.selectedServices.AllMigEndpoints[index1].service_details[index2].partition_details.find((partition, index3)=>{
                if(partition.partition_id === partition_id){
                  this.selectedServices.AllMigEndpoints[index1].service_details[index2].partition_details[index3].selected = !this.selectedServices.AllMigEndpoints[index1].service_details[index2].partition_details[index3].selected;
                  
                }
              })
            }
          }) 
          return true; // stop searching
      }
    });
  }


  hasListener(app_id: string, service_id: string): boolean{
    var f: boolean = false;
    let app1 = this.selectedServices.AllMigEndpoints.find((app, index1) => {
      if (app.app_id === app_id) {
          let service1 = this.selectedServices.AllMigEndpoints[index1].service_details.find((service, index2) => {
            if(service.service_id === service_id){
              let partition1 = this.selectedServices.AllMigEndpoints[index1].service_details[index2].partition_details.find((partition, index3)=>{
                
                  if(this.selectedServices.AllMigEndpoints[index1].service_details[index2].partition_details[index3].migEndpoint.length > 1){
                    f = true;
                  }
                  
                
              })
            }
          }) 
      }
    });

    return f;
  }




 

}
