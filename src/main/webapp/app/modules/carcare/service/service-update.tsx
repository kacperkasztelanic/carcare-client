import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Label, Modal, ModalHeader, ModalBody, Col, Row } from 'reactstrap';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import ReactLoading from 'react-loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getService, updateService, createService, reset } from './service.reducer';

export interface IServiceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string, vehicleId: string }> { }

export interface IServiceUpdateState {
    isNew: boolean;
    vehicleId: string;
}

export class ServiceUpdate extends React.Component<IServiceUpdateProps, IServiceUpdateState> {
    constructor(props) {
        super(props);
        this.state = {
            vehicleId: this.props.match.params.vehicleId,
            isNew: !this.props.match.params || !this.props.match.params.id
        };
    }

    componentDidMount() {
        if (this.state.isNew) {
            this.props.reset();
        } else {
            this.props.getService(this.props.match.params.id);
        }
    }

    saveEntity = (event, errors, values) => {
        if (errors.length === 0) {
            const { serviceEntity } = this.props;
            const entity = {
                ...serviceEntity,
                ...this.state,
                ...values
            };

            if (this.state.isNew) {
                this.props.createService(entity);
            } else {
                this.props.updateService(entity);
            }
            this.handleClose(event);
        }
    };

    handleClose = event => {
        event.stopPropagation();
        this.props.history.goBack();
    };

    render() {
        const { serviceEntity, loading, updating } = this.props;
        const { isNew } = this.state;
        return (
            <Modal isOpen toggle={this.handleClose}>
                <ModalHeader toggle={this.handleClose}>
                    <Translate contentKey="carcare.service.edit.title">Create or edit a service</Translate>
                </ModalHeader>
                <ModalBody>
                    {loading ? (
                        <ReactLoading type="bubbles" color="353D47" />
                    ) : (
                            <AvForm model={isNew ? {} : serviceEntity} onSubmit={this.saveEntity}>
                                <Row>
                                    <Col md="6" sd="12">
                                        <AvGroup>
                                            <Label id="dateLabel" for="vehicleEvent.date">
                                                <Translate contentKey="carcare.common.date">Date</Translate>
                                            </Label>
                                            <AvField
                                                id="service-date"
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
                                                id="service-mileage"
                                                type="text"
                                                name="vehicleEvent.mileage"
                                                validate={{
                                                    required: { value: true, errorMessage: translate('entity.validation.required') },
                                                    pattern: { value: '^[0-9]*$', errorMessage: translate('entity.validation.number') },
                                                    min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) }
                                                }}
                                            />
                                        </AvGroup>
                                        <AvGroup>
                                            <Label id="stationLabel" for="station">
                                                <Translate contentKey="carcare.service.station">Station</Translate>
                                            </Label>
                                            <AvField
                                                id="service-station"
                                                type="text"
                                                name="station"
                                                validate={{
                                                    maxLength: { value: 30, errorMessage: translate('entity.validation.maxlength', { max: 30 }) }
                                                }}
                                            />
                                        </AvGroup>
                                    </Col>
                                    <Col md="6" sd="12">
                                        <AvGroup>
                                            <Label id="costLabel" for="cost">
                                                <Translate contentKey="carcare.common.cost" interpolate={{ unit: 'PLN' }}>Cost (PLN)</Translate>
                                            </Label>
                                            <AvField
                                                id="service-cost"
                                                type="text"
                                                name="costInCents"
                                                validate={{
                                                    required: { value: true, errorMessage: translate('entity.validation.required') },
                                                    pattern: { value: '^[0-9.]*$', errorMessage: translate('entity.validation.number') },
                                                    min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) }
                                                }}
                                            />
                                        </AvGroup>
                                        <AvGroup>
                                            <Label id="nextByDateLabel" for="nextByDate">
                                                <Translate contentKey="carcare.service.next-by-date">Next by date</Translate>
                                            </Label>
                                            <AvField
                                                id="service-nextByDate"
                                                type="date"
                                                name="nextByDate"
                                                validate={{
                                                    required: { value: true, errorMessage: translate('entity.validation.required') }
                                                }}
                                            />
                                        </AvGroup>
                                        <AvGroup>
                                            <Label id="nextByMileageLabel" for="nextByMileage">
                                                <Translate contentKey="carcare.service.next-by-mileage" interpolate={{ unit: 'km' }}>NextByMileage (km)</Translate>
                                            </Label>
                                            <AvField
                                                id="service-nextByMileage"
                                                type="text"
                                                name="nextByMileage"
                                                validate={{
                                                    required: { value: true, errorMessage: translate('entity.validation.required') },
                                                    pattern: { value: '^[0-9]*$', errorMessage: translate('entity.validation.number') },
                                                    min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) }
                                                }}
                                            />
                                        </AvGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <AvGroup>
                                            <Label id="detailsLabel" for="details">
                                                <Translate contentKey="carcare.service.details">Details</Translate>
                                            </Label>
                                            <AvField
                                                id="service-details"
                                                type="textarea"
                                                rows="5"
                                                name="details"
                                                validate={{
                                                    required: { value: true, errorMessage: translate('entity.validation.required') },
                                                    minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                                                    maxLength: { value: 65535, errorMessage: translate('entity.validation.maxlength', { max: 65535 }) }
                                                }}
                                            />
                                        </AvGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
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
                                    </Col>
                                </Row>
                            </AvForm>
                        )}
                </ModalBody>
            </Modal >
        );
    }
}

const mapStateToProps = (storeState: IRootState) => ({
    serviceEntity: storeState.services.service,
    loading: storeState.services.loading,
    updating: storeState.services.updating,
    updateSuccess: storeState.services.updateSuccess
});

const mapDispatchToProps = {
    getService,
    updateService,
    createService,
    reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ServiceUpdate);
