import { Context } from "npm:hono@4.11.3";
import { GetCalculations } from "../domain/types.ts";
import { calcHistoryUseCase } from "../usecase/calc_history_usecase.ts";

export const handleHistory = (getFn: GetCalculations) => async (c: Context) => {
    try {
        const histories = await calcHistoryUseCase(getFn);
        return c.json(histories);
    } catch (e) {
        return c.json({error: e instanceof Error ? e.message : "Internal server error."}, 400);
    }
};
