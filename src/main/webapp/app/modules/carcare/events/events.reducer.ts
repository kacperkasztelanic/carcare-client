import axios from 'axios';
import { IForthcomingEvent } from 'app/shared/model/forthcoming-event-model';
import { IPeriodVehicle } from 'app/shared/model/period-vehicle.model';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

export const ACTION_TYPES = {
    FETCH_EVENTS: 'events/FETCH_EVENTS',
    RESET: 'events/RESET'
};

const initialState = {
    loading: false,
    fetched: false,
    errorMessage: null,
    events: [] as ReadonlyArray<IForthcomingEvent>,
    totalItems: 0
};

export type EventsState = Readonly<typeof initialState>;

export default (state: EventsState = initialState, action): EventsState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.FETCH_EVENTS):
            return {
                ...state,
                errorMessage: null,
                loading: true
            };
        case FAILURE(ACTION_TYPES.FETCH_EVENTS):
            return {
                ...state,
                loading: false,
                fetched: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.FETCH_EVENTS):
            return {
                ...state,
                loading: false,
                fetched: action.payload.data,
                events: action.payload.data,
                totalItems: action.payload.headers['x-total-count']
            };
        case ACTION_TYPES.RESET:
            return {
                ...initialState
            };
        default:
            return state;
    }
};

const apiUrl = '/api/events';

export const fetchEvents = (ids: any[], from: Date, to: Date) => {
    const body: IPeriodVehicle[] = ids.map(id => ({
        vehicleId: id,
        dateFrom: from,
        dateTo: to
    }));
    return {
        type: ACTION_TYPES.FETCH_EVENTS,
        payload: axios
            .post(apiUrl, body, {})
    };
};

export const reset = () => ({
    type: ACTION_TYPES.RESET
});
