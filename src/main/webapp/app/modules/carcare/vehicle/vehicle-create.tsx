import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import ReactLoading from 'react-loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getVehicle, updateVehicle, createVehicle, reset, getFuelTypes } from './vehicle.reducer';

export interface IVehicleCreateProps extends StateProps, DispatchProps, RouteComponentProps<{ vehicleId: string }> { }

export interface IVehicleCreateState {
    isNew: boolean;
    vehicleId: string;
}

export class VehicleCreate extends React.Component<IVehicleCreateProps, IVehicleCreateState> {
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
        this.props.getFuelTypes();
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
        const { vehicleEntity, loading, updating, fuelTypes } = this.props;
        const { isNew } = this.state;
        return (
            <Modal isOpen toggle={this.handleClose}>
                <ModalHeader toggle={this.handleClose}>
                    <Translate contentKey="carcare.vehicle.edit.title">Create or edit a vehicle</Translate>
                </ModalHeader>
                <ModalBody>
                    {loading ? (
                        <ReactLoading type="bubbles" color="353D47" />
                    ) : (
                            <AvForm model={isNew ? {} : vehicleEntity} onSubmit={this.saveEntity}>
                                <AvGroup>
                                    <Label id="makeLabel" for="make">
                                        <Translate contentKey="carcare.vehicle.make">Make</Translate>
                                    </Label>
                                    <AvField
                                        id="vehicle-make"
                                        type="text"
                                        className="form-control"
                                        name="make"
                                        validate={{
                                            required: { value: true, errorMessage: translate('entity.validation.required') },
                                            minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                                            maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                                        }}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label id="modelLabel" for="model">
                                        <Translate contentKey="carcare.vehicle.model">Model</Translate>
                                    </Label>
                                    <AvField
                                        id="vehicle-model"
                                        type="text"
                                        className="form-control"
                                        name="model"
                                        validate={{
                                            required: { value: true, errorMessage: translate('entity.validation.required') },
                                            minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                                            maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                                        }}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label id="licensePlateLabel" for="licensePlate">
                                        <Translate contentKey="carcare.vehicle.license-plate">License plate</Translate>
                                    </Label>
                                    <AvField
                                        id="vehicle-license-plate"
                                        type="text"
                                        className="form-control"
                                        name="licensePlate"
                                        validate={{
                                            required: { value: true, errorMessage: translate('entity.validation.required') },
                                            minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                                            maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                                        }}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label id="fuelTypeLabel" for="fuelType">
                                        <Translate contentKey="carcare.vehicle.fuel-type">Fuel type</Translate>
                                    </Label>
                                    <AvInput
                                        id="vehicle-fuel-type"
                                        type="select"
                                        className="form-control"
                                        name="fuelType"
                                        validate={{
                                            required: { value: true, errorMessage: translate('entity.validation.required') }
                                        }}>
                                        <option value="" key="0" />
                                        {fuelTypes
                                            ? fuelTypes.map(x => (
                                                <option value={x} key={x}>
                                                    {x}
                                                </option>
                                            ))
                                            : null}
                                    </AvInput>
                                </AvGroup>
                                <Button tag={Link} id="cancel-save" to={`/app`} replace color="info">
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
    updateSuccess: storeState.vehicles.updateSuccess,
    fuelTypes: storeState.vehicles.fuelTypes
});

const mapDispatchToProps = {
    getVehicle,
    updateVehicle,
    createVehicle,
    reset,
    getFuelTypes
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VehicleCreate);
