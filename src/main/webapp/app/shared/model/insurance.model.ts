import { IVehicleEvent } from './vehicle-event.model.ts';

export interface IInsurance {
    id?: any;
    vehicleEvent?: IVehicleEvent;
    validFrom?: Date;
    validThru?: Date;
    costInCents?: number;
    number?: string;
    insurer?: string;
    details?: string;
    insuranceType?: string;
    vehicleId?: any;
}

export const defaultValue: Readonly<IInsurance> = {};
