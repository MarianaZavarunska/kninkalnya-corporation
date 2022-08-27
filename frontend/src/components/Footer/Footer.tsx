import { FacebookOutlined, InstagramOutlined } from '@ant-design/icons';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Layout, Popover } from 'antd';

import './Footer.css';
import { FooterModal } from '../FooterModal/FooterModal';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { useAppDispatch } from '../../hooks/redux';
import { setReviewActive } from '../../store';

const { Footer } = Layout;

const FooterComponent: FC = () => {
  const dispatch = useAppDispatch();
  const content = (
    <div>
      <p>
        <b>Address</b>: Stryiska St, 45, Lviv, Lviv Oblast, 79000
      </p>
      <p>
        <b>Phone</b>: 096 040 4007
      </p>
      <p>
        <b>Order:</b> glovoapp.com
      </p>
    </div>
  );

  return (
    <Footer className={'footer'}>
      <div className={'footer-item-1'}>
        <div>
          {' '}
          <Link to={'restaurants'}>Наші ресторани</Link>
        </div>
        <div>
          <Link to={'about'}>Про нас</Link>
        </div>
      </div>
      <div className={'footer-item-2'}>
        <div>
          <Popover content={content} title="Контакти">
            <Button className="popover-btn">Контакти</Button>
          </Popover>
        </div>
        <div>Політика конфеденційності</div>
        <Link to={'delivery'} className={'delivery-btn'}>
          Доставка і оплата
        </Link>
      </div>
      <div className={'footer-item-3'}>
        <div onClick={() => dispatch(setReviewActive())}>Залишити відгук</div>
        <div>Ви можете знайти нас:</div>
        <div className={'icons-container'}>
          <a
            href={'https://www.facebook.com/khinkalnya'}
            className="icon instagram"
          >
            <span className="tooltip">Instagram</span>
            <InstagramOutlined style={{ fontSize: '32px' }} />
          </a>
          <a
            href={'https://www.instagram.com/khinkalnya_fedorova/'}
            className="icon facebook"
          >
            <span className="tooltip">Facebook</span>
            <FacebookOutlined style={{ fontSize: '32px' }} />
          </a>
        </div>
        <div className="payment">
          <img
            src="/image-for-footer/visa.svg"
            alt="visa"
            width={'50px'}
            height={'30px'}
          />
          <img
            src="/image-for-footer/mastercard.svg"
            alt="mastercard"
            width={'50px'}
            height={'30px'}
          />
        </div>
      </div>
      <FooterModal>
        <ReviewForm />
      </FooterModal>
    </Footer>
  );
};

export { FooterComponent };
