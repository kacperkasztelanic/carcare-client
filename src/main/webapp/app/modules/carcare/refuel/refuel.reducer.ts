import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction, IPayload } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IRefuel, defaultValue } from 'app/shared/model/refuel.model';

export const ACTION_TYPES = {
    FETCH_REFUELS: 'refuel/FETCH_REFUELS',
    FETCH_REFUEL: 'refuel/FETCH_REFUEL',
    CREATE_REFUEL: 'refuel/CREATE_REFUEL',
    UPDATE_REFUEL: 'refuel/UPDATE_REFUEL',
    DELETE_REFUEL: 'refuel/DELETE_REFUEL',
    RESET: 'refuel/RESET'
};

const initialState = {
    loading: false,
    errorMessage: null,
    refuels: [] as ReadonlyArray<IRefuel>,
    refuel: defaultValue,
    updating: false,
    updateSuccess: false,
    totalItems: 0
};

export type RefuelsState = Readonly<typeof initialState>;

export default (state: RefuelsState = initialState, action): RefuelsState => {
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
                refuels: action.payload.data,
                totalItems: action.payload.headers['x-total-count']
            };
        case SUCCESS(ACTION_TYPES.FETCH_REFUEL):
            return {
                ...state,
                loading: false,
                refuel: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.CREATE_REFUEL):
        case SUCCESS(ACTION_TYPES.UPDATE_REFUEL):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                refuel: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.DELETE_REFUEL):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                refuel: defaultValue
            };
        case ACTION_TYPES.RESET:
            return {
                ...state,
                loading: false,
                errorMessage: null,
                refuel: defaultValue,
                updating: false,
                updateSuccess: false
            };
        default:
            return state;
    }
};

const apiUrl = 'api/refuel';

export const getRefuels: ICrudGetAllAction<IRefuel> = vehicleId => {
    const requestUrl = `${apiUrl}/all/${vehicleId}`;
    return {
        type: ACTION_TYPES.FETCH_REFUELS,
        payload: axios.get<IRefuel>(requestUrl)
    };
};

export const getRefuel: ICrudGetAction<IRefuel> = id => {
    const requestUrl = `${apiUrl}/${id}`;
    return {
        type: ACTION_TYPES.FETCH_REFUEL,
        payload: axios.get<IRefuel>(requestUrl)
    };
};

export const createRefuel: ICrudPutAction<IRefuel> = refuel => async dispatch => {
    const requestUrl = `${apiUrl}/${refuel.vehicleId}`;
    const result = await dispatch({
        type: ACTION_TYPES.CREATE_REFUEL,
        payload: axios.post(requestUrl, refuel)
    });
    dispatch(getRefuels(refuel.vehicleId));
    return result;
};

export const updateRefuel: ICrudPutAction<IRefuel> = refuel => async dispatch => {
    const requestUrl = `${apiUrl}/${refuel.id}`;
    const result = await dispatch({
        type: ACTION_TYPES.UPDATE_REFUEL,
        payload: axios.put(requestUrl, refuel)
    });
    dispatch(getRefuels(refuel.vehicleId));
    return result;
};

export const deleteRefuel: ICrudDeleteAction<IRefuel> = id => async dispatch => {
    const requestUrl = `${apiUrl}/${id}`;
    const refuel = await dispatch({
        type: ACTION_TYPES.FETCH_REFUEL,
        payload: axios.get(requestUrl)
    });
    const vehicleId = refuel.value.data.vehicleId;
    const result = await dispatch({
        type: ACTION_TYPES.DELETE_REFUEL,
        payload: axios.delete(requestUrl)
    });
    dispatch(getRefuels(vehicleId));
    return result;
};

export const reset = () => ({
    type: ACTION_TYPES.RESET
});
