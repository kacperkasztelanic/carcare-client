import { IPeriodVehicle } from './period-vehicle.model';

export interface IMileageResult {
    periodVehicle?: IPeriodVehicle;
    mileageByDate?: Map<string, number>;
}

export const defaultValue: Readonly<IMileageResult> = {};
