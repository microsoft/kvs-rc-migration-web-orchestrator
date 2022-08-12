import { Component, INJECTOR, Input } from '@angular/core';
import { Constants } from 'src/app/Common/Constants';
import { Partition } from 'src/app/models/Partition';
import { instance } from 'src/app/models/Instance';
import { allMigrationEndpoints, partition_details, service_details } from 'src/app/models/allMigrationEndpoints';
import { MigrationProgressModel } from 'src/app/models/MigrationProgress';
import { GetMigrationListenerService } from 'src/app/services/get-migration-listener.service';
import { SelectedServicesService } from 'src/app/services/selected-services.service';

@Component({
  selector: 'app-progress-card',
  templateUrl: './progress-card.component.html',
  styleUrls: ['./progress-card.component.scss', './vertical-progress.scss']
})
export class ProgressCardComponent  {

  @Input() partition: partition_details;
  @Input() service: service_details; 
  @Input() app: allMigrationEndpoints;

  showOverallProgress: boolean =  true;
  showCopyProgress: boolean = false;
  showCatchupProgress: boolean = false;
  showDowntimeProgress: boolean = false;
  showStart: boolean = false;
  showPartitions: boolean = false;

  migrationEndpoint: string = '';
  migrationProgressDetails: MigrationProgressModel;
  partition_curr_progress: string[] = [];
  cnt_phase: number = 0;
  showAbort: boolean = false;

  ngOnInit(){
    
    setInterval(() => {
      
      this.getAllInstances(this.partition.partition_id);
    }, 2000);
  }




  constructor(private selectedServices: SelectedServicesService,
              private migrationListenerService: GetMigrationListenerService
              
              ) { 
                this.showOverallProgress  =  true;
                this.showCopyProgress = false;
                this.showCatchupProgress = false;
                this.showDowntimeProgress = false;
                this.showStart = false;
                this.showPartitions = false;

                this.migrationEndpoint = '';
                this.partition_curr_progress = [];
                this.cnt_phase = 0;
                this.showAbort = false;
              }


  modeOfMigration(app_id: string, service_id: string, partition_id: string){
    var f: boolean = true;
    this.selectedServices.AllMigEndpoints.find((app, app_ind) => {
      
      if(app_id === app.app_id){ 
          this.selectedServices.AllMigEndpoints[app_ind].service_details.find((service, service_ind) =>{
          if(service_id === service.service_id){
            this.selectedServices.AllMigEndpoints[app_ind].service_details[service_ind].partition_details.find((partition, partition_ind) => {
              if(partition_id === partition.partition_id){
                if(typeof(partition.migration_details.migrationMode) === 'undefined' || partition.migration_details.migrationMode === 0){
                  f = false;
                }
                if(partition.migration_details.migrationMode === 0){
                  this.selectedServices.AllMigEndpoints[app_ind].service_details[service_ind].partition_details[partition_ind].selected = true;
                }
              }
            })
          }
        })
      }
    })

    return f;
  }

  ShowAbort(app_id: string, service_id: string, partition_id: string){
    var f: boolean = true;
    this.selectedServices.AllMigEndpoints.find((app, app_ind) => {
      
      if(app_id === app.app_id){ 
          this.selectedServices.AllMigEndpoints[app_ind].service_details.find((service, service_ind) =>{
          if(service_id === service.service_id){
            this.selectedServices.AllMigEndpoints[app_ind].service_details[service_ind].partition_details.find((partition, partition_ind) => {
              if(partition_id === partition.partition_id){
                if(partition.progress[3] === 'completed'){
                  f = false;
                }
              }
            })
          }
        })
      }
    })
    return f;
  }

  ShowStart(app_id: string, service_id: string, partition_id: string){
    var f: boolean = false;
    this.selectedServices.AllMigEndpoints.find((app, app_ind) => {
      
      if(app_id === app.app_id){ 
          this.selectedServices.AllMigEndpoints[app_ind].service_details.find((service, service_ind) =>{
          if(service_id === service.service_id){
            this.selectedServices.AllMigEndpoints[app_ind].service_details[service_ind].partition_details.find((partition, partition_ind) => {
              if(partition_id === partition.partition_id){
                if(partition.progress[0] === 'idle'){
                  f = true;
                }
              }
            })
          }
        })
      }
    })
    return f;
  }
  StartMigration(migrationEndpoint:string){
    this.migrationListenerService.startMigration(migrationEndpoint).subscribe();
    this.fetchMigrationProgress(migrationEndpoint);
  }
  // collect the migration listener endpoint from the getInstance response
  getAllInstances(PartitionId: string){
    this.migrationListenerService.getAllInstances(PartitionId).subscribe(
      resp=> {
        var instance: instance;
        instance = resp;
        var curr_progress = [];
        var progress : any = [];
        for(var item in instance.Items){
          //this.listInstances[this.instance.Items[item].ReplicaId] = PartitionId;
          this.migrationEndpoint = '';
          if(instance.Items[item].Address.length > 0){

            this.migrationEndpoint = this.getMigrationListener(instance.Items[item].Address);  

          }
          
          if ( typeof(this.migrationEndpoint) !== 'undefined'){
            this.migrationEndpoint = this.migrationEndpoint;
            this.cnt_phase = this.fetchMigrationProgress(this.migrationEndpoint);
          }else{
            this.migrationEndpoint='';
          }
          // update the global variable to store the partitions of the given service
          this.updateGlobalPartitions(this.service.service_id, PartitionId, this.migrationEndpoint, this.partition_curr_progress, this.migrationProgressDetails, this.cnt_phase);

        }

      }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    )              
  }
  updateGlobalPartitions(ServiceId: string, partitionId: string, MigrationListener: string, curr_progress: string[], migration_details: MigrationProgressModel, cnt_phase: number){

    this.selectedServices.AllMigEndpoints.find((obj, i) => {
      if(obj.app_id === this.selectedServices.mapServices[ServiceId]){
        this.selectedServices.AllMigEndpoints[i].service_details.find((obj1, i1) => {
          if(obj1.service_id === ServiceId){
            if(!(this.selectedServices.AllMigEndpoints[i].service_details[i1].partition_details.some(obj2 => obj2.partition_id === partitionId))){
              
              this.selectedServices.AllMigEndpoints[i].service_details[i1].partition_details.push({
                partition_id: partitionId,
                migEndpoint: MigrationListener,
                selected: false,
                progress: curr_progress,
                migration_details: migration_details,
                showInvokeDowntime: cnt_phase > 4 && migration_details.currentPhase>=1 && migration_details.currentPhase <=3? true: false
              });
            }else{
              this.selectedServices.AllMigEndpoints[i].service_details[i1].partition_details.find((obj2, i2)=> {
                if(obj2.partition_id === partitionId){
                  this.selectedServices.AllMigEndpoints[i].service_details[i1].partition_details[i2].progress = curr_progress;
                  if(MigrationListener!=='' && MigrationListener!=='undefined') {
                    this.selectedServices.AllMigEndpoints[i].service_details[i1].partition_details[i2].migEndpoint = MigrationListener;
                  }
                  this.selectedServices.AllMigEndpoints[i].service_details[i1].partition_details[i2].migration_details = migration_details;
                  this.selectedServices.AllMigEndpoints[i].service_details[i1].partition_details[i2].showInvokeDowntime = cnt_phase > 4 && migration_details.currentPhase>=1 && migration_details.currentPhase <=3? true: false

                }
              })
            } 
          }
        })
      }
    })
    
  }

  getMigrationListener(Endpoints: string){
    var endpoints = JSON.parse(Endpoints);
    return (endpoints["Endpoints"]["Migration Listener"]);
  }


  fetchMigrationProgress(migrationEndpoint: string): any{
    var migrationProgress: MigrationProgressModel;
    var curr_progress:string[] = [];
    if(migrationEndpoint !== '') {
      
    this.migrationListenerService.FetchMigrationProgress(migrationEndpoint).subscribe(
      resp => {

        
        this.migrationEndpoint = migrationEndpoint;
        migrationProgress = resp;
        this.migrationProgressDetails = migrationProgress;
        this.partition_curr_progress = [];
        var progress = ['idle', 'idle', 'idle', 'idle'];

        this.cnt_phase = 0;
          for(var item in migrationProgress.phaseResults){
            this.cnt_phase ++;
              var phase = migrationProgress.phaseResults[item].phase;
              var status = migrationProgress.phaseResults[item].status;
              if (phase !== 4)progress[phase-1] = Constants.STATUS[status];
          }
          progress[migrationProgress.currentPhase==5? 3:migrationProgress.currentPhase  - 1] = Constants.STATUS[migrationProgress.status];


          if(progress[3] == Constants.STATUS[2]){
            this.showAbort = false;
          }
          
          this.partition_curr_progress = progress;

      }
    )
    }
    return this.cnt_phase;
  }
  InvokeDowntime(migrationEndpoint: string){
    this.migrationListenerService.invokeDowntime(migrationEndpoint).subscribe();
    this.fetchMigrationProgress(migrationEndpoint);
  }
  AbortMigration(migrationEndpoint: string){
    this.migrationListenerService.abortMigration(migrationEndpoint).subscribe();
    this.fetchMigrationProgress(migrationEndpoint);
  }

}
