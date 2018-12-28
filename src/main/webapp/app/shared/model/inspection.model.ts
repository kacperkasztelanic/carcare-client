import { IVehicleEvent } from './vehicle-event.model.ts';

export interface IInspection {
    id?: any;
    vehicleEvent?: IVehicleEvent;
    costInCents?: number;
    validThru?: Date;
    station?: string;
    details?: string;
    vehicleId?: any;
}

export const defaultValue: Readonly<IInspection> = {};
