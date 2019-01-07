import axios from 'axios';
import { IForthcomingEvent } from 'app/shared/model/forthcoming-event-model';
import { IPeriodVehicle } from 'app/shared/model/period-vehicle.model';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

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
                fetched: true,
                events: action.payload.data.map((x: IForthcomingEvent) => prepareEvent(x)),
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

const prepareEvent = (e: IForthcomingEvent): IForthcomingEvent => ({
    ...e,
    eventTypeIcon: getEventTypeIcon(e.eventType),
    eventTypeTranslationString: mapEventTypeToTranslation(e.eventType)
});

const getEventTypeIcon = (type: string): IconProp => {
    switch (type.toUpperCase()) {
        case 'SERVICE':
            return 'oil-can';
        case 'INSPECTION':
            return 'check-double';
        case 'INSURANCE':
            return 'file-invoice-dollar';
        default:
            return 'question';
    }
};

const mapEventTypeToTranslation = (type: string): string => {
    switch (type.toUpperCase()) {
        case 'SERVICE':
            return 'carcare.service.entity';
        case 'INSPECTION':
            return 'carcare.inspection.entity';
        case 'INSURANCE':
            return 'carcare.insurance.entity';
        default:
            return 'carcare.common.other';
    }
};
