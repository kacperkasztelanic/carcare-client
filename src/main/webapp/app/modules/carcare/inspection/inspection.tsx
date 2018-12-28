import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_LOCAL_DATE_FORMAT, APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT_ALWAYS } from 'app/config/constants';
import { IRootState } from 'app/shared/reducers';
import { getInspections } from './inspection.reducer';
import TableSummary from 'app/shared/components/TableSummary';

export interface IInspectionProps extends StateProps, DispatchProps, RouteComponentProps<{ vehicleId: string }> { }

export interface IInspectionUpdateState {
  vehicleId: string;
}

export class Inspection extends React.Component<IInspectionProps, IInspectionUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      vehicleId: this.props.match.params.vehicleId
    };
  }

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
          <Translate contentKey="carcare.inspection.title">Inspections</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity">
            <FontAwesomeIcon icon="plus" /> <Translate contentKey="carcare.common.add">Add</Translate>
          </Link>
        </h2>
        <Table responsive striped>
          <thead>
            <tr>
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
                <td>
                  <TextFormat value={inspection.vehicleEvent.date} type="date" format={APP_LOCAL_DATE_FORMAT} blankOnInvalid />
                </td>
                <td>{inspection.vehicleEvent.mileage}</td>
                <td>
                  <TextFormat value={inspection.costInCents / 100} type="number" format={APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT_ALWAYS} blankOnInvalid />
                </td>
                <td>
                  <TextFormat value={inspection.validThru} type="date" format={APP_LOCAL_DATE_FORMAT} blankOnInvalid />
                </td>
                <td>{inspection.station}</td>
                <td>{inspection.details}</td>
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
