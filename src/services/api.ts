import { type PoolInfo } from "../types/pool";
import { type AccountInfo } from "../types/account";

export interface PoolDisplay {
  amm_id: string;
  symbol_a: string;
  symbol_b: string;
  lp_mint: string;
  token_a_vault: string;
  token_b_vault: string;
  open_orders: string;
  open_time: string;
  fdv: string;
  tvl: string;
  day_volume: string;
  day_volume_quote: string;
  price: string;
  price_min: string;
  price_max: string;
}

export async function fetchPools(): Promise<PoolDisplay[]> {
  // 未来可以改成你的 Rust 后端 API，比如：
  // const response = await fetch("http://localhost:8080/api/pools");
  // return await response.json();
  const res = await fetch("http://127.0.0.1:8080/api/pools_info");
  const jsonData = await res.json();
  const transactionStr = jsonData.transaction;
  const transactionObj = JSON.parse(transactionStr);
  console.log(transactionObj);
  const poolList: PoolInfo[] = transactionObj.data.data;
  // 提取对应字段
  const tableData: PoolDisplay[] = poolList.map((p: any) => ({
    amm_id: p.id,               // 这里用 id 对应 amm_id
   
    lp_mint: p.lpMint.address ||"",  // 可能需要根据后端结构调整
    token_a_vault: p.mintA.address,
    symbol_a: p.mintA.symbol || "",
    token_b_vault: p.mintB.address,
    symbol_b: p.mintB.symbol || "",
    open_orders: p.openOrders || "",  // 如果有 openOrders 字段就用，没有就空
    open_time: getPoolAge(p.openTime) || "",  
    fdv: p.fdv || "",
    tvl: formatUSD(p.tvl) || "",
    day_volume: 0|| "",
    day_volume_quote: formatUSD(p.day.volumeQuote) || "",
    price: formatUSD(p.price) || "",
    price_min: formatUSD(p.day.priceMin) || "",
    price_max: formatUSD(p.day.priceMax) || "",
  }));
  return tableData; 

}

function getPoolAge(openTime: number) {
  // 如果 openTime 為 0、空字串或 undefined，返回空或提示
  if (!openTime || openTime == 0) return "N/A";

  // 假設 openTime 是 UNIX timestamp（秒）
  const now = Date.now(); // 當前時間（毫秒）
  const openDate = new Date(openTime * 1000); // 轉成毫秒
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


function formatUSD(value: number | null | undefined) {
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

  return "$" + formatted;
}

export interface AccountDisplay {
  address: string;
  uiAmount: number;
  decimals: number;
  amount: string;
  uiAmountString: string;


}

export async function fetchPlmintAccounts(addr: string): Promise<AccountDisplay[]> {
  const res = await fetch(`http://127.0.0.1:8080/api/plmint_accounts?addr=${addr}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const jsonData = await res.json();
  const transactionStr = jsonData.transaction;
  const transactionObj = JSON.parse(transactionStr);
  console.log(transactionObj);
  const accoountList: AccountInfo[] = transactionObj.result.value;
  console.log("當前 pp:", accoountList);  // ← 打印每個元素
  // 提取对应字段
  const tableData: AccountDisplay[] = accoountList.map((p: any) => {       // 这里用 id 对应 amm_id

    return {
      address: p.address,
      uiAmount: p.uiAmount,
      decimals: p.decimals,
      amount: p.amount,
      uiAmountString: p.uiAmountString,
    };
  });
  return tableData; 
}