import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getVehicle, deleteVehicle } from './vehicle.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IVehicleDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class VehicleDeleteDialog extends React.Component<IVehicleDeleteDialogProps> {
  componentDidMount() {
    this.props.getVehicle(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteVehicle(this.props.vehicle.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody>
          <Translate contentKey="carcare.vehicle.delete.question">
            Are you sure you want to delete this vehicle?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  vehicle: storeState.vehicles.vehicle
});

const mapDispatchToProps = { getVehicle, deleteVehicle };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VehicleDeleteDialog);
