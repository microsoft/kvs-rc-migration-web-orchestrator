import { MigrationProgressModel } from "./MigrationProgress"

export interface allMigrationEndpoints{
    app_id: string,
    app_name: string,
    app_type: string,
    service_details: service_details[]  
};

export interface service_details{
    service_id: string,
    service_name: string,
    partition_details: partition_details[]
    isSelected:  boolean
};

export interface partition_details{
    partition_id: string,
    migEndpoint: string,
    progress: string[],
    migration_details: MigrationProgressModel,
    selected: boolean
    showInvokeDowntime: boolean
};