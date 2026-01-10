import { assertEquals, assertExists } from "@std/assert";
import { createApp } from "../../app.ts";
import { createKvRepository } from "../../infra/kv_repository.ts";

Deno.test("API Integration Test", async (t) => {
  // テストごとに独立したインメモリKVを作成
  const kv = await Deno.openKv(":memory:");
  const repo = createKvRepository(kv);
  const app = createApp(repo);

  await t.step("GET /api/calc/histories returns 200 OK", async () => {
    const res = await app.request("/api/calc/histories");
    assertEquals(res.status, 200);
    // 必要であればレスポンスの中身も検証
    // const data = await res.json();
  });
  
  await t.step("POST /api/calc executes calculation", async () => {
    const res = await app.request("/api/calc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        operand1: 10,
        operator: "add",
        operand2: 5,
      }),
    });
    assertEquals(res.status, 200);
    const data = await res.json();
    
    // IDや時刻は動的に変わるため、存在することだけを確認
    assertExists(data.result.id);
    assertExists(data.result.createdAt);
    // 計算結果の値が正しいか検証
    assertEquals(data.result.result, 15);
  });

  await t.step("404 Not Found Test", async () => {
    const res = await app.request("/undefined-route");
    assertEquals(res.status, 404);
  });
  
  // テスト終了後にKVを閉じる
  kv.close();
});