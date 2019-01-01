import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IVehicle, defaultValue } from 'app/shared/model/vehicle.model';

export const ACTION_TYPES = {
    FETCH_VEHICLES: 'vehicle/FETCH_VEHICLES',
    FETCH_VEHICLE: 'vehicle/FETCH_VEHICLE',
    CREATE_VEHICLE: 'vehicle/CREATE_VEHICLE',
    UPDATE_VEHICLE: 'vehicle/UPDATE_VEHICLE',
    DELETE_VEHICLE: 'vehicle/DELETE_VEHICLE',
    RESET: 'vehicle/RESET',
    FETCH_FUELTYPES: 'vehicle/FETCH_FUELTYPES'
};

const initialState = {
    loading: false,
    errorMessage: null,
    vehicles: [] as ReadonlyArray<IVehicle>,
    vehicle: defaultValue,
    updating: false,
    updateSuccess: false,
    totalItems: 0,
    fuelTypes: [] as ReadonlyArray<string>
};

export type VehiclesState = Readonly<typeof initialState>;

export default (state: VehiclesState = initialState, action): VehiclesState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.FETCH_VEHICLES):
        case REQUEST(ACTION_TYPES.FETCH_VEHICLE):
        case REQUEST(ACTION_TYPES.FETCH_FUELTYPES):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case REQUEST(ACTION_TYPES.CREATE_VEHICLE):
        case REQUEST(ACTION_TYPES.UPDATE_VEHICLE):
        case REQUEST(ACTION_TYPES.DELETE_VEHICLE):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            };
        case FAILURE(ACTION_TYPES.FETCH_VEHICLES):
        case FAILURE(ACTION_TYPES.FETCH_VEHICLE):
        case FAILURE(ACTION_TYPES.CREATE_VEHICLE):
        case FAILURE(ACTION_TYPES.UPDATE_VEHICLE):
        case FAILURE(ACTION_TYPES.DELETE_VEHICLE):
        case FAILURE(ACTION_TYPES.FETCH_FUELTYPES):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.FETCH_VEHICLES):
            return {
                ...state,
                loading: false,
                vehicles: action.payload.data,
                totalItems: action.payload.headers['x-total-count']
            };
        case SUCCESS(ACTION_TYPES.FETCH_VEHICLE):
            return {
                ...state,
                loading: false,
                vehicle: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.CREATE_VEHICLE):
        case SUCCESS(ACTION_TYPES.UPDATE_VEHICLE):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                vehicle: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.DELETE_VEHICLE):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                vehicle: defaultValue
            };
        case SUCCESS(ACTION_TYPES.FETCH_FUELTYPES):
            return {
                ...state,
                loading: false,
                fuelTypes: action.payload.data
            };
        case ACTION_TYPES.RESET:
            return {
                ...state,
                loading: false,
                errorMessage: null,
                vehicle: defaultValue,
                updating: false,
                updateSuccess: false,
                fuelTypes: []
            };
        default:
            return state;
    }
};

const apiUrl = 'api/vehicle';

export const getVehicles: ICrudGetAllAction<IVehicle> = () => {
    const requestUrl = `${apiUrl}/all`;
    return {
        type: ACTION_TYPES.FETCH_VEHICLES,
        payload: axios.get<IVehicle>(requestUrl)
    };
};

export const getVehicle: ICrudGetAction<IVehicle> = id => {
    const requestUrl = `${apiUrl}/${id}`;
    return {
        type: ACTION_TYPES.FETCH_VEHICLE,
        payload: axios.get<IVehicle>(requestUrl)
    };
};

export const createVehicle: ICrudPutAction<IVehicle> = vehicle => async dispatch => {
    const result = await dispatch({
        type: ACTION_TYPES.CREATE_VEHICLE,
        payload: axios.post(apiUrl, vehicle)
    });
    dispatch(getVehicles());
    return result;
};

export const updateVehicle: ICrudPutAction<IVehicle> = vehicle => async dispatch => {
    const requestUrl = `${apiUrl}/${vehicle.id}`;
    const result = await dispatch({
        type: ACTION_TYPES.UPDATE_VEHICLE,
        payload: axios.put(requestUrl, vehicle)
    });
    dispatch(getVehicles());
    return result;
};

export const deleteVehicle: ICrudDeleteAction<IVehicle> = id => async dispatch => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await dispatch({
        type: ACTION_TYPES.DELETE_VEHICLE,
        payload: axios.delete(requestUrl)
    });
    dispatch(getVehicles());
    return result;
};

export const reset = () => ({
    type: ACTION_TYPES.RESET
});

const fuelTypeApiUrl = 'api/fuel-type';
export const getFuelTypes: ICrudGetAllAction<string[]> = () => ({
    type: ACTION_TYPES.FETCH_FUELTYPES,
    payload: axios.get<string[]>(fuelTypeApiUrl)
});
