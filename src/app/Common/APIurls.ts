import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class APIurls{

    constructor(){
        
    }
    public  baseurl = "http://localhost:4200/";
    public  applicationsUrl = this.baseurl + "api/Applications?api-version=6.1";
    
    private  partitionUrl_base = this.baseurl + "api/Services/";
    private  partitionUrl_rt = "/$/GetPartitions?api-version=6.4";

    private instanceUrl_base = this.baseurl + "api/Partitions/";
    private instanceUrl_rt = "/$/GetReplicas?api-version=6.0";

    private serviceUrl_base = this.baseurl + "api/Applications/";
    private serviceUrl_rt = "/$/GetServices?api-version=6.0";

    private migrationProgressUrl_rt = "/RcMigration/GetMigrationStatus";

    private abortMigration_rt = "/RcMigration/AbortMigration";

    private startMigration_rt = "/RcMigration/StartMigration";

    private invokeDowntime_rt = "/RcMigration/StartDowntime";





    getPartitionUrl(ServiceId : string){
        return this.partitionUrl_base + ServiceId + this.partitionUrl_rt;
    }

    getInstanceUrl(PartitionId : string){
        return this.instanceUrl_base + PartitionId + this.instanceUrl_rt;
    }

    getServicesUrl(ApplicationId : string){
        return this.serviceUrl_base + ApplicationId + this.serviceUrl_rt;
    }

    getApplicationUrl(){
        return this.applicationsUrl;
    }

    getMigrationUrl(MigrationEndpoint: string){
        return MigrationEndpoint + this.migrationProgressUrl_rt;
    }
    getAbortMigrationUrl(MigrationEndpoint: string){
        return MigrationEndpoint + this.abortMigration_rt;
    }

    getStartMigraitonUrl(MigrationEndpoint: string){
        return MigrationEndpoint + this.startMigration_rt;
    }

    getStartDowntimeUrl(MigrationEndpoint: string){
        return MigrationEndpoint + this.invokeDowntime_rt;        
    }

}