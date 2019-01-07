import { IVehicleEvent } from './vehicle-event.model.ts';
import { IInsuranceType } from './insurance-type.model';

export interface IInsurance {
    id?: any;
    vehicleEvent?: IVehicleEvent;
    validFrom?: Date;
    validThru?: Date;
    costInCents?: number;
    number?: string;
    insurer?: string;
    details?: string;
    insuranceType?: IInsuranceType;
    vehicleId?: any;
}

export const defaultValue: Readonly<IInsurance> = {};
