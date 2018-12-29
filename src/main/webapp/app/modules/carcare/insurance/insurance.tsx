import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_LOCAL_DATE_FORMAT, APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT_ALWAYS, APP_COMPACT_DETAILS_LENGTH } from 'app/config/constants';
import { IRootState } from 'app/shared/reducers';
import { getInsurances } from './insurance.reducer';
import TableSummary from 'app/shared/components/TableSummary';

export interface IInsuranceProps extends StateProps, DispatchProps, RouteComponentProps<{ vehicleId: string }> { }

export interface IInsuranceUpdateState {
  vehicleId: string;
  detailsPopoverOpen: boolean;
}

export class Insurance extends React.Component<IInsuranceProps, IInsuranceUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      vehicleId: this.props.match.params.vehicleId,
      detailsPopoverOpen: false
    };
  }

  toogleDetailsPopover = () => {
    this.setState({
      detailsPopoverOpen: !this.state.detailsPopoverOpen
    });
  }

  componentDidMount() {
    this.getInsurances(this.state.vehicleId);
  }

  getInsurances = vehicleId => {
    this.props.getInsurances(vehicleId);
  };

  render() {
    const { insurances, totalItems, match } = this.props;
    return (
      <div>
        <h2 id="user-management-page-heading">
          <Translate contentKey="carcare.insurance.title">Insurances</Translate>
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
                <Translate contentKey="carcare.insurance.type">Type</Translate>
              </th>
              <th>
                <Translate contentKey="carcare.insurance.valid-from">Valid from</Translate>
              </th>
              <th>
                <Translate contentKey="carcare.insurance.valid-thru">Valid thru</Translate>
              </th>
              <th>
                <Translate contentKey="carcare.common.cost" interpolate={{ unit: 'PLN' }}>Cost (PLN)</Translate>
              </th>
              <th>
                <Translate contentKey="carcare.insurance.insurer">Insurer</Translate>
              </th>
              <th>
                <Translate contentKey="carcare.insurance.number">Number</Translate>
              </th>
              <th>
                <Translate contentKey="carcare.insurance.details">Details</Translate>
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {insurances.map((insurance, i) => (
              <tr id={insurance.id} key={`insurance-${i}`}>
                <th>{i + 1}</th>
                <td>
                  <TextFormat value={insurance.vehicleEvent.date} type="date" format={APP_LOCAL_DATE_FORMAT} blankOnInvalid />
                </td>
                <td>{insurance.vehicleEvent.mileage}</td>
                <td>{insurance.insuranceType}</td>
                <td>
                  <TextFormat value={insurance.validFrom} type="date" format={APP_LOCAL_DATE_FORMAT} blankOnInvalid />
                </td>
                <td>
                  <TextFormat value={insurance.validThru} type="date" format={APP_LOCAL_DATE_FORMAT} blankOnInvalid />
                </td>
                <td>
                  <TextFormat value={insurance.costInCents / 100} type="number" format={APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT_ALWAYS} blankOnInvalid />
                </td>
                <td>{insurance.insurer}</td>
                <td>{insurance.number}</td>
                <td>
                  <Button id="details-popover" type="button" outline color="info" onClick={this.toogleDetailsPopover}>
                    <span className="d-none d-md-inline">
                      {insurance.details.slice(0, APP_COMPACT_DETAILS_LENGTH - 3) + (insurance.details.length > APP_COMPACT_DETAILS_LENGTH ? '...' : '')}
                    </span>
                    <span className="d-sd-inline d-md-none"><FontAwesomeIcon icon="question" /></span>
                  </Button>
                  <Popover placement="right" isOpen={this.state.detailsPopoverOpen} target="details-popover">
                    <PopoverHeader><Translate contentKey="carcare.insurance.details">Details</Translate></PopoverHeader>
                    <PopoverBody style={{ whiteSpace: 'pre-wrap' }}>{insurance.details}</PopoverBody>
                  </Popover>
                </td>
                <td className="text-right">
                  <div className="btn-group flex-btn-group-container">
                    <Button tag={Link} to={`${match.url}/${insurance.id}/edit`} color="primary" size="sm">
                      <FontAwesomeIcon icon="pencil-alt" />{' '}
                      <span className="d-none d-md-inline">
                        <Translate contentKey="entity.action.edit">Edit</Translate>
                      </span>
                    </Button>
                    <Button
                      tag={Link}
                      to={`${match.url}/${insurance.id}/delete`}
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
  insurances: storeState.insurances.insurances,
  totalItems: storeState.insurances.totalItems
});

const mapDispatchToProps = { getInsurances };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Insurance);
