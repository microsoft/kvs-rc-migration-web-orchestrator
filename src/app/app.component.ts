import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { RefreshService } from './services/refresh.service';
import { ActivatedRoute, Route, Router, NavigationEnd} from '@angular/router';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { environment } from 'src/environments/environment';
import { GetMigrationListenerService } from './services/get-migration-listener.service';
import { SelectedServicesService } from './services/selected-services.service';
import { ServiceItem } from './models/Service';
import {filter} from 'rxjs/operators';
import { allMigrationEndpoints } from './models/allMigrationEndpoints';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('main') main: ElementRef;

  
  title = 'KVS-RC-Actor-state-migration-viewer';

  selectedServices: string[] = [];
  selectedServiceObjects = new Set<string>([]);
  selectedServiceName: ServiceItem[] = [];
  listServices: {} = {};

  smallScreenSize = false;
  smallScreenLeftPanelWidth = '0px';
  showLeftPane = false;

  //public assetBase = environment.assetBase;
  treeWidth = '275px';
  // preserve the existing size for using
  previousTreeWidth = this.treeWidth;
  refreshRate: number = 2000;
  rightOffset: string = this.treeWidth;
  tabIndex = -1;
  hideAzure = false;
  hideSFXTest = false;
  hideSFXLogo = false;
  showServices: boolean = true;
  //showService = [false, false];


  allMigrationEndpoints: allMigrationEndpoints[];

  ngOnInit(): void {
    this.refreshService.init();
    this.allMigrationEndpoints = this.SelectedServices.AllMigEndpoints;
    this.refreshRate = Number(this.refreshService.refreshRate)*1000;
    setInterval(() => {
      this.updateSelectedServices();
      this.refreshRate = Number(this.refreshService.refreshRate)*1000;
      
    }, this.refreshRate);  

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe((event : NavigationEnd)=> {
          
          if(event.url === '/services'){
            this.showLeftPane = false;
          }else{
            this.showLeftPane = true;
          }
      });
    
  }
  @HostListener('window:resize', ['$event.target'])
  onResize(event: Window) {
    this.checkWidth(event.innerWidth);
  }

  updateSelectedServices(){
    
  }

  checkWidth(width: number) {
    //const widthReduction = this.dataService.clusterUpgradeProgress.isInitialized && this.dataService.clusterUpgradeProgress.isUpgrading ? 300 : 0;
    const widthReduction = 0;
    this.smallScreenSize = width < 720;

    this.hideAzure = width < (980 + widthReduction);
    this.hideSFXTest = width < (787 + widthReduction);
    this.hideSFXLogo = width < (600 + widthReduction);
  }

  constructor(public refreshService: RefreshService,
              public liveAnnouncer: LiveAnnouncer,
              public getmigrationListener: GetMigrationListenerService,
              public SelectedServices: SelectedServicesService,
              public router: Router
  ){}
  

  attemptForceRefresh() {
    this.refreshService.refreshAll();
    this.liveAnnouncer.announce('Started refreshing data');
    setTimeout( () => {
      this.liveAnnouncer.announce('Data has been refreshed.');
    }, 2000);
  }
  collapseSide()  {
    if (this.treeWidth === '8px') {
      this.resize(+this.previousTreeWidth.split('px')[0]);
    }else{
      this.resize(0);
    }
  }
  changeSmallScreenSizePanelState() {
    this.smallScreenLeftPanelWidth = this.smallScreenLeftPanelWidth === '0px' ? '60%' : '0px';
  }
  resize($event: any): void {
     if (this.smallScreenSize) {
       this.smallScreenLeftPanelWidth = `${$event}px`;
       return;
     }
    this.previousTreeWidth = this.treeWidth;
     // have to subtract the offset
     const offsetWidth = $event + 8;
     this.treeWidth = offsetWidth.toString() + 'px';
     this.rightOffset = this.treeWidth;
    // this.storageService.setValue('treeWidth', this.treeWidth);
  }
  showAllServices(){
    //this.showServices = !this.showServices;
    this.updateSelectedServices();
  }
  
  isCheckedService(app_id: string, service_id: string){

    var checked: boolean = false;
    let app1 = this.SelectedServices.AllMigEndpoints.find((app, index1) => {
      if (app.app_id === app_id) {
          let service1 = this.SelectedServices.AllMigEndpoints[index1].service_details.find((service, index2) => {
            if(service.service_id === service_id){
              
                
                  checked = this.SelectedServices.AllMigEndpoints[index1].service_details[index2].isSelected;
              
            }
          }) 
          
      }
  });

  return checked;
  }
  isCheckedPartition(app_id: string, service_id: string, partition_id: string){
    var checked: boolean = false;
    let app1 = this.SelectedServices.AllMigEndpoints.find((app, index1) => {
      if (app.app_id === app_id) {
          let service1 = this.SelectedServices.AllMigEndpoints[index1].service_details.find((service, index2) => {
            if(service.service_id === service_id){
              let partition1 = this.SelectedServices.AllMigEndpoints[index1].service_details[index2].partition_details.find((partition, index3)=>{
                if(partition.partition_id === partition_id){
                  checked= this.SelectedServices.AllMigEndpoints[index1].service_details[index2].partition_details[index3].selected;

                }
              })
            }
          }) 
      }
  });

  return checked;

  }


}