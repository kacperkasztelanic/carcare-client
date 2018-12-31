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

export class VehicleDetails extends React.Component<IVehicleUpdateProps, IVehicleUpdateState> {
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
        return (<div>
            <Button id="go-back" onClick={this.handleClose} color="info">
                <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                </span>
            </Button>
        </div>
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
)(VehicleDetails);
