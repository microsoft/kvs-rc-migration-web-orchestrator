import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetMigrationListenerService } from './get-migration-listener.service';

@Injectable({
  providedIn: 'root'
})
export class PartitionsService {

  constructor(private http: HttpClient) { }

  serviceID: string;
  applicationID: string;

  partitionNumber: number;
  numberOfPartitions: number;
  partitions : string[][];
  modeOfMigration: string ;
  showAbort: boolean; // if any partition completes then make this false


 
}
