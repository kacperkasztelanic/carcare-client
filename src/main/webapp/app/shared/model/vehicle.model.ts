export interface IVehicle {
    id?: any;
    make?: string;
    model?: string;
    licensePlate?: string;
    image?: any;
}

export const defaultValue: Readonly<IVehicle> = {
    id: null,
    make: null,
    model: null,
    licensePlate: null,
    image: null
};
