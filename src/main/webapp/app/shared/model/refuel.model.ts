import { IVehicleEvent, defaultValue as defaultEvent } from './vehicle-event.model.ts';

export interface IRefuel {
    id?: any;
    vehicleEvent?: IVehicleEvent;
    volume?: number;
    costInCents?: number;
    station?: string;
    vehicleId?: any;
}

export const defaultValue: Readonly<IRefuel> = {};
