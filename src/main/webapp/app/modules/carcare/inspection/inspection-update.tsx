import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import ReactLoading from 'react-loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getInspection, updateInspection, createInspection, reset } from './inspection.reducer';

export interface IInspectionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string, vehicleId: string }> { }

export interface IInspectionUpdateState {
    isNew: boolean;
    vehicleId: string;
}

export class InspectionUpdate extends React.Component<IInspectionUpdateProps, IInspectionUpdateState> {
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
            this.props.getInspection(this.props.match.params.id);
        }
    }

    saveEntity = (event, errors, values) => {
        if (errors.length === 0) {
            const { inspectionEntity } = this.props;
            const entity = {
                ...inspectionEntity,
                ...this.state,
                ...values
            };

            if (this.state.isNew) {
                this.props.createInspection(entity);
            } else {
                this.props.updateInspection(entity);
            }
        }
    };

    handleClose = event => {
        event.stopPropagation();
        this.props.history.goBack();
    };

    render() {
        const { inspectionEntity, loading, updating } = this.props;
        const { isNew } = this.state;
        return (
            <Modal isOpen toggle={this.handleClose}>
                <ModalHeader toggle={this.handleClose}>
                    <Translate contentKey="carcare.inspection.edit.title">Create or edit a inspection</Translate>
                </ModalHeader>
                <ModalBody>
                    {loading ? (
                        <ReactLoading type="bubbles" color="353D47" />
                    ) : (
                            <AvForm model={isNew ? {} : inspectionEntity} onSubmit={this.saveEntity}>
                                <AvGroup>
                                    <Label id="dateLabel" for="vehicleEvent.date">
                                        <Translate contentKey="carcare.common.date">Date</Translate>
                                    </Label>
                                    <AvField
                                        id="inspection-date"
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
                                        id="inspection-mileage"
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
                                        id="inspection-cost"
                                        type="text"
                                        name="costInCents"
                                        validate={{
                                            required: { value: true, errorMessage: translate('entity.validation.required') },
                                            min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) }
                                        }}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label id="validThruLabel" for="validThru">
                                        <Translate contentKey="carcare.inspection.valid-thru">Date</Translate>
                                    </Label>
                                    <AvField
                                        id="inspection-validThru"
                                        type="date"
                                        className="form-control"
                                        name="validThru"
                                        validate={{
                                            required: { value: true, errorMessage: translate('entity.validation.required') }
                                        }}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label id="StationLabel" for="station">
                                        <Translate contentKey="carcare.inspection.station">Station</Translate>
                                    </Label>
                                    <AvField
                                        id="inspection-station"
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
                                        <Translate contentKey="carcare.inspection.details">Details</Translate>
                                    </Label>
                                    <AvField
                                        id="inspection-details"
                                        type="textarea"
                                        rows="5"
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
    inspectionEntity: storeState.inspections.inspection,
    loading: storeState.inspections.loading,
    updating: storeState.inspections.updating,
    updateSuccess: storeState.inspections.updateSuccess
});

const mapDispatchToProps = {
    getInspection,
    updateInspection,
    createInspection,
    reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InspectionUpdate);
