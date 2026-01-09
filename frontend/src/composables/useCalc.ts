import { ref, onMounted } from 'vue';
import { createCalcRepository } from '../repositories/calcRepository';
import type { Calculation } from '../types/calc';

const operators = [
    { label: '＋', value: 'add' },
    { label: '−', value: 'sub' },
    { label: '×', value: 'mul' },
    { label: '÷', value: 'div' }
];

export function useCalc() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
    const repo = createCalcRepository(API_BASE_URL);

    const num1 = ref(0);
    const num2 = ref(0);
    const operator = ref('add');
    const result = ref<number | null>(null);
    const history = ref<Calculation[]>([]);
    const isError = ref(false);
    const errorMessage = ref<string | null>(null);

    const getOperatorLabel = (opValue: string) => {
        return operators.find(op => op.value === opValue)?.label || opValue;
    };

    const fetchHistory = async () => {
        try {
            history.value = await repo.fetchHistory();
        } catch (e) {
            console.error("履歴の取得に失敗しました。", e);
        }
    };

    const calculate = async () => {
        isError.value = false;
        errorMessage.value = null;

        try {
            const calcResult = await repo.calculate(operator.value, num1.value, num2.value);
            result.value = calcResult.result;
            await fetchHistory();
        } catch (e) {
            isError.value = true;
            errorMessage.value = e instanceof Error ? e.message : String(e);
        }
    };

    const clearHistory = async () => {
        // TODO: 将来的にAPIをコールして履歴を削除する
    };

    onMounted(() => {
        fetchHistory();
    });

    return {
        num1,
        num2,
        operator,
        operators,
        result,
        history,
        isError,
        errorMessage,
        calculate,
        getOperatorLabel,
        clearHistory
    };
}