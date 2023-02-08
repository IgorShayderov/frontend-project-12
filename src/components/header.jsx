import React from 'react';
import { Nav } from 'react-bootstrap';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { useAuth } from './auth-provider.jsx';

const Header = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const handleSignOut = () => {
    auth.signOut();
  };

  const signOutClasses = cn('me-2', {
    'd-none': auth.currentUser === null,
  });

  return (
    <Nav className="justify-content-between border-bottom header">
      <Nav.Item>
        <Nav.Link href="/">
          Hexlet Chat
        </Nav.Link>
      </Nav.Item>

      <Nav.Item className={signOutClasses}>
        <Nav.Link href="#" onClick={handleSignOut}>
          { t('header.signOut') }
        </Nav.Link>
      </Nav.Item>
    </Nav>

  );
};

export default Header;
