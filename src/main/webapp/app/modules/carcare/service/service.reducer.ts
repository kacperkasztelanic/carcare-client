import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IService, defaultValue } from 'app/shared/model/service.model';

export const ACTION_TYPES = {
    FETCH_SERVICES: 'service/FETCH_SERVICES',
    FETCH_SERVICE: 'service/FETCH_SERVICE',
    CREATE_SERVICE: 'service/CREATE_SERVICE',
    UPDATE_SERVICE: 'service/UPDATE_SERVICE',
    DELETE_SERVICE: 'service/DELETE_SERVICE',
    RESET: 'service/RESET'
};

const initialState = {
    loading: false,
    errorMessage: null,
    services: [] as ReadonlyArray<IService>,
    service: defaultValue,
    updating: false,
    updateSuccess: false,
    totalItems: 0
};

export type ServicesState = Readonly<typeof initialState>;

export default (state: ServicesState = initialState, action): ServicesState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.FETCH_SERVICES):
        case REQUEST(ACTION_TYPES.FETCH_SERVICE):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case REQUEST(ACTION_TYPES.CREATE_SERVICE):
        case REQUEST(ACTION_TYPES.UPDATE_SERVICE):
        case REQUEST(ACTION_TYPES.DELETE_SERVICE):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            };
        case FAILURE(ACTION_TYPES.FETCH_SERVICES):
        case FAILURE(ACTION_TYPES.FETCH_SERVICE):
        case FAILURE(ACTION_TYPES.CREATE_SERVICE):
        case FAILURE(ACTION_TYPES.UPDATE_SERVICE):
        case FAILURE(ACTION_TYPES.DELETE_SERVICE):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.FETCH_SERVICES):
            return {
                ...state,
                loading: false,
                services: action.payload.data,
                totalItems: action.payload.headers['x-total-count']
            };
        case SUCCESS(ACTION_TYPES.FETCH_SERVICE):
            return {
                ...state,
                loading: false,
                service: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.CREATE_SERVICE):
        case SUCCESS(ACTION_TYPES.UPDATE_SERVICE):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                service: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.DELETE_SERVICE):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                service: defaultValue
            };
        case ACTION_TYPES.RESET:
            return {
                ...state,
                loading: false,
                errorMessage: null,
                service: defaultValue,
                updating: false,
                updateSuccess: false
            };
        default:
            return state;
    }
};

const apiUrl = 'api/routine-service';

export const getServices: ICrudGetAllAction<IService[]> = vehicleId => {
    const requestUrl = `${apiUrl}/all/${vehicleId}`;
    return {
        type: ACTION_TYPES.FETCH_SERVICES,
        payload: axios.get<IService[]>(requestUrl).then(response => ({
            ...response,
            data: response.data.map(prepareAfterReceive)
        }))
    };
};

export const getService: ICrudGetAction<IService> = id => {
    const requestUrl = `${apiUrl}/${id}`;
    return {
        type: ACTION_TYPES.FETCH_SERVICE,
        payload: axios.get<IService>(requestUrl).then(response => ({
            ...response,
            data: prepareAfterReceive(response.data)
        }))
    };
};

export const createService: ICrudPutAction<IService> = service => async dispatch => {
    const requestUrl = `${apiUrl}/${service.vehicleId}`;
    service = prepareToDispatch(service);
    const result = await dispatch({
        type: ACTION_TYPES.CREATE_SERVICE,
        payload: axios.post(requestUrl, service)
    });
    dispatch(getServices(service.vehicleId));
    return result;
};

export const updateService: ICrudPutAction<IService> = service => async dispatch => {
    const requestUrl = `${apiUrl}/${service.id}`;
    service = prepareToDispatch(service);
    const result = await dispatch({
        type: ACTION_TYPES.UPDATE_SERVICE,
        payload: axios.put(requestUrl, service)
    });
    dispatch(getServices(service.vehicleId));
    return result;
};

export const deleteService: ICrudDeleteAction<IService> = id => async dispatch => {
    const requestUrl = `${apiUrl}/${id}`;
    const service = await dispatch({
        type: ACTION_TYPES.FETCH_SERVICE,
        payload: axios.get(requestUrl)
    });
    const vehicleId = service.value.data.vehicleId;
    const result = await dispatch({
        type: ACTION_TYPES.DELETE_SERVICE,
        payload: axios.delete(requestUrl)
    });
    dispatch(getServices(vehicleId));
    return result;
};

export const reset = () => ({
    type: ACTION_TYPES.RESET
});

const prepareToDispatch = (service: IService): IService => ({
    ...service,
    costInCents: service.costInCents * 100,
    station: service.station.trim(),
    details: service.details.trim()
});

const prepareAfterReceive = (service: IService): IService => ({
    ...service,
    costInCents: service.costInCents / 100
});
