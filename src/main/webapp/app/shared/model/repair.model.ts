import { IVehicleEvent } from './vehicle-event.model.ts';

export interface IRepair {
    id?: any;
    vehicleEvent?: IVehicleEvent;
    costInCents?: number;
    station?: string;
    details?: string;
    vehicleId?: any;
}

export const defaultValue: Readonly<IRepair> = {};
