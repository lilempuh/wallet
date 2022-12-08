import React, { useState } from 'react';
// import Logo from 'components/Logo/Logo';
import {
  AppHeader,
  LogoWrapper,
  LogoImg,
  LogoText,
  HeaderNav,
  HeaderNavItem,
  HeaderWrapper,
  StyledIconExit,
  ExitText,
  ButtonLogout,
  WrapperLogo,
} from './Header.styled';
import ModalLogout from 'components/ModalLogout';
import Logo from 'components/Logo/Logo';

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const TestClick = event => {
    event.preventDefault();
  };

  return (
    <AppHeader>
      <HeaderWrapper>
        <WrapperLogo>
          <Logo />
        </WrapperLogo>

        <HeaderNav>
          <HeaderNavItem>Name</HeaderNavItem>
          <HeaderNavItem>
            <ButtonLogout
              onClick={() => {
                setModalOpen(true);
              }}
            >
              <StyledIconExit />
              <ExitText>Exit</ExitText>
            </ButtonLogout>
          </HeaderNavItem>
          {modalOpen && <ModalLogout setModalOpen={setModalOpen} />}
        </HeaderNav>
      </HeaderWrapper>
    </AppHeader>
  );
};

export default Header;
