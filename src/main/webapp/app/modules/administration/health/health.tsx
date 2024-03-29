import React from 'react';
import { connect } from 'react-redux';
import { Translate } from 'react-jhipster';
import { Table, Badge, Col, Row, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { systemHealth } from '../administration.reducer';
import HealthModal from './health-modal';

export interface IHealthPageProps extends StateProps, DispatchProps {}

export interface IHealthPageState {
  healthObject: any;
  showModal: boolean;
}

export class HealthPage extends React.Component<IHealthPageProps, IHealthPageState> {
  state: IHealthPageState = {
    healthObject: {},
    showModal: false
  };

  componentDidMount() {
    this.props.systemHealth();
  }

  getSystemHealth = () => {
    if (!this.props.isFetching) {
      this.props.systemHealth();
    }
  };

  getSystemHealthInfo = (name, healthObject) => () => {
    this.setState({
      showModal: true,
      healthObject: {
        ...healthObject,
        name
      }
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false
    });
  };

  renderModal = () => {
    const { healthObject } = this.state;
    return <HealthModal healthObject={healthObject} handleClose={this.handleClose} showModal={this.state.showModal} />;
  };

  render() {
    const { health, isFetching } = this.props;
    const data = (health || {}).components || {};
    return (
      <div>
        <h2 id="health-page-heading">Health Checks</h2>
        <p>
          <Button onClick={this.getSystemHealth} color={isFetching ? 'btn btn-danger' : 'btn btn-primary'} disabled={isFetching}>
            <FontAwesomeIcon icon="sync" />
            &nbsp;
            <Translate component="span" contentKey="health.refresh.button">
              Refresh
            </Translate>
          </Button>
        </p>
        <Row>
          <Col md="12">
            <Table bordered>
              <thead>
                <tr>
                  <th>Service Name</th>
                  <th>Status</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(data).map(
                  (configPropKey, configPropIndex) =>
                    configPropKey !== 'status' ? (
                      <tr key={configPropIndex}>
                        <td>{configPropKey}</td>
                        <td>
                          <Badge color={data[configPropKey].status !== 'UP' ? 'danger' : 'success'}>{data[configPropKey].status}</Badge>
                        </td>
                        <td>
                          {data[configPropKey].details ? (
                            <a onClick={this.getSystemHealthInfo(configPropKey, data[configPropKey])}>
                              <FontAwesomeIcon icon="eye" />
                            </a>
                          ) : null}
                        </td>
                      </tr>
                    ) : null
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        {this.renderModal()}
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  health: storeState.administration.health,
  isFetching: storeState.administration.loading
});

const mapDispatchToProps = { systemHealth };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HealthPage);
