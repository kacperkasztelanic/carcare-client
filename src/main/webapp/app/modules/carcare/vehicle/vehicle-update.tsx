import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getVehicle, updateVehicle, createVehicle, reset } from './vehicle.reducer';

export interface IVehicleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ vehicleId: string }> { }

export interface IVehicleUpdateState {
    isNew: boolean;
    vehicleId: string;
}

export class VehicleUpdate extends React.Component<IVehicleUpdateProps, IVehicleUpdateState> {
    constructor(props) {
        super(props);
        this.state = {
            vehicleId: this.props.match.params.vehicleId,
            isNew: !this.props.match.params || !this.props.match.params.vehicleId
        };
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
            this.handleClose(event);
        }
    }

    componentDidMount() {
        if (this.state.isNew) {
            this.props.reset();
        } else {
            this.props.getVehicle(this.props.match.params.vehicleId);
        }
    }

    saveEntity = (event, errors, values) => {
        if (errors.length === 0) {
            const { vehicleEntity } = this.props;
            const entity = {
                ...vehicleEntity,
                ...this.state,
                ...values
            };

            if (this.state.isNew) {
                this.props.createVehicle(entity);
            } else {
                this.props.updateVehicle(entity);
            }
        }
    };

    handleClose = event => {
        event.stopPropagation();
        this.props.history.goBack();
    };

    render() {
        const { vehicleEntity, loading, updating } = this.props;
        const { isNew } = this.state;
        return (
            <Modal isOpen toggle={this.handleClose}>
                <ModalHeader toggle={this.handleClose}>
                    <Translate contentKey="carcare.vehicle.edit.title">Create or edit a vehicle</Translate>
                </ModalHeader>
                <ModalBody>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                            <AvForm model={isNew ? {} : vehicleEntity} onSubmit={this.saveEntity}>
                                <AvGroup>
                                    <Label id="dateLabel" for="vehicleEvent.date">
                                        <Translate contentKey="carcare.common.date">Date</Translate>
                                    </Label>
                                    <AvField
                                        id="vehicle-date"
                                        type="date"
                                        className="form-control"
                                        name="vehicleEvent.date"
                                        validate={{
                                            required: { value: true, errorMessage: translate('entity.validation.required') }
                                        }}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label id="mileageLabel" for="vehicleEvent.mileage">
                                        <Translate contentKey="carcare.common.mileage" interpolate={{ unit: 'km' }}>Mileage (km)</Translate>
                                    </Label>
                                    <AvField
                                        id="vehicle-mileage"
                                        type="text"
                                        name="vehicleEvent.mileage"
                                        validate={{
                                            required: { value: true, errorMessage: translate('entity.validation.required') },
                                            min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) }
                                        }}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label id="costLabel" for="cost">
                                        <Translate contentKey="carcare.common.cost" interpolate={{ unit: 'PLN' }}>Cost (PLN)</Translate>
                                    </Label>
                                    <AvField
                                        id="vehicle-cost"
                                        type="text"
                                        name="costInCents"
                                        validate={{
                                            required: { value: true, errorMessage: translate('entity.validation.required') },
                                            min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) }
                                        }}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label id="volumeLabel" for="volume">
                                        <Translate contentKey="carcare.vehicle.volume" interpolate={{ unit: 'dm3' }}>Volume (dm3)</Translate>
                                    </Label>
                                    <AvField
                                        id="vehicle-volume"
                                        type="text"
                                        name="volume"
                                        validate={{
                                            required: { value: true, errorMessage: translate('entity.validation.required') },
                                            min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) }
                                        }}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label id="StationLabel" for="station">
                                        <Translate contentKey="carcare.vehicle.station">Station</Translate>
                                    </Label>
                                    <AvField
                                        id="vehicle-station"
                                        type="text"
                                        name="station"
                                        validate={{
                                            required: { value: true, errorMessage: translate('entity.validation.required') },
                                            minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                                            maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                                        }}
                                    />
                                </AvGroup>
                                <Button tag={Link} id="cancel-save" to={`/carcare/vehicle`} replace color="info">
                                    <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                                        <Translate contentKey="entity.action.back">Back</Translate>
                                    </span>
                                </Button>
                                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                                    <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                                </Button>
                            </AvForm>
                        )}
                </ModalBody>
            </Modal >
        );
    }
}

const mapStateToProps = (storeState: IRootState) => ({
    vehicleEntity: storeState.vehicles.vehicle,
    loading: storeState.vehicles.loading,
    updating: storeState.vehicles.updating,
    updateSuccess: storeState.vehicles.updateSuccess
});

const mapDispatchToProps = {
    getVehicle,
    updateVehicle,
    createVehicle,
    reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VehicleUpdate);
