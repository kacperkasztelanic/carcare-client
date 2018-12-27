import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getRefuel, updateRefuel, createRefuel, reset } from './refuel.reducer';

export interface IRefuelUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string, vehicleId: string }> { }

export interface IRefuelUpdateState {
    isNew: boolean;
    vehicleId: string;
}

export class RefuelUpdate extends React.Component<IRefuelUpdateProps, IRefuelUpdateState> {
    constructor(props) {
        super(props);
        this.state = {
            vehicleId: this.props.match.params.vehicleId,
            isNew: !this.props.match.params || !this.props.match.params.id
        };
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
            this.handleClose();
        }
    }

    componentDidMount() {
        if (this.state.isNew) {
            this.props.reset();
        } else {
            this.props.getRefuel(this.props.match.params.id);
        }
    }

    saveEntity = (event, errors, values) => {
        if (errors.length === 0) {
            const { refuelEntity } = this.props;
            const entity = {
                ...refuelEntity,
                ...this.state,
                ...values
            };

            if (this.state.isNew) {
                this.props.createRefuel(entity);
            } else {
                this.props.updateRefuel(entity);
            }
        }
    };

    handleClose = () => {
        this.props.history.push(`/carcare/refuel/${this.state.vehicleId}`);
    };

    render() {
        const { refuelEntity, loading, updating } = this.props;
        const { isNew } = this.state;

        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="8">
                        <h2 id="sandboxApp.author.home.createOrEditLabel">
                            {/* <Translate contentKey="sandboxApp.author.home.createOrEditLabel">Create or edit a Author</Translate> */}
                            Create or edit a refuel
                        </h2>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                                <AvForm model={isNew ? {} : refuelEntity} onSubmit={this.saveEntity}>
                                    {!isNew ? (
                                        <AvGroup>
                                            <Label for="id">
                                                <Translate contentKey="global.field.id">ID</Translate>
                                            </Label>
                                            <AvInput id="refuel-id" type="text" className="form-control" name="id" required readOnly />
                                        </AvGroup>
                                    ) : null}
                                    <AvGroup>
                                        <Label id="StationLabel" for="station">
                                            {/* <Translate contentKey="sandboxApp.author.name">Name</Translate> */}
                                            Station
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
                                        <Label id="dateLabel" for="vehicleEvent.date">
                                            {/* <Translate contentKey="sandboxApp.author.birthDate">Birth Date</Translate> */}
                                            Date
                                        </Label>
                                        <AvField
                                            id="refuel-date"
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
                                            {/* <Translate contentKey="sandboxApp.author.birthDate">Birth Date</Translate> */}
                                            Mileage
                                        </Label>
                                        <AvField
                                            id="refuel-mileage"
                                            type="text"
                                            name="vehicleEvent.mileage"
                                            validate={{
                                                required: { value: true, errorMessage: translate('entity.validation.required') },
                                                min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) }
                                            }}
                                        />
                                    </AvGroup>
                                    <AvGroup>
                                        <Label id="volumeLabel" for="volume">
                                            {/* <Translate contentKey="sandboxApp.author.birthDate">Birth Date</Translate> */}
                                            Volume
                                        </Label>
                                        <AvField
                                            id="refuel-volume"
                                            type="text"
                                            name="volume"
                                            validate={{
                                                required: { value: true, errorMessage: translate('entity.validation.required') },
                                                min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) }
                                            }}
                                        />
                                    </AvGroup>
                                    <AvGroup>
                                        <Label id="costLabel" for="cost">
                                            {/* <Translate contentKey="sandboxApp.author.birthDate">Birth Date</Translate> */}
                                            Cost
                                        </Label>
                                        <AvField
                                            id="refuel-cost"
                                            type="text"
                                            name="costInCents"
                                            validate={{
                                                required: { value: true, errorMessage: translate('entity.validation.required') },
                                                min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) }
                                            }}
                                        />
                                    </AvGroup>
                                    <Button tag={Link} id="cancel-save" to={`/carcare/refuel/${this.state.vehicleId}`} replace color="info">
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
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (storeState: IRootState) => ({
    refuelEntity: storeState.refuels.refuel,
    loading: storeState.refuels.loading,
    updating: storeState.refuels.updating,
    updateSuccess: storeState.refuels.updateSuccess
});

const mapDispatchToProps = {
    getRefuel,
    updateRefuel,
    createRefuel,
    reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RefuelUpdate);
