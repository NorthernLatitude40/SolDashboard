import React, { useEffect, useState } from "react";
import { fetchPools } from "../services/api";
import { type PoolInfo } from "../types/pool";
import { type PoolDisplay } from "../services/api";

const PoolList: React.FC = () => {
  const [pools, setPools] = useState<PoolDisplay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchPools();
        setPools(data);
      } catch (err) {
        console.error("❌ 获取池数据失败:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="text-center text-gray-400 p-6">加载中...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-indigo-500">
        Raydium 池信息列表
      </h1>
      <table className="min-w-full bg-white rounded-2xl shadow">
        <thead>
          <tr className="bg-indigo-100 text-gray-600 text-sm">
            <th className="py-3 px-4 text-left">AMM ID</th>
            <th className="py-3 px-4 text-left">Age</th>
            <th className="py-3 px-4 text-left">FDV</th>
            <th className="py-3 px-4 text-left">Liq</th>
            <th className="py-3 px-4 text-left">24h Txns</th>
            <th className="py-3 px-4 text-left">24h Vol</th>
            <th className="py-3 px-4 text-left">Price USD</th>
            <th className="py-3 px-4 text-left">priceMin%</th>
            <th className="py-3 px-4 text-left">priceMax%</th>
            <th className="py-3 px-4 text-left">LP Mint</th>
            <th className="py-3 px-4 text-left">Token A Vault</th>
            <th className="py-3 px-4 text-left">Symbol A</th>
            <th className="py-3 px-4 text-left">Token B Vault</th>
            <th className="py-3 px-4 text-left">Symbol B</th>
            <th className="py-3 px-4 text-left">Open Orders</th>
          </tr>
        </thead>
        <tbody>
          {pools.map((p, i) => (
            <tr key={i} className="border-t hover:bg-gray-50 transition">
              <td className="py-2 px-4 font-mono text-xs">{p.amm_id}</td>
              <td className="py-2 px-4 font-mono text-xs">{p.open_time}</td>
              <td className="py-2 px-4 font-mono text-xs">FDV = Token Price × Total Supply</td>
              <td className="py-2 px-4 font-mono text-xs">{p.tvl}</td>
              <td className="py-2 px-4 font-mono text-xs">{p.day_volume}</td>
              <td className="py-2 px-4 font-mono text-xs">{p.day_volume_quote}</td>
              <td className="py-2 px-4 font-mono text-xs">{p.price}</td>
              <td className="py-2 px-4 font-mono text-xs">{p.price_min}</td>
              <td className="py-2 px-4 font-mono text-xs">{p.price_max}</td>
              <td className="py-2 px-4 font-mono text-xs">{p.lp_mint}</td>
              <td className="py-2 px-4 font-mono text-xs">{p.token_a_vault}</td>
              <td className="py-2 px-4 font-mono text-xs">{p.symbol_a}</td>
              <td className="py-2 px-4 font-mono text-xs">{p.token_b_vault}</td>
              <td className="py-2 px-4 font-mono text-xs">{p.symbol_b}</td>
              <td className="py-2 px-4 font-mono text-xs">{p.open_orders}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PoolList;