import type { Calculation } from "../types/calc";

export const createCalcRepository = (baseUrl: string) => {
    return {
        calculate: async (operator: string, operand1: number, operand2: number): Promise<Calculation> => {
            const res = await fetch(`${baseUrl}/api/calc`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ operator, operand1, operand2 })
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "計算エラーが発生しました");
            }

            return data.result;
        },

        fetchHistory: async (): Promise<Calculation[]> => {
            const res = await fetch(`${baseUrl}/api/calc/histories`);
            if (!res.ok) {
                throw new Error("履歴の取得に失敗しました。");
            }
            return await res.json();
        }
    };
};