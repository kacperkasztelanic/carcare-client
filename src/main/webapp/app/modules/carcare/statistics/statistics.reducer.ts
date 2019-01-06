import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IVehicle } from 'app/shared/model/vehicle.model';
import { IPeriodVehicle } from 'app/shared/model/period-vehicle.model';
import { IAverageConumptionResult } from 'app/shared/model/average-consumption-result.model';
import { IMileageResult } from 'app/shared/model/mileage-result.model';
import { ICostRequest } from 'app/shared/model/cost-request.model';
import { ICostResult, defaultValue as defaultCostResult } from 'app/shared/model/cost-result.model';

export const ACTION_TYPES = {
    CALCULATE_CONSUMPTION: 'statistics/CALCULATE_CONSUMPTION',
    CALCULATE_COSTS: 'statistics/CALCULATE_COSTS',
    CALCULATE_MILEAGE: 'statistics/CALCULATE_MILEAGE',
    RESET: 'statistics/RESET'
};

const initialState = {
    loading: false,
    calculated: false,
    errorMessage: null,
    consumptionResults: [],
    costsResults: [],
    mileageResults: [],
    minMileage: 0
};

export type StatisticsState = Readonly<typeof initialState>;

export default (state: StatisticsState = initialState, action): StatisticsState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.CALCULATE_CONSUMPTION):
        case REQUEST(ACTION_TYPES.CALCULATE_COSTS):
        case REQUEST(ACTION_TYPES.CALCULATE_MILEAGE):
            return {
                ...state,
                errorMessage: null,
                loading: true
            };
        case FAILURE(ACTION_TYPES.CALCULATE_CONSUMPTION):
        case FAILURE(ACTION_TYPES.CALCULATE_COSTS):
        case FAILURE(ACTION_TYPES.CALCULATE_MILEAGE):
            return {
                ...state,
                loading: false,
                calculated: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.CALCULATE_CONSUMPTION):
            return {
                ...state,
                loading: false,
                calculated: true,
                consumptionResults: prepareConsumptionData(action.payload.data)
            };
        case SUCCESS(ACTION_TYPES.CALCULATE_COSTS):
            return {
                ...state,
                loading: false,
                calculated: true,
                costsResults: prepareCostData(action.payload.data)
            };
        case SUCCESS(ACTION_TYPES.CALCULATE_MILEAGE):
            return {
                ...state,
                loading: false,
                calculated: true,
                mileageResults: prepareMileageData(action.payload.data),
                minMileage: prepareMinMileage(action.payload.data)
            };
        case ACTION_TYPES.RESET:
            return {
                ...initialState
            };
        default:
            return state;
    }
};

const apiUrl = '/api/stats';

export const calculateConsumption = (vehicle: IVehicle, from: Date, to: Date) => {
    const requestUrl = `${apiUrl}/consumption/per-refuel`;
    const body: IPeriodVehicle = {
        vehicleId: vehicle.id,
        dateFrom: from,
        dateTo: to
    };
    return {
        type: ACTION_TYPES.CALCULATE_CONSUMPTION,
        payload: axios
            .post(requestUrl, body, {})
    };
};

export const calculateCosts = (vehicle: IVehicle, from: Date, to: Date) => {
    const requestUrl = `${apiUrl}/cost`;
    const body: ICostRequest = {
        vehicleIds: [vehicle.id],
        dateFrom: from,
        dateTo: to
    };
    return {
        type: ACTION_TYPES.CALCULATE_COSTS,
        payload: axios
            .post(requestUrl, body, {})
    };
};

export const calculateMileage = (vehicle: IVehicle, from: Date, to: Date) => {
    const requestUrl = `${apiUrl}/mileage`;
    const body: IPeriodVehicle = {
        vehicleId: vehicle.id,
        dateFrom: from,
        dateTo: to
    };
    return {
        type: ACTION_TYPES.CALCULATE_MILEAGE,
        payload: axios
            .post(requestUrl, body, {})
    };
};

export const reset = () => ({
    type: ACTION_TYPES.RESET
});

const prepareConsumptionData = (data: IAverageConumptionResult[]) =>
    data.map((x: IAverageConumptionResult) => ({ name: x.periodVehicle.dateTo, consumption: x.averageConsumption }));

const prepareCostData = (data: ICostResult[]) =>
    data.map((x: ICostResult) => ({
        name: '',
        inspections: x.inspectionCosts,
        insurances: x.insuranceCosts,
        repairs: x.repairCosts,
        refuels: x.refuelCosts,
        services: x.routineServiceCosts
    }));

const prepareMileageData = (data: IMileageResult) => {
    const result = [];
    for (const [key, value] of Object.entries(data.mileageByDate)) {
        result.push({
            name: key,
            mileage: value
        });
    }
    return result;
};

const prepareMinMileage = (data: IMileageResult) => {
    const result = prepareMileageData(data);
    if (result.length === 0) {
        return 0;
    }
    return result.reduce((min, p) => p.mileage < min ? p.mileage : min, result[0].mileage);
};
