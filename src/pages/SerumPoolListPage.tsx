import React from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import SerumPoolList from "../components/SerumPoolList";

const SerumPoolListPage: React.FC = () => {
  return (
    <div>
      <Breadcrumbs />
      <SerumPoolList />
    </div>
  );
};

export default SerumPoolListPage;
