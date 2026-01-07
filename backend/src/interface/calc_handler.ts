import z from "npm:zod@4.3.4";
import { SaveCalculation } from "../domain/types.ts";
import { Context } from "npm:hono@4.11.3";
import { calcUseCase } from "../usecase/calc_usecase.ts";

const CalcSchema = z.object({
    operand1: z.number(),
    operator: z.enum(["add", "sub", "mul", "div"]),
    operand2: z.number(),
});

export const handleCalc = (saveFn: SaveCalculation) => async (c: Context) => {
    const body = await c.req.json();
    const validation = CalcSchema.safeParse(body);
    if (!validation.success) {
        return c.json({error: "Invalid input"}, 400);
    };
    const input = {
        op1: validation.data.operand1,
        op: validation.data.operator,
        op2: validation.data.operand2,
    }
    try {
        const result = await calcUseCase(input, saveFn);
        return c.json({result});
    } catch (e) {
        return c.json({error: e instanceof Error ? e.message : "Internal server error."}, 400);
    }
};
