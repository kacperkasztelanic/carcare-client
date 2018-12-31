import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IInspection, defaultValue } from 'app/shared/model/inspection.model';

export const ACTION_TYPES = {
    FETCH_INSPECTIONS: 'inspection/FETCH_INSPECTIONS',
    FETCH_INSPECTION: 'inspection/FETCH_INSPECTION',
    CREATE_INSPECTION: 'inspection/CREATE_INSPECTION',
    UPDATE_INSPECTION: 'inspection/UPDATE_INSPECTION',
    DELETE_INSPECTION: 'inspection/DELETE_INSPECTION',
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
        case REQUEST(ACTION_TYPES.FETCH_INSPECTIONS):
        case REQUEST(ACTION_TYPES.FETCH_INSPECTION):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                loading: true
            };
        case REQUEST(ACTION_TYPES.CREATE_INSPECTION):
        case REQUEST(ACTION_TYPES.UPDATE_INSPECTION):
        case REQUEST(ACTION_TYPES.DELETE_INSPECTION):
            return {
                ...state,
                errorMessage: null,
                updateSuccess: false,
                updating: true
            };
        case FAILURE(ACTION_TYPES.FETCH_INSPECTIONS):
        case FAILURE(ACTION_TYPES.FETCH_INSPECTION):
        case FAILURE(ACTION_TYPES.CREATE_INSPECTION):
        case FAILURE(ACTION_TYPES.UPDATE_INSPECTION):
        case FAILURE(ACTION_TYPES.DELETE_INSPECTION):
            return {
                ...state,
                loading: false,
                updating: false,
                updateSuccess: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.FETCH_INSPECTIONS):
            return {
                ...state,
                loading: false,
                inspections: action.payload.data,
                totalItems: action.payload.headers['x-total-count']
            };
        case SUCCESS(ACTION_TYPES.FETCH_INSPECTION):
            return {
                ...state,
                loading: false,
                inspection: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.CREATE_INSPECTION):
        case SUCCESS(ACTION_TYPES.UPDATE_INSPECTION):
            return {
                ...state,
                updating: false,
                updateSuccess: true,
                inspection: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.DELETE_INSPECTION):
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

export const getInspections: ICrudGetAllAction<IInspection[]> = vehicleId => {
    const requestUrl = `${apiUrl}/all/${vehicleId}`;
    return {
        type: ACTION_TYPES.FETCH_INSPECTIONS,
        payload: axios.get<IInspection[]>(requestUrl).then(response => ({
            ...response,
            data: response.data.map(prepareAfterReceive)
        }))
    };
};

export const getInspection: ICrudGetAction<IInspection> = id => {
    const requestUrl = `${apiUrl}/${id}`;
    return {
        type: ACTION_TYPES.FETCH_INSPECTION,
        payload: axios.get<IInspection>(requestUrl).then(response => ({
            ...response,
            data: prepareAfterReceive(response.data)
        }))
    };
};

export const createInspection: ICrudPutAction<IInspection> = inspection => async dispatch => {
    const requestUrl = `${apiUrl}/${inspection.vehicleId}`;
    inspection = prepareToDispatch(inspection);
    const result = await dispatch({
        type: ACTION_TYPES.CREATE_INSPECTION,
        payload: axios.post(requestUrl, inspection)
    });
    dispatch(getInspections(inspection.vehicleId));
    return result;
};

export const updateInspection: ICrudPutAction<IInspection> = inspection => async dispatch => {
    const requestUrl = `${apiUrl}/${inspection.id}`;
    inspection = prepareToDispatch(inspection);
    const result = await dispatch({
        type: ACTION_TYPES.UPDATE_INSPECTION,
        payload: axios.put(requestUrl, inspection)
    });
    dispatch(getInspections(inspection.vehicleId));
    return result;
};

export const deleteInspection: ICrudDeleteAction<IInspection> = id => async dispatch => {
    const requestUrl = `${apiUrl}/${id}`;
    const inspection = await dispatch({
        type: ACTION_TYPES.FETCH_INSPECTION,
        payload: axios.get(requestUrl)
    });
    const vehicleId = inspection.value.data.vehicleId;
    const result = await dispatch({
        type: ACTION_TYPES.DELETE_INSPECTION,
        payload: axios.delete(requestUrl)
    });
    dispatch(getInspections(vehicleId));
    return result;
};

export const reset = () => ({
    type: ACTION_TYPES.RESET
});

const prepareToDispatch = (inspection: IInspection): IInspection => ({
    ...inspection,
    costInCents: inspection.costInCents * 100
});

const prepareAfterReceive = (inspection: IInspection): IInspection => ({
    ...inspection,
    costInCents: inspection.costInCents / 100
});
