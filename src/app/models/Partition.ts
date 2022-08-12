

export interface Partition{
    Items: PartitionItem[]
};
export interface PartitionInformation{
    Id: string
};
export interface PartitionItem{
    PartitionInformation: PartitionInformation
};