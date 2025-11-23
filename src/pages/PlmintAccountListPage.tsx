import React from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import PlmintAccountList from "../components/PlmintAccountList";

const PlmintAccountListPage: React.FC = () => {
  return (
    <div>
      <Breadcrumbs />
      <PlmintAccountList />
    </div>
  );
};

export default PlmintAccountListPage;
