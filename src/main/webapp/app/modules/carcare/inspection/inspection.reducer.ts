import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IInspection, defaultValue } from 'app/shared/model/inspection.model';

export const ACTION_TYPES = {
    FETCH_REFUELS: 'inspection/FETCH_REFUELS',
    FETCH_REFUEL: 'inspection/FETCH_REFUEL',
    CREATE_REFUEL: 'inspection/CREATE_REFUEL',
    UPDATE_REFUEL: 'inspection/UPDATE_REFUEL',
    DELETE_REFUEL: 'inspection/DELETE_REFUEL',
    RESET: 'inspection/RESET'
};

const initialState = {
    loading: false,
    errorMessage: null,
    inspections: [] as ReadonlyArray<IInspection>,
    inspection: defaultValue,
    updating: false,
    updateSuccess: false,
    totalItems: 0
};

export type InspectionsState = Readonly<typeof initialState>;

export default (state: InspectionsState = initialState, action): InspectionsState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.FETCH_REFUELS):
        case REQUEST(ACTION_TYPES.FETCH_REFUEL):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case REQUEST(ACTION_TYPES.CREATE_REFUEL):
        case REQUEST(ACTION_TYPES.UPDATE_REFUEL):
        case REQUEST(ACTION_TYPES.DELETE_REFUEL):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            };
        case FAILURE(ACTION_TYPES.FETCH_REFUELS):
        case FAILURE(ACTION_TYPES.FETCH_REFUEL):
        case FAILURE(ACTION_TYPES.CREATE_REFUEL):
        case FAILURE(ACTION_TYPES.UPDATE_REFUEL):
        case FAILURE(ACTION_TYPES.DELETE_REFUEL):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.FETCH_REFUELS):
            return {
                ...state,
                loading: false,
                inspections: action.payload.data,
                totalItems: action.payload.headers['x-total-count']
            };
        case SUCCESS(ACTION_TYPES.FETCH_REFUEL):
            return {
                ...state,
                loading: false,
                inspection: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.CREATE_REFUEL):
        case SUCCESS(ACTION_TYPES.UPDATE_REFUEL):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                inspection: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.DELETE_REFUEL):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                inspection: defaultValue
            };
        case ACTION_TYPES.RESET:
            return {
                ...state,
                loading: false,
                errorMessage: null,
                inspection: defaultValue,
                updating: false,
                updateSuccess: false
            };
        default:
            return state;
    }
};

const apiUrl = 'api/inspection';

export const getInspections: ICrudGetAllAction<IInspection> = vehicleId => {
    const requestUrl = `${apiUrl}/all/${vehicleId}`;
    return {
        type: ACTION_TYPES.FETCH_REFUELS,
        payload: axios.get<IInspection>(requestUrl)
    };
};

export const getInspection: ICrudGetAction<IInspection> = id => {
    const requestUrl = `${apiUrl}/${id}`;
    return {
        type: ACTION_TYPES.FETCH_REFUEL,
        payload: axios.get<IInspection>(requestUrl)
    };
};

export const createInspection: ICrudPutAction<IInspection> = inspection => async dispatch => {
    const requestUrl = `${apiUrl}/${inspection.vehicleId}`;
    const result = await dispatch({
        type: ACTION_TYPES.CREATE_REFUEL,
        payload: axios.post(requestUrl, inspection)
    });
    dispatch(getInspections(inspection.vehicleId));
    return result;
};

export const updateInspection: ICrudPutAction<IInspection> = inspection => async dispatch => {
    const requestUrl = `${apiUrl}/${inspection.id}`;
    const result = await dispatch({
        type: ACTION_TYPES.UPDATE_REFUEL,
        payload: axios.put(requestUrl, inspection)
    });
    dispatch(getInspections(inspection.vehicleId));
    return result;
};

export const deleteInspection: ICrudDeleteAction<IInspection> = id => async dispatch => {
    const requestUrl = `${apiUrl}/${id}`;
    const inspection = await dispatch({
        type: ACTION_TYPES.FETCH_REFUEL,
        payload: axios.get(requestUrl)
    });
    const vehicleId = inspection.value.data.vehicleId;
    const result = await dispatch({
        type: ACTION_TYPES.DELETE_REFUEL,
        payload: axios.delete(requestUrl)
    });
    dispatch(getInspections(vehicleId));
    return result;
};

export const reset = () => ({
    type: ACTION_TYPES.RESET
});
