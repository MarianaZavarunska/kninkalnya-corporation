import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { HeaderComponent } from '../Header/Header';
import { FooterComponent } from '../Footer/Footer';

const LayoutComponent: FC = () => {
  return (
    <section>
      <HeaderComponent />
      <div style={{ marginTop: '100px' }}>
        <Outlet />
      </div>
      <FooterComponent />
    </section>
  );
};

export { LayoutComponent };
