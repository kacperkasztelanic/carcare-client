import React from 'react';
import { Translate, translate } from 'react-jhipster';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Alert, Row, Col } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom';

export interface ILoginComponentProps {
  loginError: boolean;
  handleLogin: Function;
}

class LoginComponent extends React.Component<ILoginComponentProps> {
  handleSubmit = (event, errors, { username, password, rememberMe }) => {
    const { handleLogin } = this.props;
    handleLogin(username, password, rememberMe);
  };

  render() {
    const { loginError } = this.props;

    return (
      <div>
        <AvForm onSubmit={this.handleSubmit}>
          <Row>
            <Col md="6" sd="12">
              <h1 id="login-title">
                <Translate contentKey="login.title">Sign in</Translate>
              </h1>
              {loginError ? (
                <Alert color="danger">
                  <Translate contentKey="login.messages.error.authentication">
                    <strong>Failed to sign in!</strong> Please check your credentials and try again.
                    </Translate>
                </Alert>
              ) : null}
              <AvField
                name="username"
                label={translate('global.form.username')}
                placeholder={translate('global.form.username.placeholder')}
                required
                errorMessage="Username cannot be empty!"
                autoFocus
              />
              <AvField
                name="password"
                type="password"
                label={translate('login.form.password')}
                placeholder={translate('login.form.password.placeholder')}
                required
                errorMessage="Password cannot be empty!"
              />
              <AvGroup check inline>
                <Label className="form-check-label">
                  <AvInput type="checkbox" name="rememberMe" /> <Translate contentKey="login.form.rememberme">Remember me</Translate>
                </Label>
              </AvGroup>
              <div className="mt-1">&nbsp;</div>
              <Button color="primary" type="submit">
                <Translate contentKey="login.form.button">Sign in</Translate>
              </Button>
              <div className="mt-1">&nbsp;</div>
              <Alert color="warning">
                <span>
                  <Translate contentKey="login.password.forgot">Did you forget your password?</Translate>
                </span>{' '}
                <Link to="/reset/request">
                  <Translate contentKey="login.password.reset">Reset password</Translate>
                </Link>
              </Alert>
              <Alert color="warning">
                <span>
                  <Translate contentKey="global.messages.info.register.noaccount">You don't have an account yet?</Translate>
                </span>{' '}
                <Link to="/register">
                  <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>
                </Link>
              </Alert>
            </Col>
            <Col md="6" className="d-none d-md-block">
              <span className="hipster rounded" />
            </Col>
          </Row>
        </AvForm>
      </div>
    );
  }
}

export default LoginComponent;
