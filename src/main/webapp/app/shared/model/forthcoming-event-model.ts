export interface IForthcomingEvent {
    vehicleId?: any;
    eventType?: string;
    details?: string;
    dateThru?: Date;
    mileageThru?: number;
}

export const defaultValue: Readonly<IForthcomingEvent> = {};
