import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getRepair, updateRepair, createRepair, reset } from './repair.reducer';

export interface IRepairUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string, vehicleId: string }> { }

export interface IRepairUpdateState {
    isNew: boolean;
    vehicleId: string;
}

export class RepairUpdate extends React.Component<IRepairUpdateProps, IRepairUpdateState> {
    constructor(props) {
        super(props);
        this.state = {
            vehicleId: this.props.match.params.vehicleId,
            isNew: !this.props.match.params || !this.props.match.params.id
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
            this.props.getRepair(this.props.match.params.id);
        }
    }

    saveEntity = (event, errors, values) => {
        if (errors.length === 0) {
            const { repairEntity } = this.props;
            const entity = {
                ...repairEntity,
                ...this.state,
                ...values
            };

            if (this.state.isNew) {
                this.props.createRepair(entity);
            } else {
                this.props.updateRepair(entity);
            }
        }
    };

    handleClose = event => {
        event.stopPropagation();
        this.props.history.goBack();
    };

    render() {
        const { repairEntity, loading, updating } = this.props;
        const { isNew } = this.state;
        return (
            <Modal isOpen toggle={this.handleClose}>
                <ModalHeader toggle={this.handleClose}>
                    <Translate contentKey="carcare.repair.edit.title">Create or edit a repair</Translate>
                </ModalHeader>
                <ModalBody>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                            <AvForm model={isNew ? {} : repairEntity} onSubmit={this.saveEntity}>
                                <AvGroup>
                                    <Label id="dateLabel" for="vehicleEvent.date">
                                        <Translate contentKey="carcare.common.date">Date</Translate>
                                    </Label>
                                    <AvField
                                        id="repair-date"
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
                                        id="repair-mileage"
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
                                        id="repair-cost"
                                        type="text"
                                        name="costInCents"
                                        validate={{
                                            required: { value: true, errorMessage: translate('entity.validation.required') },
                                            min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) }
                                        }}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label id="stationLabel" for="station">
                                        <Translate contentKey="carcare.repair.station">Station</Translate>
                                    </Label>
                                    <AvField
                                        id="refuel-station"
                                        type="text"
                                        name="station"
                                        validate={{
                                            required: { value: true, errorMessage: translate('entity.validation.required') },
                                            minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                                            maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                                        }}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label id="detailsLabel" for="details">
                                        <Translate contentKey="carcare.repair.details">Details</Translate>
                                    </Label>
                                    <AvField
                                        id="repair-details"
                                        type="textarea"
                                        name="details"
                                        validate={{
                                            required: { value: true, errorMessage: translate('entity.validation.required') },
                                            minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) }
                                        }}
                                    />
                                </AvGroup>
                                <Button onClick={this.handleClose} color="info">
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
    repairEntity: storeState.repairs.repair,
    loading: storeState.repairs.loading,
    updating: storeState.repairs.updating,
    updateSuccess: storeState.repairs.updateSuccess
});

const mapDispatchToProps = {
    getRepair,
    updateRepair,
    createRepair,
    reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RepairUpdate);
