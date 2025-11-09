import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPoolDetailByAddr } from "../services/api_serum";

const PoolListPage: React.FC = () => {
  const { addr } = useParams<{ addr: string }>();
  const [pools, setPools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!addr) return;
      try {
        const data = await fetchPoolDetailByAddr(addr); // 自己實現的接口
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
        Pool Detail
      </h1>
      <div>
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-500">
        Overview
      </h2>
      <table className="min-w-full bg-white rounded-2xl shadow">
        <thead>
          <tr className="bg-indigo-100 text-gray-600 text-sm">
            <th className="py-3 px-4 text-left">Total Value</th>
            <th className="py-3 px-4 text-left">SOL Balance</th>
            <th className="py-3 px-4 text-left">Token Balance</th>
            <th className="py-3 px-4 text-left">TVL</th>
            <th className="py-3 px-4 text-left">Volume 24h</th>
          </tr>
        </thead>
        <tbody>
          {pools.map((p, i) => (
            <tr key={i} className="border-t hover:bg-gray-50 transition">
              <td className="py-2 px-4 font-mono text-xs">{p.total_value}</td>
              <td className="py-2 px-4 font-mono text-xs">{p.token_bal}</td>
              <td className="py-2 px-4 font-mono text-xs">{p.token_bal}</td>
              <td className="py-2 px-4 font-mono text-xs">{p.tvl}</td>
              <td className="py-2 px-4 font-mono text-xs">{p._24h_vol}</td>

            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div>
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-500">
        More info
      </h2>
      <table className="min-w-full bg-white rounded-2xl shadow">
        <thead>
          <tr className="bg-indigo-100 text-gray-600 text-sm">
            <th className="py-3 px-4 text-left">Public name</th>
            <th className="py-3 px-4 text-left">Owner</th>
            <th className="py-3 px-4 text-left">Total Positions</th>
            <th className="py-3 px-4 text-left">isOnCurve</th>
            <th className="py-3 px-4 text-left">Allocated Data Size</th>
            <th className="py-3 px-4 text-left">Created Pool Info</th>
            <th className="py-3 px-4 text-left">Tags</th>
          </tr>
        </thead>
        <tbody>
          {pools.map((p, i) => (
            <tr key={i} className="border-t hover:bg-gray-50 transition">
              <td className="py-2 px-4 font-mono text-xs">{p.total_value}</td>
              <td className="py-2 px-4 font-mono text-xs">{p.token_bal}</td>
              <td className="py-2 px-4 font-mono text-xs">{p.token_bal}</td>
              <td className="py-2 px-4 font-mono text-xs">{p.tvl}</td>
              <td className="py-2 px-4 font-mono text-xs">{p._24h_vol}</td>

            </tr>
          ))}
        </tbody>
      </table>
      </div>
     
    </div>
  );
};

export default PoolListPage;
