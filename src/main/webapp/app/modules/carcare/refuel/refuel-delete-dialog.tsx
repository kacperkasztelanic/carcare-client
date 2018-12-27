import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getRefuel, deleteRefuel } from './refuel.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IRefuelDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> { }

export class RefuelDeleteDialog extends React.Component<IRefuelDeleteDialogProps> {
  componentDidMount() {
    this.props.getRefuel(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteRefuel(this.props.refuel.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { refuel } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody>
          <Translate contentKey="userManagement.delete.question" interpolate={{ id: refuel.id }}>
            Are you sure you want to delete this User?
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
  refuel: storeState.refuels.refuel
});

const mapDispatchToProps = { getRefuel, deleteRefuel };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RefuelDeleteDialog);
