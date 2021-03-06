import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_LOCAL_DATE_FORMAT, APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT_ALWAYS, APP_COMPACT_DETAILS_LENGTH } from 'app/config/constants';
import { IRootState } from 'app/shared/reducers';
import { getInspections } from './inspection.reducer';
import TableSummary from 'app/shared/components/TableSummary';
import BackButton from 'app/shared/components/BackButton';

export interface IInspectionProps extends StateProps, DispatchProps, RouteComponentProps<{ vehicleId: string }> { }

export interface IInspectionUpdateState {
  vehicleId: string;
  openPopovers: number[];
}

export class Inspection extends React.Component<IInspectionProps, IInspectionUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      vehicleId: this.props.match.params.vehicleId,
      openPopovers: []
    };
  }

  toggleDetailsPopover = (id: number) => {
    this.setState({
      openPopovers: this.state.openPopovers.includes(id) ?
        [...this.state.openPopovers].filter(x => x !== id) : [...this.state.openPopovers, id]
    });
  }

  isDetailsPopoverOpen = (id: number) => this.state.openPopovers.includes(id);

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  componentDidMount() {
    this.getInspections(this.state.vehicleId);
  }

  getInspections = vehicleId => {
    this.props.getInspections(vehicleId);
  };

  render() {
    const { inspections, totalItems, match } = this.props;
    return (
      <div>
        <h2 id="user-management-page-heading">
          <FontAwesomeIcon icon="check-double" />{' '}
          <Translate contentKey="carcare.inspection.title">Inspections</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity">
            <FontAwesomeIcon icon="plus" /> <Translate contentKey="carcare.common.add">Add</Translate>
          </Link>
        </h2>
        <Table responsive striped>
          <thead>
            <tr>
              <th>#</th>
              <th>
                <Translate contentKey="carcare.common.date">Date</Translate>
              </th>
              <th>
                <Translate contentKey="carcare.common.mileage" interpolate={{ unit: 'km' }}>Mileage (km)</Translate>
              </th>
              <th>
                <Translate contentKey="carcare.common.cost" interpolate={{ unit: 'PLN' }}>Cost (PLN)</Translate>
              </th>
              <th>
                <Translate contentKey="carcare.inspection.valid-thru">Valid thru</Translate>
              </th>
              <th>
                <Translate contentKey="carcare.inspection.station">Station</Translate>
              </th>
              <th>
                <Translate contentKey="carcare.inspection.details">Details</Translate>
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {inspections.map((inspection, i) => (
              <tr id={inspection.id} key={`inspection-${i}`}>
                <th>{i + 1}</th>
                <td>
                  <TextFormat value={inspection.vehicleEvent.date} type="date" format={APP_LOCAL_DATE_FORMAT} blankOnInvalid />
                </td>
                <td>{inspection.vehicleEvent.mileage}</td>
                <td>
                  <TextFormat value={inspection.costInCents} type="number" format={APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT_ALWAYS} blankOnInvalid />
                </td>
                <td>
                  <TextFormat value={inspection.validThru} type="date" format={APP_LOCAL_DATE_FORMAT} blankOnInvalid />
                </td>
                <td>{inspection.station}</td>
                <td>
                  <Button id={`details-popover-${i}`} type="button" color="info" onClick={() => this.toggleDetailsPopover(i)}>
                    <FontAwesomeIcon icon="search" />
                  </Button>{' '}
                  <span className="d-none d-md-inline">
                    {inspection.details.slice(0, APP_COMPACT_DETAILS_LENGTH - 3) + (inspection.details.length > APP_COMPACT_DETAILS_LENGTH ? '...' : '')}
                  </span>
                  <Popover placement="right" isOpen={this.isDetailsPopoverOpen(i)} target={`details-popover-${i}`}>
                    <PopoverHeader><Translate contentKey="carcare.inspection.details">Details</Translate></PopoverHeader>
                    <PopoverBody style={{ whiteSpace: 'pre-wrap' }}>{inspection.details}</PopoverBody>
                  </Popover>
                </td>
                <td className="text-right">
                  <div className="btn-group flex-btn-group-container">
                    <Button tag={Link} to={`${match.url}/${inspection.id}/edit`} color="primary" size="sm">
                      <FontAwesomeIcon icon="pencil-alt" />{' '}
                      <span className="d-none d-md-inline">
                        <Translate contentKey="entity.action.edit">Edit</Translate>
                      </span>
                    </Button>
                    <Button
                      tag={Link}
                      to={`${match.url}/${inspection.id}/delete`}
                      color="danger"
                      size="sm"
                    >
                      <FontAwesomeIcon icon="trash" />{' '}
                      <span className="d-none d-md-inline">
                        <Translate contentKey="entity.action.delete">Delete</Translate>
                      </span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <TableSummary totalItems={totalItems} />
        <BackButton handleFunction={this.handleClose} />
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  inspections: storeState.inspections.inspections,
  totalItems: storeState.inspections.totalItems
});

const mapDispatchToProps = { getInspections };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inspection);
