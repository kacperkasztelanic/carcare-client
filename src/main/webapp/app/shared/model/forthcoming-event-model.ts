import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface IForthcomingEvent {
    vehicleId?: any;
    eventType?: string;
    details?: string;
    dateThru?: Date;
    mileageThru?: number;
    eventTypeIcon?: IconProp;
    eventTypeTranslationString?: string;
}

export const defaultValue: Readonly<IForthcomingEvent> = {};
