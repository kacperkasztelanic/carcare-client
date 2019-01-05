import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IVehicle } from 'app/shared/model/vehicle.model';
import { IPeriodVehicle } from 'app/shared/model/period-vehicle.model';
import { IAverageConumptionResult } from 'app/shared/model/average-consumption-result.model';

export const ACTION_TYPES = {
    CALCULATE_CONSUMPTION: 'statistics/CALCULATE_CONSUMPTION',
    RESET: 'statistics/RESET'
};

const initialState = {
    loading: false,
    errorMessage: null,
    consumptionResults: [] as ReadonlyArray<IAverageConumptionResult>
};

export type StatisticsState = Readonly<typeof initialState>;

export default (state: StatisticsState = initialState, action): StatisticsState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.CALCULATE_CONSUMPTION):
            return {
                ...state,
                errorMessage: null,
                loading: true
            };
        case FAILURE(ACTION_TYPES.CALCULATE_CONSUMPTION):
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.CALCULATE_CONSUMPTION):
            return {
                ...state,
                loading: false,
                consumptionResults: action.payload.data
            };
        case ACTION_TYPES.RESET:
            return initialState;
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

export const reset = () => ({
    type: ACTION_TYPES.RESET
});
