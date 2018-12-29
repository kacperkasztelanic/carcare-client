export interface IVehicleDetails {
    modelSuffix?: string;
    vinNumber?: string;
    vehicleCard?: string;
    registrationCertificate?: string;
    yearOfManufacture?: number;
    engineVolume?: number;
    enginePower?: number;
    weight?: number;
    notes?: string;
    vehicleId?: any;
}

export const defaultValue: Readonly<IVehicleDetails> = {};
