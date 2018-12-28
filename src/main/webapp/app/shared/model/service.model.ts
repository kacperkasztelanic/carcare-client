import { IVehicleEvent } from './vehicle-event.model.ts';

export interface IService {
    id?: any;
    vehicleEvent?: IVehicleEvent;
    nextByMileage?: number;
    nextByDate?: Date;
    costInCents?: number;
    station?: string;
    details?: string;
    vehicleId?: any;
}

export const defaultValue: Readonly<IService> = {};
