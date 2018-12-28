import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import {
  Translate,
  TextFormat
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_LOCAL_DATE_FORMAT, APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT_ALWAYS } from 'app/config/constants';
import { IRootState } from 'app/shared/reducers';
import { getRefuels } from './refuel.reducer';

export interface IRefuelProps extends StateProps, DispatchProps, RouteComponentProps<{ vehicleId: string }> { }

export interface IRefuelUpdateState {
  vehicleId: string;
}

export class Refuel extends React.Component<IRefuelProps, IRefuelUpdateState> {
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
    this.props.getRefuels(vehicleId);
  };

  render() {
    const { refuels, totalItems, match } = this.props;
    return (
      <div>
        <h2 id="user-management-page-heading">
          {/* <Translate contentKey="userManagement.home.title">Users</Translate> */}
          Refuels
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity">
            {/* <FontAwesomeIcon icon="plus" /> <Translate contentKey="userManagement.home.createLabel">Add new refuel</Translate> */}
            <FontAwesomeIcon icon="plus" /> Add new refuel
          </Link>
        </h2>
        <Table responsive striped>
          <thead>
            <tr>
              <th>
                Date
                {/* <Translate contentKey="global.field.id">Date</Translate> */}
              </th>
              <th>
                Mileage (km)
                {/* <Translate contentKey="userManagement.login">Mileage</Translate> */}
              </th>
              <th >
                Volume (dm3)
                {/* <Translate contentKey="userManagement.email">Volume</Translate> */}
              </th>
              <th>
                Cost (PLN)
                {/* <Translate contentKey="userManagement.langKey">Cost</Translate> */}
              </th>
              <th>
                Unit cost (PLN/dm3)
                {/* <Translate contentKey="userManagement.langKey">Cost</Translate> */}
              </th>
              <th>
                Station
                {/* <Translate contentKey="userManagement.langKey">Station</Translate> */}
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {refuels.map((refuel, i) => (
              <tr id={refuel.id} key={`refuel-${i}`}>
                <td>
                  <TextFormat value={refuel.vehicleEvent.date} type="date" format={APP_LOCAL_DATE_FORMAT} blankOnInvalid />
                </td>
                <td>{refuel.vehicleEvent.mileage}</td>
                <td>
                  <TextFormat value={refuel.volume / 1000} type="number" format={APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT_ALWAYS} blankOnInvalid />
                </td>
                <td>
                  <TextFormat value={refuel.costInCents / 100} type="number" format={APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT_ALWAYS} blankOnInvalid />
                </td>
                <td>
                  <TextFormat value={(refuel.costInCents / 100) / (refuel.volume / 1000)} type="number" format={APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT_ALWAYS} blankOnInvalid />
                </td>
                <td>{refuel.station}</td>
                <td className="text-right">
                  <div className="btn-group flex-btn-group-container">
                    <Button tag={Link} to={`${match.url}/${refuel.id}/edit`} color="primary" size="sm">
                      <FontAwesomeIcon icon="pencil-alt" />{' '}
                      <span className="d-none d-md-inline">
                        <Translate contentKey="entity.action.edit">Edit</Translate>
                      </span>
                    </Button>
                    <Button
                      tag={Link}
                      to={`${match.url}/${refuel.id}/delete`}
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
        <p>
          {/* <Translate contentKey=""> Number of elements: </Translate> */}
          Number of elements:&nbsp;
          {totalItems}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  refuels: storeState.refuels.refuels,
  totalItems: storeState.refuels.totalItems
});

const mapDispatchToProps = { getRefuels };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Refuel);
