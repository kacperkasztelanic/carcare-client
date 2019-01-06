import { IPeriodVehicle } from './period-vehicle.model';

export interface ICostResult {
    periodVehicle?: IPeriodVehicle;
    insuranceCosts?: number;
    inspectionCosts?: number;
    repairCosts?: number;
    routineServiceCosts?: number;
    refuelCosts?: number;
}

export const defaultValue: Readonly<ICostResult> = {};
