import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getVehicles, openDetails } from './vehicle.reducer';
import TableSummary from 'app/shared/components/TableSummary';
import { IVehicle } from 'app/shared/model/vehicle.model';

export interface IVehicleProps extends StateProps, DispatchProps, RouteComponentProps<{}> { }

export class Vehicle extends React.Component<IVehicleProps> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getVehicles();
  }

  handleClick = (vehicle: IVehicle) => {
    this.props.openDetails();
    this.props.history.push(`${this.props.match.url}/details/${vehicle.id}`);
  };

  handleButtonColumn = event => {
    event.stopPropagation();
  };

  render() {
    const { vehicles, totalItems, match } = this.props;
    return (
      <div>
        <h2 id="user-management-page-heading">
          <FontAwesomeIcon icon="car" />{' '}
          <Translate contentKey="carcare.vehicle.title">Vehicles</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity">
            <FontAwesomeIcon icon="plus" /> <Translate contentKey="carcare.common.add">Add</Translate>
          </Link>
        </h2>
        <Table responsive className="table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>
                <Translate contentKey="carcare.vehicle-details.image">Image</Translate>
              </th>
              <th>
                <Translate contentKey="carcare.vehicle.license-plate">License Plate</Translate>
              </th>
              <th>
                <Translate contentKey="carcare.vehicle.make">Make</Translate>
              </th>
              <th >
                <Translate contentKey="carcare.vehicle.model">Model</Translate>
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, i) => (
              <tr id={vehicle.id} key={`vehicle-${i}`} className="hand" onClick={this.handleClick.bind(this, vehicle)}>
                <th>{i + 1}</th>
                <td>
                  <img src={`data:${vehicle.vehicleDetails.imageContentType};base64,${vehicle.vehicleDetails.image}`} style={{ maxHeight: '90px' }} />
                </td>
                <td>{vehicle.licensePlate}</td>
                <td>{vehicle.make}</td>
                <td>{vehicle.model}</td>
                <td className="text-right" style={{ cursor: 'default' }} onClick={this.handleButtonColumn}>
                  <div className="btn-group flex-btn-group-container">
                    <Button
                      tag={Link}
                      to={`${match.url}/${vehicle.id}/delete`}
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
  vehicles: storeState.vehicles.vehicles,
  totalItems: storeState.vehicles.totalItems
});

const mapDispatchToProps = { getVehicles, openDetails };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Vehicle);
