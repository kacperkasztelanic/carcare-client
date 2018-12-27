export interface IVehicleEvent {
    date?: Date;
    mileage?: number;
}

export const defaultValue: Readonly<IVehicleEvent> = {
    date: new Date(),
    mileage: 0
};
