import { type SerumInfo } from "../types/serum";
import { type PoolInfo } from "../types/pool";

export interface SerumDisplay {
  addr: string;
  age: string;
  fdv: string;
  liq: string;
  _24h_txns: string;
  _24h_vol: string;
  price: string;
  _5m: string;
  _1h: string;
  _4h: string;
  _24h: string;
}

export async function fetchSerums(): Promise<SerumDisplay[]> {

  const res = await fetch("http://127.0.0.1:8080/api/serum_info");
  const jsonData = await res.json();
  const transactionStr = jsonData.transaction;
  const transactionObj = JSON.parse(transactionStr);
  console.log(transactionObj);
  const poolList: SerumInfo[] = transactionObj.data.leaderboardList;
  // 提取对应字段
  const tableData: SerumDisplay[] = poolList.map((p: any) => {
   
    console.log("當前 p:", p);  // ← 打印每個元素
    return {
      addr: p.addr || "",  
      age: getPoolAge(Number(p.pubAt)) || "",  
      fdv: "$"+format(Number(p.mcap)) || "",
      liq:  "$"+format(Number(p.liqUsd)) || "",
      _24h_txns: format(Number(p.t24h))|| "",
      _24h_vol: "$"+format(Number(p.v24h))|| "",
      price: "$"+format(Number(p.p))|| "",
      _5m:  (Number(p.sts[0].pc) * 100).toFixed(2)|| "",
      _1h:  (Number(p.sts[1].pc) * 100).toFixed(2)|| "",
      _4h: (Number(p.sts[2].pc) * 100).toFixed(2)|| "",
      _24h:  (Number(p.sts[3].pc) * 100).toFixed(2)|| "",
    };
  });

  return tableData; 

}


export interface PoolDisplay {
}

export async function fetchPoolListByAddr(addr: string): Promise<PoolDisplay[]>  {

  const res = await fetch("http://127.0.0.1:8080/api/serum_pools?addr="+addr);
  const jsonData = await res.json();
  const transactionStr = jsonData.transaction;
  const transactionObj = JSON.parse(transactionStr);
  console.log(transactionObj);
  const poolList: PoolInfo[] = transactionObj.data;
  // 提取对应字段
  const tableData: PoolDisplay[] = poolList.map((p: any) => {       // 这里用 id 对应 amm_id
    console.log("當前 pp:", p);  // ← 打印每個元素
    return {
      exn: p.exn || "",  
      liqUsd: "$"+format(Number(p.liqUsd)) || "",  
      _24h_vol: "$"+format(Number(p.v24))|| "",
      amount: "$"+format(Number(p.t0.liq))+" "+p.t0.sym+"\n"+"$"+format(Number(p.t1.liq))+" "+p.t1.sym|| "",
      age: getPoolAge(Number(p.pubAt)) || "",  
      addr: p.addr || "",  
      value: "$"+format(Number(p.t0.liqUsd))+" "+p.t0.sym+"\n"+"$"+format(Number(p.t1.liqUsd))+" "+p.t1.sym|| "",
    };
  });
  return tableData; 
}

export async function fetchPoolDetailByAddr(addr: string): Promise<PoolDisplay[]>  {

  const res = await fetch("http://127.0.0.1:8080/api/pool_ids", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ids: [addr], // 傳入一個或多個 ID
    }),
  });
  const jsonData = await res.json();
  const transactionStr = jsonData.transaction;
  const transactionObj = JSON.parse(transactionStr);
  console.log(transactionObj);
  const poolList: PoolInfo[] = transactionObj.data;
  // 提取对应字段
  const tableData: PoolDisplay[] = poolList.map((p: any) => {       // 这里用 id 对应 amm_id
    console.log("當前 pp:", p);  // ← 打印每個元素
    return {
     total_value: p.tvl+p.rewardDefaultInfos[0].perSecond*86400*1.37,
      token_bal: format(Number(p.mintAmountA))+" "+"$"+format(Number(p.mintAmountA*p.price))+"\n"+format(Number(p.mintAmountB))+" "+"$"+format(Number(p.mintAmountB*p.price))|| "",
      _24h_vol: "$"+Number(p.day.volumeQuote).toFixed(2)|| "",
      tvl: "$"+p.tvl,
      lpMint_addr: p.lpMint.address,
    };
  });
  return tableData; 
}


function getPoolAge(openTime: number) {
  // 如果 openTime 為 0、空字串或 undefined，返回空或提示
  if (!openTime || openTime == 0) return "N/A";

  // 假設 openTime 是 UNIX timestamp（秒）
  const now = Date.now(); // 當前時間（毫秒）
  const openDate = new Date(openTime); // 轉成毫秒
  const diffMs = now - openDate.getTime(); // 毫秒差
  // 如果開池時間晚於當前時間，返回空
  if (diffMs < 0) return "N/A";

  const diffH = diffMs / (1000 * 60 * 60); // 小時
  if (diffH < 24) return diffH.toFixed(1) + "h";

  const diffD = diffH / 24; // 天
  if (diffD < 30) return diffD.toFixed(1) + "d";

  const diffMo = diffD / 30; // 月（按 30 天計算）
  if (diffMo < 12) return diffMo.toFixed(1) + "mo";

  const diffY = diffMo / 12; // 年
  return diffY.toFixed(2) + "y";
}


function format(value: number | null | undefined) {
  if (value === null || value === undefined) return "$0";

  const absValue = Math.abs(value);
  let formatted = "";

  if (absValue >= 1e9) {
      formatted = (value / 1e9).toFixed(2) + "B";
  } else if (absValue >= 1e6) {
      formatted = (value / 1e6).toFixed(2) + "M";
  } else if (absValue >= 1e3) {
      formatted = (value / 1e3).toFixed(2) + "K";
  } else {
      formatted = value.toFixed(2);
  }

  return formatted;
}
