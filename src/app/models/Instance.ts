
export interface instance{
    Items: instanceItem[]
}
export interface instanceItem{
    ServiceKind: string,
    ReplicaId: string,
    Address: any,
    ReplicaStatus: string,
    HealthState: string
};