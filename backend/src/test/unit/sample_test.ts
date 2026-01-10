import { assertEquals } from "@std/assert";

// ここではHTTPサーバーを介さず、関数やクラスのロジックを直接テストします
Deno.test("Unit: Basic Math Check", () => {
  const result = 1 + 1;
  assertEquals(result, 2);
});