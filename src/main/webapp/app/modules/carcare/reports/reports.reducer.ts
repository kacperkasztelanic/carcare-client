import axios from 'axios';
import { IVehicle } from 'app/shared/model/vehicle.model';
import { ICostRequest } from 'app/shared/model/cost-request.model'

export const ACTION_TYPES = {
    DOWNLOAD_REPORT: 'reports/DOWNLOAD_REPORT',
    COSTS_REPORT: 'reports/COSTS_REPORT'
};

const apiUrl = '/api/reports';

export const downloadReport = (vehicle: IVehicle) => {
    const requestUrl = `${apiUrl}/vehicle/${vehicle.id}`;
    const config = {
        responseType: 'blob'
    };
    return {
        type: ACTION_TYPES.DOWNLOAD_REPORT,
        payload: axios
            .get(requestUrl, config)
            .then(res => {
                const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.download = `${vehicle.licensePlate.split(' ').join('_')}.xlsx`;
                a.href = url;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            })
            .catch(error => {
                return { error };
            })
    };
};

export const downloadCostReport = (ids: any[], from: Date, to: Date) => {
    const requestUrl = `${apiUrl}/costs`;
    const config = {
        responseType: 'blob'
    };
    const body: ICostRequest = {
        vehicleIds: ids,
        dateFrom: from,
        dateTo: to
    };
    return {
        type: ACTION_TYPES.COSTS_REPORT,
        payload: axios
            .post(requestUrl, body, config)
            .then(res => {
                const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.download = `costs.xlsx`;
                a.href = url;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            })
            .catch(error => {
                return { error };
            })
    };
};
