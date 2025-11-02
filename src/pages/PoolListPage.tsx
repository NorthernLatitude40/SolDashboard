import React from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import PoolList from "../components/PoolList";

const PoolListPage: React.FC = () => {
  return (
    <div>
      <Breadcrumbs />
      <PoolList />
    </div>
  );
};

export default PoolListPage;
