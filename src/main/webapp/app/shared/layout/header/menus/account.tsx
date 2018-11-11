import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from '../header-components';

const accountMenuItemsAuthenticated = (
  <>
    <DropdownItem tag={Link} to="/account/settings">
      <FontAwesomeIcon icon="wrench" /> <Translate contentKey="global.menu.account.settings">Settings</Translate>
    </DropdownItem>
    <DropdownItem tag={Link} to="/account/password">
      <FontAwesomeIcon icon="clock" /> <Translate contentKey="global.menu.account.password">Password</Translate>
    </DropdownItem>
    <DropdownItem tag={Link} to="/logout">
      <FontAwesomeIcon icon="sign-out-alt" /> <Translate contentKey="global.menu.account.logout">Sign out</Translate>
    </DropdownItem>
  </>
);

export const AccountMenu = ({ isAuthenticated = false }) => (
  isAuthenticated ? (<NavDropdown icon="user" name={translate('global.menu.account.main')} id="account-menu">
    {accountMenuItemsAuthenticated}
  </NavDropdown>) : null
);

export default AccountMenu;
