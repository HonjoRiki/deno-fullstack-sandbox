import { z } from "npm:zod@4.3.4";
import type { Context } from "npm:hono@4.11.3";
import { findAll, create } from "../models/calc/calcHistory.ts";
import { calculate, Expression, toString } from "../models/calc/expression.ts";

const calcBodySchema = z.object({
    operator: z.enum(["+", "-", "*", "/"], { message: "演算子が無効です" }),
    operand1: z.number({ message: "数値が無効です" }),
    operand2: z.number({ message: "数値が無効です" }),
}).refine((data) => !(data.operator === "/" && data.operand2 === 0), {
    message: "0で割ることはできません",
});

const createHistorySchema = z.object({
    formula: z.object({
        operator: z.enum(["+", "-", "*", "/"]),
        operand1: z.number(),
        operand2: z.number(),
    }),
});

export const calculateAndSave = async (c: Context) => {
    const body = await c.req.json();
    const { operator, operand1, operand2 } = calcBodySchema.parse(body);

    const expression: Expression = {
        operator,
        operand1,
        operand2,
    };
    const result = calculate(expression);

    const formulaStr = `${toString(expression)} = ${result}`;
    const newEntry = create(formulaStr);

    return c.json({
        success: true,
        result: result,
        entry: newEntry,
    });
};

export const getHistory = (c: Context) => {
    return c.json(findAll());
};

export const createHistory = async (c: Context) => {
    const body = await c.req.json();
    const { formula } = createHistorySchema.parse(body);
    const newEntry = create(toString(formula));
    return c.json({
        success: true,
        entry: newEntry,
    });
};
