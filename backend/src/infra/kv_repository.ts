import { Calculation, CalculationRepository } from "../domain/types.ts";

export const createKvRepository = (kv: Deno.Kv): CalculationRepository => {
    return {
        save: async (calc: Calculation): Promise<void> => {
            await kv.set(["calculations", calc.id], calc);
        },
        getAll: async (): Promise<readonly Calculation[]> => {
            const iter = kv.list<Calculation>({ prefix: ["calculations"] });
            const results: Calculation[] = [];
            for await (const { value } of iter) {
                results.push(value);
            }
            return results.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        }
    };
};
