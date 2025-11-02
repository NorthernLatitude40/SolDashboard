// src/pages/PoolListPage.tsx
import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import PoolList from '../components/SerumList';

const SerumListPage: React.FC = () => {
  return (
    <div>
      <Breadcrumbs />
      <PoolList />
    </div>
  );
};

export default SerumListPage;