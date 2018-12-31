import './home.css';

import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSession } from 'app/shared/reducers/authentication';

export interface IHomeProp extends StateProps, DispatchProps { }

export class Home extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    return (
      <Redirect to="/app" />
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
