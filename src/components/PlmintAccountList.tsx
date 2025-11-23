import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPlmintAccounts } from "../services/api";

const PlmintAccountList: React.FC = () => {
  const { addr } = useParams<{ addr: string }>();
  const [pools, setPools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const load = async () => {
      if (!addr) return;
      try {
        const data = await fetchPlmintAccounts(addr); // 自己實現的接口
        setPools(data);
      } catch (err) {
        console.error("获取池数据失败", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [addr]);

  if (loading) return <div>加载中...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-indigo-500">
        Account List
      </h1>
      <div>
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-500">
        Overview
      </h2>
      <table className="min-w-full bg-white rounded-2xl shadow">
        <thead>
          <tr className="bg-indigo-100 text-gray-600 text-sm">
            <th className="py-3 px-4 text-left">address</th>
            <th className="py-3 px-4 text-left">uiAmount</th>
            <th className="py-3 px-4 text-left">decimals</th>
            <th className="py-3 px-4 text-left">amount</th>
            <th className="py-3 px-4 text-left">uiAmountString</th>
          </tr>
        </thead>
        <tbody>
          {pools.map((p, i) => (
            <tr key={i} className="border-t hover:bg-gray-50 transition">
              <td className="py-2 px-4 font-mono text-xs">{p.address}</td>
              <td className="py-2 px-4 font-mono text-xs">{p.uiAmount}</td>
              <td className="py-2 px-4 font-mono text-xs">{p.decimals}</td>
              <td className="py-2 px-4 font-mono text-xs">{p.amount}</td>
              <td className="py-2 px-4 font-mono text-xs">{p.uiAmountString}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
     
    </div>
  );
};

export default PlmintAccountList;
