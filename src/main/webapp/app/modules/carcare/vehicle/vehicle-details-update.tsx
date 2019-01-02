import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import ReactLoading from 'react-loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getVehicle, updateVehicle, reset } from './vehicle.reducer';

export interface IVehicleDetailsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> { }

export interface IVehicleDetailsUpdateState {
    id: string;
}

export class VehicleDetailsUpdate extends React.Component<IVehicleDetailsUpdateProps, IVehicleDetailsUpdateState> {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id
        };
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
            this.handleClose(event);
        }
    }

    componentDidMount() {
        this.props.getVehicle(this.props.match.params.id);
    }

    saveEntity = (event, errors, values) => {
        if (errors.length === 0) {
            const { vehicleEntity } = this.props;
            const entity = {
                ...vehicleEntity,
                ...this.state,
                ...values
            };
            this.props.updateVehicle(entity);
        }
    };

    handleClose = event => {
        event.stopPropagation();
        this.props.history.goBack();
    };

    render() {
        const { vehicleEntity, loading, updating } = this.props;
        return (
            <Modal isOpen toggle={this.handleClose}>
                <ModalHeader toggle={this.handleClose}>
                    <Translate contentKey="carcare.vehicle.edit.title">Create or edit a vehicle</Translate>
                </ModalHeader>
                <ModalBody>
                    {loading ? (
                        <ReactLoading type="bubbles" color="353D47" />
                    ) : (
                            <AvForm model={vehicleEntity} onSubmit={this.saveEntity}>
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
                                <Button tag={Link} id="cancel-save" to={`/app/details/${this.state.id}`} replace color="info">
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
    reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VehicleDetailsUpdate);
