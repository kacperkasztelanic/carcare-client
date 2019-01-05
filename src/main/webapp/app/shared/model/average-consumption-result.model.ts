import { IPeriodVehicle } from './period-vehicle.model';

export interface IAverageConumptionResult {
    volume?: number;
    mileage?: number;
    averageConsumption?: number;
    periodVehicle?: IPeriodVehicle;
}

export const defaultValue: Readonly<IAverageConumptionResult> = {};
