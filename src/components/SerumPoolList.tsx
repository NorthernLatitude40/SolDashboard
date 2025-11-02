import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPoolListByAddr } from "../services/api_serum";

const PoolListPage: React.FC = () => {
  const { addr } = useParams<{ addr: string }>();
  const [pools, setPools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!addr) return;
      try {
        const data = await fetchPoolListByAddr(addr); // 自己實現的接口
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
        Serum池信息列表
      </h1>
      <table className="min-w-full bg-white rounded-2xl shadow">
        <thead>
          <tr className="bg-indigo-100 text-gray-600 text-sm">
            <th className="py-3 px-4 text-left">Pool</th>
            <th className="py-3 px-4 text-left">Liquidity</th>
            <th className="py-3 px-4 text-left">24h Vol</th>
            <th className="py-3 px-4 text-left">Amount</th>
            <th className="py-3 px-4 text-left">Value</th>
            <th className="py-3 px-4 text-left">Age</th>
            <th className="py-3 px-4 text-left">Pool Address</th>
          </tr>
        </thead>
        <tbody>
          {pools.map((p, i) => (
            <tr key={i} className="border-t hover:bg-gray-50 transition">
              <td className="py-2 px-4 font-mono text-xs">{p.exn}</td>
              <td className="py-2 px-4 font-mono text-xs">{p.liqUsd}</td>
              <td className="py-2 px-4 font-mono text-xs">{p._24h_vol}</td>
              <td className="py-2 px-4 font-mono text-xs">{p.amount}</td>
              <td className="py-2 px-4 font-mono text-xs">{p.value}</td>
              <td className="py-2 px-4 font-mono text-xs">{p.age}</td>
              <td className="py-2 px-4 font-mono text-xs">{p.addr}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PoolListPage;
