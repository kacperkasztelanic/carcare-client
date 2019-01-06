export interface ICostRequest {
    dateFrom?: Date;
    dateTo?: Date;
    vehicleIds?: any[];
}

export const defaultValue: Readonly<ICostRequest> = {};
