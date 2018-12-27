import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getVehicle, updateVehicle, createVehicle, reset } from './vehicle.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IVehicleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> { }

export interface IVehicleUpdateState {
    isNew: boolean;
}

class VehicleUpdate extends React.Component<IVehicleUpdateProps, IVehicleUpdateState> {
    state: IVehicleUpdateState = {
        isNew: !this.props.match.params || !this.props.match.params.id
    };

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
            this.handleClose();
        }
    }

    componentDidMount() {
        if (!this.state.isNew) {
            this.props.getVehicle(this.props.match.params.id);
        }
    }

    componentWillUnmount() {
        this.props.reset();
    }

    saveVehicle = (event, values) => {
        console.log(event);
        console.log(values);
        // if (errors.length === 0) {
            const { vehicle } = this.props;
            const entity = {
                ...vehicle,
                ...values
            };

            if (this.state.isNew) {
                this.props.createVehicle(entity);
            } else {
                this.props.updateVehicle(entity);
            }
    //    } 
    };

    handleClose = () => {
        this.props.history.push('/');
    };

    render() {
        const isInvalid = false;
        const { vehicle, loading, updating } = this.props;
        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="8">
                        <h1>
                            <Translate contentKey="userManagement.home.createOrEditLabel">Create or edit a Vehicle</Translate>
                        </h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                                <AvForm onValidSubmit={this.saveVehicle}>
                                    {vehicle.id ? (
                                        <AvGroup>
                                            <Label for="id">
                                                <Translate contentKey="global.field.id">ID</Translate>
                                            </Label>
                                            <AvField type="text" className="form-control" name="id" required readOnly value={vehicle.id} />
                                        </AvGroup>
                                    ) : null}
                                    <AvGroup>
                                        <Label for="make">
                                            <Translate contentKey="userManagement.login">Make</Translate>
                                        </Label>
                                        <AvField
                                            type="text"
                                            className="form-control"
                                            name="make"
                                            validate={{
                                                required: {
                                                    value: true,
                                                    errorMessage: translate('register.messages.validate.login.required')
                                                },
                                                pattern: {
                                                    value: '^[A-Za-z- ]*$',
                                                    errorMessage: translate('register.messages.validate.login.pattern')
                                                },
                                                minLength: {
                                                    value: 1,
                                                    errorMessage: translate('register.messages.validate.login.minlength')
                                                },
                                                maxLength: {
                                                    value: 50,
                                                    errorMessage: translate('register.messages.validate.login.maxlength')
                                                }
                                            }}
                                            value={vehicle.make}
                                        />
                                    </AvGroup>
                                    <AvGroup>
                                        <Label for="model">
                                            <Translate contentKey="userManagement.firstName">Model</Translate>
                                        </Label>
                                        <AvField
                                            type="text"
                                            className="form-control"
                                            name="model"
                                            validate={{
                                                required: {
                                                    value: true,
                                                    errorMessage: translate('register.messages.validate.login.required')
                                                },
                                                pattern: {
                                                    value: '^[A-Za-z0-9- ]*$',
                                                    errorMessage: translate('register.messages.validate.login.pattern')
                                                },
                                                minLength: {
                                                    value: 1,
                                                    errorMessage: translate('register.messages.validate.login.minlength')
                                                },
                                                maxLength: {
                                                    value: 50,
                                                    errorMessage: translate('entity.validation.maxlength', { max: 50 })
                                                }
                                            }}
                                            value={vehicle.model}
                                        />
                                    </AvGroup>
                                    <AvGroup>
                                        <Label for="licensePlate">
                                            <Translate contentKey="userManagement.lastName">License Plate</Translate>
                                        </Label>
                                        <AvField
                                            type="text"
                                            className="form-control"
                                            name="licensePlate"
                                            validate={{
                                                required: {
                                                    value: true,
                                                    errorMessage: translate('register.messages.validate.login.required')
                                                },
                                                pattern: {
                                                    value: '^[A-Za-z0-9- ]*$',
                                                    errorMessage: translate('register.messages.validate.login.pattern')
                                                },
                                                minLength: {
                                                    value: 1,
                                                    errorMessage: translate('register.messages.validate.login.minlength')
                                                },
                                                maxLength: {
                                                    value: 10,
                                                    errorMessage: translate('entity.validation.maxlength', { max: 10 })
                                                }
                                            }}
                                            value={vehicle.licensePlate}
                                        />
                                    </AvGroup>
                                    <Button tag={Link} to="/vehicles" replace color="info">
                                        <FontAwesomeIcon icon="arrow-left" />
                                        &nbsp;
                  <span className="d-none d-md-inline">
                                            <Translate contentKey="entity.action.back">Back</Translate>
                                        </span>
                                    </Button>
                                    &nbsp;
                <Button color="primary" type="submit" disabled={isInvalid || updating}>
                                        <FontAwesomeIcon icon="save" />
                                        &nbsp;
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
    vehicle: storeState.vehicles.vehicle,
    loading: storeState.vehicles.loading,
    updating: storeState.vehicles.updating,
    updateSuccess: storeState.vehicles.updateSuccess
});

const mapDispatchToProps = { getVehicle, updateVehicle, createVehicle, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleUpdate);
