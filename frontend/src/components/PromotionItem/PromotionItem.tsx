import React, { FC } from 'react';
import { IPromotion } from '../../interfaces/promotion.interface';
import 'antd/dist/antd.css';

const PromotionItem: FC<{ promotion: IPromotion }> = ({ promotion }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '10px',
      }}
    >
      <div>
        <img
          src={promotion.image}
          width={'800px'}
          height={'500px'}
          alt="promImage"
        />
      </div>
      <div>
        <h2>{promotion.descriptions}</h2>
      </div>
    </div>
  );
};

export { PromotionItem };
