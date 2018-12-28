import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IRepair, defaultValue } from 'app/shared/model/repair.model';

export const ACTION_TYPES = {
    FETCH_REPAIRS: 'repair/FETCH_REPAIRS',
    FETCH_REPAIR: 'repair/FETCH_REPAIR',
    CREATE_REPAIR: 'repair/CREATE_REPAIR',
    UPDATE_REPAIR: 'repair/UPDATE_REPAIR',
    DELETE_REPAIR: 'repair/DELETE_REPAIR',
    RESET: 'repair/RESET'
};

const initialState = {
    loading: false,
    errorMessage: null,
    repairs: [] as ReadonlyArray<IRepair>,
    repair: defaultValue,
    updating: false,
    updateSuccess: false,
    totalItems: 0
};

export type RepairsState = Readonly<typeof initialState>;

export default (state: RepairsState = initialState, action): RepairsState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.FETCH_REPAIRS):
        case REQUEST(ACTION_TYPES.FETCH_REPAIR):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case REQUEST(ACTION_TYPES.CREATE_REPAIR):
        case REQUEST(ACTION_TYPES.UPDATE_REPAIR):
        case REQUEST(ACTION_TYPES.DELETE_REPAIR):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            };
        case FAILURE(ACTION_TYPES.FETCH_REPAIRS):
        case FAILURE(ACTION_TYPES.FETCH_REPAIR):
        case FAILURE(ACTION_TYPES.CREATE_REPAIR):
        case FAILURE(ACTION_TYPES.UPDATE_REPAIR):
        case FAILURE(ACTION_TYPES.DELETE_REPAIR):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.FETCH_REPAIRS):
            return {
                ...state,
                loading: false,
                repairs: action.payload.data,
                totalItems: action.payload.headers['x-total-count']
            };
        case SUCCESS(ACTION_TYPES.FETCH_REPAIR):
            return {
                ...state,
                loading: false,
                repair: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.CREATE_REPAIR):
        case SUCCESS(ACTION_TYPES.UPDATE_REPAIR):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                repair: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.DELETE_REPAIR):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                repair: defaultValue
            };
        case ACTION_TYPES.RESET:
            return {
                ...state,
                loading: false,
                errorMessage: null,
                repair: defaultValue,
                updating: false,
                updateSuccess: false
            };
        default:
            return state;
    }
};

const apiUrl = 'api/repair';

export const getRepairs: ICrudGetAllAction<IRepair> = vehicleId => {
    const requestUrl = `${apiUrl}/all/${vehicleId}`;
    return {
        type: ACTION_TYPES.FETCH_REPAIRS,
        payload: axios.get<IRepair>(requestUrl)
    };
};

export const getRepair: ICrudGetAction<IRepair> = id => {
    const requestUrl = `${apiUrl}/${id}`;
    return {
        type: ACTION_TYPES.FETCH_REPAIR,
        payload: axios.get<IRepair>(requestUrl)
    };
};

export const createRepair: ICrudPutAction<IRepair> = repair => async dispatch => {
    const requestUrl = `${apiUrl}/${repair.vehicleId}`;
    const result = await dispatch({
        type: ACTION_TYPES.CREATE_REPAIR,
        payload: axios.post(requestUrl, repair)
    });
    dispatch(getRepairs(repair.vehicleId));
    return result;
};

export const updateRepair: ICrudPutAction<IRepair> = repair => async dispatch => {
    const requestUrl = `${apiUrl}/${repair.id}`;
    const result = await dispatch({
        type: ACTION_TYPES.UPDATE_REPAIR,
        payload: axios.put(requestUrl, repair)
    });
    dispatch(getRepairs(repair.vehicleId));
    return result;
};

export const deleteRepair: ICrudDeleteAction<IRepair> = id => async dispatch => {
    const requestUrl = `${apiUrl}/${id}`;
    const repair = await dispatch({
        type: ACTION_TYPES.FETCH_REPAIR,
        payload: axios.get(requestUrl)
    });
    const vehicleId = repair.value.data.vehicleId;
    const result = await dispatch({
        type: ACTION_TYPES.DELETE_REPAIR,
        payload: axios.delete(requestUrl)
    });
    dispatch(getRepairs(vehicleId));
    return result;
};

export const reset = () => ({
    type: ACTION_TYPES.RESET
});
