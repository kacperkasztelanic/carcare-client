import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IVehicle, defaultValue } from 'app/shared/model/vehicle.model';
import { IFuelType } from 'app/shared/model/fuel-type.model';

export const ACTION_TYPES = {
    FETCH_VEHICLES: 'vehicle/FETCH_VEHICLES',
    FETCH_VEHICLE: 'vehicle/FETCH_VEHICLE',
    CREATE_VEHICLE: 'vehicle/CREATE_VEHICLE',
    UPDATE_VEHICLE: 'vehicle/UPDATE_VEHICLE',
    DELETE_VEHICLE: 'vehicle/DELETE_VEHICLE',
    RESET: 'vehicle/RESET',
    FETCH_FUELTYPES: 'vehicle/FETCH_FUELTYPES',
    OPEN_DETAILS: 'vehicle/OPEN_DETAILS'
};

const initialState = {
    loading: false,
    errorMessage: null,
    vehicles: [] as ReadonlyArray<IVehicle>,
    vehicle: defaultValue,
    updating: false,
    updateSuccess: false,
    totalItems: 0,
    fuelTypes: [] as ReadonlyArray<IFuelType>,
    fuelTypesLoading: false
};

export type VehiclesState = Readonly<typeof initialState>;

export default (state: VehiclesState = initialState, action): VehiclesState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.FETCH_VEHICLES):
        case REQUEST(ACTION_TYPES.FETCH_VEHICLE):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case REQUEST(ACTION_TYPES.FETCH_FUELTYPES):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true,
                fuelTypesLoading: true
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
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload,
                fuelTypesLoading: false
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
                fuelTypes: action.payload.data,
                fuelTypesLoading: false
            };
        case ACTION_TYPES.OPEN_DETAILS:
            return {
                ...state,
                loading: true
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
    const updated = {
        ...vehicle,
        fuelType: {
            type: vehicle.fuelType,
            translation: ''
        }
    };
    const result = await dispatch({
        type: ACTION_TYPES.CREATE_VEHICLE,
        payload: axios.post(apiUrl, updated)
    });
    dispatch(getVehicles());
    return result;
};

export const updateVehicle: ICrudPutAction<IVehicle> = vehicle => async dispatch => {
    const requestUrl = `${apiUrl}/${vehicle.id}`;
    const updated = {
        ...vehicle,
        fuelType: {
            type: vehicle.fuelType,
            translation: ''
        },
        make: vehicle.make.trim(),
        model: vehicle.model.trim(),
        licensePlate: vehicle.licensePlate.trim(),
        vehicleDetails: {
            ...vehicle.vehicleDetails,
            modelSuffix: vehicle.vehicleDetails.modelSuffix.trim(),
            vinNumber: vehicle.vehicleDetails.vinNumber.trim(),
            vehicleCard: vehicle.vehicleDetails.vehicleCard.trim(),
            registrationCertificate: vehicle.vehicleDetails.registrationCertificate.trim(),
            notes: vehicle.vehicleDetails.notes.trim()
        }
    };
    const result = await dispatch({
        type: ACTION_TYPES.UPDATE_VEHICLE,
        payload: axios.put(requestUrl, updated)
    });
    dispatch(getVehicle(vehicle.id));
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
export const getFuelTypes: ICrudGetAllAction<IFuelType[]> = () => ({
    type: ACTION_TYPES.FETCH_FUELTYPES,
    payload: axios.get<IFuelType[]>(fuelTypeApiUrl)
});

export const openDetails = () => ({
    type: ACTION_TYPES.OPEN_DETAILS
});
