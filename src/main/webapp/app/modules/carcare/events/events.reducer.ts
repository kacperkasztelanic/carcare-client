import axios from 'axios';
import { IVehicle } from 'app/shared/model/vehicle.model';

export const ACTION_TYPES = {
    FETCH_EVENTS: 'events/FETCH_EVENTS'
};

const apiUrl = '/api/events';

export const fetchEvents = (ids: any[], from: Date, to: Date) => {
    console.log('events');
}
