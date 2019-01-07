import { IVehicleDetails } from './vehicle-details.model';
import { IFuelType } from './fuel-type.model';

export interface IVehicle {
    id?: any;
    make?: string;
    model?: string;
    licensePlate?: string;
    fuelType?: IFuelType;
    vehicleDetails?: IVehicleDetails;
}

export const defaultValue: Readonly<IVehicle> = {};
