import { IVehicleDetails } from './vehicle-details.model';

export interface IVehicle {
    id?: any;
    make?: string;
    model?: string;
    licensePlate?: string;
    fuelType?: string;
    vehicleDetails?: IVehicleDetails;
}

export const defaultValue: Readonly<IVehicle> = {};
