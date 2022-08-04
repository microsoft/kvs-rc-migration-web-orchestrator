export interface MigrationProgressModel{
    migrationMode: Number,
    startDateTimeUTC: Date,
    endDateTimeUTC: Date | null,
    status: number,
    currentPhase: number,
    startSeqNum: number,
    endSeqNum: number,
    lastAppliedSeqNum: number,
    noOfKeysMigrated: number,
    phaseResults: PhaseResults[]
}

export interface PhaseResults{
    startDateTimeUTC: Date,
    endDateTimeUTC: Date | null,
    startSeqNum: number,
    endSeqNum: number,
    lastAppliedSeqNum: number,
    status: number,
    workerCount: number,
    noOfKeysMigrated: number,
    phase: number
}
