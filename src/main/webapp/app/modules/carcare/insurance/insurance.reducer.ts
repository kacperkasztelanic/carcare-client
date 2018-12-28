import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IInsurance, defaultValue } from 'app/shared/model/insurance.model';

export const ACTION_TYPES = {
    FETCH_INSURANCES: 'insurance/FETCH_INSURANCES',
    FETCH_INSURANCE: 'insurance/FETCH_INSURANCE',
    CREATE_INSURANCE: 'insurance/CREATE_INSURANCE',
    UPDATE_INSURANCE: 'insurance/UPDATE_INSURANCE',
    DELETE_INSURANCE: 'insurance/DELETE_INSURANCE',
    RESET: 'insurance/RESET'
};

const initialState = {
    loading: false,
    errorMessage: null,
    insurances: [] as ReadonlyArray<IInsurance>,
    insurance: defaultValue,
    updating: false,
    updateSuccess: false,
    totalItems: 0
};

export type InsurancesState = Readonly<typeof initialState>;

export default (state: InsurancesState = initialState, action): InsurancesState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.FETCH_INSURANCES):
        case REQUEST(ACTION_TYPES.FETCH_INSURANCE):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case REQUEST(ACTION_TYPES.CREATE_INSURANCE):
        case REQUEST(ACTION_TYPES.UPDATE_INSURANCE):
        case REQUEST(ACTION_TYPES.DELETE_INSURANCE):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            };
        case FAILURE(ACTION_TYPES.FETCH_INSURANCES):
        case FAILURE(ACTION_TYPES.FETCH_INSURANCE):
        case FAILURE(ACTION_TYPES.CREATE_INSURANCE):
        case FAILURE(ACTION_TYPES.UPDATE_INSURANCE):
        case FAILURE(ACTION_TYPES.DELETE_INSURANCE):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.FETCH_INSURANCES):
            return {
                ...state,
                loading: false,
                insurances: action.payload.data,
                totalItems: action.payload.headers['x-total-count']
            };
        case SUCCESS(ACTION_TYPES.FETCH_INSURANCE):
            return {
                ...state,
                loading: false,
                insurance: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.CREATE_INSURANCE):
        case SUCCESS(ACTION_TYPES.UPDATE_INSURANCE):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                insurance: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.DELETE_INSURANCE):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                insurance: defaultValue
            };
        case ACTION_TYPES.RESET:
            return {
                ...state,
                loading: false,
                errorMessage: null,
                insurance: defaultValue,
                updating: false,
                updateSuccess: false
            };
        default:
            return state;
    }
};

const apiUrl = 'api/insurance';

export const getInsurances: ICrudGetAllAction<IInsurance> = vehicleId => {
    const requestUrl = `${apiUrl}/all/${vehicleId}`;
    return {
        type: ACTION_TYPES.FETCH_INSURANCES,
        payload: axios.get<IInsurance>(requestUrl)
    };
};

export const getInsurance: ICrudGetAction<IInsurance> = id => {
    const requestUrl = `${apiUrl}/${id}`;
    return {
        type: ACTION_TYPES.FETCH_INSURANCE,
        payload: axios.get<IInsurance>(requestUrl)
    };
};

export const createInsurance: ICrudPutAction<IInsurance> = insurance => async dispatch => {
    const requestUrl = `${apiUrl}/${insurance.vehicleId}`;
    const result = await dispatch({
        type: ACTION_TYPES.CREATE_INSURANCE,
        payload: axios.post(requestUrl, insurance)
    });
    dispatch(getInsurances(insurance.vehicleId));
    return result;
};

export const updateInsurance: ICrudPutAction<IInsurance> = insurance => async dispatch => {
    const requestUrl = `${apiUrl}/${insurance.id}`;
    const result = await dispatch({
        type: ACTION_TYPES.UPDATE_INSURANCE,
        payload: axios.put(requestUrl, insurance)
    });
    dispatch(getInsurances(insurance.vehicleId));
    return result;
};

export const deleteInsurance: ICrudDeleteAction<IInsurance> = id => async dispatch => {
    const requestUrl = `${apiUrl}/${id}`;
    const insurance = await dispatch({
        type: ACTION_TYPES.FETCH_INSURANCE,
        payload: axios.get(requestUrl)
    });
    const vehicleId = insurance.value.data.vehicleId;
    const result = await dispatch({
        type: ACTION_TYPES.DELETE_INSURANCE,
        payload: axios.delete(requestUrl)
    });
    dispatch(getInsurances(vehicleId));
    return result;
};

export const reset = () => ({
    type: ACTION_TYPES.RESET
});
