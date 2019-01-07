import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Label, Modal, ModalHeader, ModalBody, Col, Row } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import ReactLoading from 'react-loading';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getInsurance, updateInsurance, createInsurance, reset, getInsuranceTypes } from './insurance.reducer';
import { IInsuranceType } from 'app/shared/model/insurance-type.model';

export interface IInsuranceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string, vehicleId: string }> { }

export interface IInsuranceUpdateState {
    isNew: boolean;
    vehicleId: string;
}

export class InsuranceUpdate extends React.Component<IInsuranceUpdateProps, IInsuranceUpdateState> {
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
            this.props.getInsurance(this.props.match.params.id);
        }
        this.props.getInsuranceTypes();
    }

    saveEntity = (event, errors, values) => {
        if (errors.length === 0) {
            const { insuranceEntity } = this.props;
            const entity = {
                ...insuranceEntity,
                ...this.state,
                ...values
            };

            if (this.state.isNew) {
                this.props.createInsurance(entity);
            } else {
                this.props.updateInsurance(entity);
            }
            this.handleClose(event);
        }
    };

    handleClose = event => {
        event.stopPropagation();
        this.props.history.goBack();
    };

    render() {
        const { insuranceEntity, insuranceTypes, loading, updating } = this.props;
        const { isNew } = this.state;
        return (
            <Modal isOpen toggle={this.handleClose}>
                <ModalHeader toggle={this.handleClose}>
                    <Translate contentKey="carcare.insurance.edit.title">Create or edit a insurance</Translate>
                </ModalHeader>
                <ModalBody>
                    {loading ? (
                        <ReactLoading type="bubbles" color="353D47" />
                    ) : (
                            <AvForm model={isNew ? {} : insuranceEntity} onSubmit={this.saveEntity}>
                                <Row>
                                    <Col md="6" sd="12">
                                        <AvGroup>
                                            <Label id="dateLabel" for="vehicleEvent.date">
                                                <Translate contentKey="carcare.common.date">Date</Translate>
                                            </Label>
                                            <AvField
                                                id="insurance-date"
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
                                                id="insurance-mileage"
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
                                            <Label id="insuranceTypeLabel" for="insuranceType">
                                                <Translate contentKey="carcare.insurance.type">Type</Translate>
                                            </Label>
                                            <AvField
                                                id="insurance-type"
                                                type="select"
                                                className="form-control"
                                                name="insuranceType"
                                                value={insuranceEntity.insuranceType ? insuranceEntity.insuranceType : ''}
                                                validate={{
                                                    required: { value: true, errorMessage: translate('entity.validation.required') }
                                                }}>
                                                <option disabled hidden />
                                                {insuranceTypes
                                                    ? insuranceTypes.map((x: IInsuranceType) => (
                                                        <option value={x.type} key={x.type}>
                                                            {x.translation}
                                                        </option>
                                                    ))
                                                    : null}
                                            </AvField>
                                        </AvGroup>
                                        <AvGroup>
                                            <Label id="validFromLabel" for="validFrom">
                                                <Translate contentKey="carcare.insurance.valid-from">Valid from</Translate>
                                            </Label>
                                            <AvField
                                                id="insurance-validFrom"
                                                type="date"
                                                className="form-control"
                                                name="validFrom"
                                                validate={{
                                                    required: { value: true, errorMessage: translate('entity.validation.required') }
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
                                                id="insurance-cost"
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
                                            <Label id="insurerLabel" for="insurer">
                                                <Translate contentKey="carcare.insurance.insurer">Insurer</Translate>
                                            </Label>
                                            <AvField
                                                id="insurance-insurer"
                                                type="text"
                                                name="insurer"
                                                validate={{
                                                    maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                                                }}
                                            />
                                        </AvGroup>
                                        <AvGroup>
                                            <Label id="numberLabel" for="number">
                                                <Translate contentKey="carcare.insurance.number">Station</Translate>
                                            </Label>
                                            <AvField
                                                id="insurance-number"
                                                type="text"
                                                name="number"
                                                validate={{
                                                    maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                                                }}
                                            />
                                        </AvGroup>
                                        <AvGroup>
                                            <Label id="validThruLabel" for="validThru">
                                                <Translate contentKey="carcare.insurance.valid-thru">Date</Translate>
                                            </Label>
                                            <AvField
                                                id="insurance-validThru"
                                                type="date"
                                                className="form-control"
                                                name="validThru"
                                                validate={{
                                                    required: { value: true, errorMessage: translate('entity.validation.required') }
                                                }}
                                            />
                                        </AvGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <AvGroup>
                                            <Label id="detailsLabel" for="details">
                                                <Translate contentKey="carcare.insurance.details">Details</Translate>
                                            </Label>
                                            <AvField
                                                id="insurance-details"
                                                type="textarea"
                                                rows="5"
                                                name="details"
                                                validate={{
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
    insuranceEntity: storeState.insurances.insurance,
    insuranceTypes: storeState.insurances.insuranceTypes,
    loading: storeState.insurances.loading,
    updating: storeState.insurances.updating,
    updateSuccess: storeState.insurances.updateSuccess
});

const mapDispatchToProps = {
    getInsurance,
    updateInsurance,
    createInsurance,
    reset,
    getInsuranceTypes
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InsuranceUpdate);
