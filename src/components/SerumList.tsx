import React, { useEffect, useState } from "react";
import { fetchSerums } from "../services/api_serum";
import { type SerumDisplay } from "../services/api_serum";
import { useNavigate } from "react-router-dom";



const SerumPoolList: React.FC = () => {
  const [pools, setPools] = useState<SerumDisplay[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleAddrClick = (addr: string) => {
    // 跳轉到新頁面，帶上地址參數
    navigate(`/serum/${addr}`);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchSerums();
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
        serum市場信息列表
      </h1>
      <table className="min-w-full bg-white rounded-2xl shadow">
        <thead>
          <tr className="bg-indigo-100 text-gray-600 text-sm">
            <th className="py-3 px-4 text-left">Addr</th>
            <th className="py-3 px-4 text-left">Age</th>
            <th className="py-3 px-4 text-left">FDV</th>
            <th className="py-3 px-4 text-left">Liq</th>
            <th className="py-3 px-4 text-left">24h Txns</th>
            <th className="py-3 px-4 text-left">24h Vol</th>
            <th className="py-3 px-4 text-left">Price USD</th>
            <th className="py-3 px-4 text-left">5m%</th>
            <th className="py-3 px-4 text-left">1h%</th>
            <th className="py-3 px-4 text-left">4h%</th>
            <th className="py-3 px-4 text-left">24h%</th>
          </tr>
        </thead>
        <tbody>
          {pools.map((p, i) => (
            <tr key={i} className="border-t hover:bg-gray-50 transition">
              <td className="py-2 px-4 font-mono text-xs">
                <a
                  className="text-blue-600 underline hover:text-blue-800 transition-colors"
                  onClick={(e) => {
                    e.preventDefault(); // 防止跳轉 # 
                    handleAddrClick(p.addr);
                  }}
                  href="#"
                >
                  {p.addr}
                </a>
              </td>
              <td className="py-2 px-4 font-mono text-xs">{p.age}</td>
              <td className="py-2 px-4 font-mono text-xs">{p.fdv}</td>
              <td className="py-2 px-4 font-mono text-xs">{p.liq}</td>
              <td className="py-2 px-4 font-mono text-xs">{p._24h_txns}</td>
              <td className="py-2 px-4 font-mono text-xs">{p._24h_vol}</td>
              <td className="py-2 px-4 font-mono text-xs">{p.price}</td>
              <td className="py-2 px-4 font-mono text-xs">{p._5m}</td>
              <td className="py-2 px-4 font-mono text-xs">{p._1h}</td>
              <td className="py-2 px-4 font-mono text-xs">{p._4h}</td>
              <td className="py-2 px-4 font-mono text-xs">{p._24h}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SerumPoolList;