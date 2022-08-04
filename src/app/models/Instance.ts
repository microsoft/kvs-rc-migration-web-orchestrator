
export interface Instance{
    Items: InstanceItem[]
}
export interface InstanceItem{
    ServiceKind: string,
    ReplicaId: string,
    Address: any,
    ReplicaStatus: string,
    HealthState: string
};