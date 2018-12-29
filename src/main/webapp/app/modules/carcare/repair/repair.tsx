import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_LOCAL_DATE_FORMAT, APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT_ALWAYS } from 'app/config/constants';
import { IRootState } from 'app/shared/reducers';
import { getRepairs } from './repair.reducer';
import TableSummary from 'app/shared/components/TableSummary';

export interface IRepairProps extends StateProps, DispatchProps, RouteComponentProps<{ vehicleId: string }> { }

export interface IRepairUpdateState {
  vehicleId: string;
}

export class Refuel extends React.Component<IRepairProps, IRepairUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      vehicleId: this.props.match.params.vehicleId
    };
  }

  componentDidMount() {
    this.getRefuels(this.state.vehicleId);
  }

  getRefuels = vehicleId => {
    this.props.getRepairs(vehicleId);
  };

  render() {
    const { repairs, totalItems, match } = this.props;
    return (
      <div>
        <h2 id="user-management-page-heading">
          <Translate contentKey="carcare.repair.title">Refuels</Translate>
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
                <Translate contentKey="carcare.repair.station">Station</Translate>
              </th>
              <th>
                <Translate contentKey="carcare.repair.details">Details</Translate>
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {repairs.map((repair, i) => (
              <tr id={repair.id} key={`repair-${i}`}>
                <th>{i + 1}</th>
                <td>
                  <TextFormat value={repair.vehicleEvent.date} type="date" format={APP_LOCAL_DATE_FORMAT} blankOnInvalid />
                </td>
                <td>{repair.vehicleEvent.mileage}</td>
                <td>
                  <TextFormat value={repair.costInCents / 100} type="number" format={APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT_ALWAYS} blankOnInvalid />
                </td>
                <td>{repair.station}</td>
                <td>{repair.details}</td>
                <td className="text-right">
                  <div className="btn-group flex-btn-group-container">
                    <Button tag={Link} to={`${match.url}/${repair.id}/edit`} color="primary" size="sm">
                      <FontAwesomeIcon icon="pencil-alt" />{' '}
                      <span className="d-none d-md-inline">
                        <Translate contentKey="entity.action.edit">Edit</Translate>
                      </span>
                    </Button>
                    <Button
                      tag={Link}
                      to={`${match.url}/${repair.id}/delete`}
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
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  repairs: storeState.repairs.repairs,
  totalItems: storeState.repairs.totalItems
});

const mapDispatchToProps = { getRepairs };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Refuel);
