import React from 'react';
import { Nav } from 'react-bootstrap';
import cn from 'classnames';

import { useAuth } from './auth-provider.jsx';

const Header = () => {
  const auth = useAuth();
  const handleSignOut = () => {
    auth.signOut();
  };

  const signOutClasses = cn('me-2', {
    'd-none': auth.currentUser === null,
  });

  return (
    <Nav className="justify-content-between border-bottom">
      <Nav.Item>
        <Nav.Link href="/">
          Hexlet chat
        </Nav.Link>
      </Nav.Item>

      <Nav.Item className={signOutClasses}>
        <Nav.Link href="#" onClick={handleSignOut}>
          Sign out
        </Nav.Link>
      </Nav.Item>
    </Nav>

  );
};

export default Header;
