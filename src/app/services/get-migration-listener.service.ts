import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIurls } from '../Common/APIurls';

@Injectable({
  providedIn: 'root'
})
export class GetMigrationListenerService {

  constructor(private http: HttpClient,
              private ApiUrls: APIurls) {}
              
   ngOnInit(){}


   getAllApplications(){
    return this.http.get<any>(this.ApiUrls.applicationsUrl);
   }

   getAllServices(ApplicationId: string){
    return this.http.get<any>(this.ApiUrls.getServicesUrl(ApplicationId));
   }

   getAllPartitions(ServiceId: string){
    return this.http.get<any>(this.ApiUrls.getPartitionUrl(ServiceId));
   }

   getAllInstances(PartitionId: string){
    return this.http.get<any>(this.ApiUrls.getInstanceUrl(PartitionId));
   }   
   FetchMigrationProgress(migrationEndpoint: string){
    return this.http.get<any>(this.ApiUrls.getMigrationUrl(migrationEndpoint));
   }
   abortMigration(migrationEndpoint: string){
    return this.http.put<any>(this.ApiUrls.getAbortMigrationUrl(migrationEndpoint), {});
   }
   startMigration(migrationEndpoint: string){
    return this.http.put<any>(this.ApiUrls.getStartMigraitonUrl(migrationEndpoint), {});
   }
   invokeDowntime(migrationEndpoint: string){
    return this.http.put<any>(this.ApiUrls.getStartDowntimeUrl(migrationEndpoint), {});
   }
}
