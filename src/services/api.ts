import { type PoolInfo } from "../types/pool";

export interface PoolDisplay {
  amm_id: string;
  lp_mint: string;
  token_a_vault: string;
  token_b_vault: string;
  open_orders: string;
}

export async function fetchPools(): Promise<PoolDisplay[]> {
  // 未来可以改成你的 Rust 后端 API，比如：
  // const response = await fetch("http://localhost:8080/api/pools");
  // return await response.json();
  const res = await fetch("http://127.0.0.1:8080/api/pools_info");
  const jsonData = await res.json();
  const transactionStr = jsonData.transaction;
  const transactionObj = JSON.parse(transactionStr);
  const poolList: PoolInfo[] = transactionObj.data.data;
  // 提取对应字段
  const tableData: PoolDisplay[] = poolList.map((p: any) => ({
    amm_id: p.id,               // 这里用 id 对应 amm_id
    lp_mint: p.rewardDefaultPoolInfos || "",  // 可能需要根据后端结构调整
    token_a_vault: p.mintA.address,
    token_b_vault: p.mintB.address,
    open_orders: p.openOrders || "",  // 如果有 openOrders 字段就用，没有就空
  }));
  console.log(tableData);
  return tableData; 

  // 目前先用 mock 数据
  // return [
  //   {
  //     amm_id: "9zKjJk4S8cVQv1oB5f1nYFZCP1Qx4GJ1Qk3Dyjzvzp8",
  //     lp_mint: "LpMint1234567890",
  //     token_a_vault: "TokenAVaultABC123",
  //     token_b_vault: "TokenBVaultXYZ789",
  //     open_orders: "OpenOrders987654321",
  //   },
  //   {
  //     amm_id: "6eT7a8S4Jc3k7S2Df9t6fXzFz9fC8e6K9a4b1",
  //     lp_mint: "LpMint987654321",
  //     token_a_vault: "TokenAVaultLMN456",
  //     token_b_vault: "TokenBVaultOPQ012",
  //     open_orders: "OpenOrders555555555",
  //   },
  // ];
}
