<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Select from 'primevue/select';
import InputNumber from 'primevue/inputnumber';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Message from 'primevue/message';
import Tag from 'primevue/tag';

const num1 = ref(0);
const num2 = ref(0);
const operator = ref('+');
const operators = ref([
    { label: '＋', value: '+' },
    { label: 'ー', value: '-' },
    { label: '×', value: '*' },
    { label: '÷', value: '/' }
]);
const result = ref(0);

const history = ref<Array<{
    id: number,
    formula: string,
    date: string,
}>>([]);

const isError = ref(false);
const errorMessage = ref();

const fetchHistory = async () => {
    try {
        const res = await fetch("http://localhost:8000/api/calc/history");
        history.value = await res.json();
    } catch (e) {
        console.error("履歴の取得に失敗しました。");
    }
}

const calculate = async () => {
    isError.value = false;
    errorMessage.value = null;

    try {
        const res = await fetch("http://localhost:8000/api/calc", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                operator: operator.value,
                operand1: num1.value,
                operand2: num2.value
            })
        });
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || "計算エラーが発生しました");
        }

        result.value = data.result;
        await fetchHistory();
    } catch (e) {
        isError.value = true;
        errorMessage.value = e instanceof Error ? e.message : e;
    }
};

onMounted(() => {
    fetchHistory();
});
</script>

<template>
  <div class="calc-container">
    <Card class="calc-card">
      <template #title>
        <div class="card-header">
          <i class="pi pi-calculator card-header-icon"></i>
          <span>計算エンジン</span>
        </div>
      </template>

      <template #content>
        <div class="calculation-area">
          <div class="input-row">
            <InputNumber v-model="num1" showButtons buttonLayout="horizontal" :step="1" 
              decrementButtonClass="p-button-secondary" incrementButtonClass="p-button-secondary"
              :inputStyle="{ width: '80px', textAlign: 'center' }" />
            
            <Select v-model="operator" :options="operators" optionLabel="label" optionValue="value" :style="{ width: '80px' }" />
            
            <InputNumber v-model="num2" showButtons buttonLayout="horizontal" :step="1"
              decrementButtonClass="p-button-secondary" incrementButtonClass="p-button-secondary"
              :inputStyle="{ width: '80px', textAlign: 'center' }" />

            <Button label="計算実行" icon="pi pi-check" @click="calculate" raised />
          </div>

          <div v-if="result !== null" class="result-display">
            <span class="result-label">RESULT</span>
            <span class="result-value">{{ result }}</span>
          </div>
        </div>

        <Message v-if="isError" severity="error" class="error-message">{{ errorMessage }}</Message>

        <div class="history-section">
          <div class="history-header">
            <h3 class="history-title"><i class="pi pi-history history-icon"></i>履歴</h3>
            <Button label="Clear" icon="pi pi-trash" severity="danger" text size="small" @click="history = []" />
          </div>
          
          <DataTable :value="history" size="small" paginator :rows="5" class="custom-table" responsiveLayout="scroll">
            <Column field="formula" header="計算式">
              <template #body="slotProps">
                <code class="formula-text">{{ slotProps.data.formula }}</code>
              </template>
            </Column>
            <Column field="date" header="時刻">
              <template #body="slotProps">
                <Tag severity="secondary" :value="new Date(slotProps.data.date).toLocaleTimeString()" />
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.calc-container {
  display: flex;
  justify-content: center;
  padding: 1rem;
}

.calc-card {
  width: 100%;
  max-width: 600px;
  border-radius: 1.5rem;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-header-icon {
  color: var(--p-primary-color);
  font-size: 1.5rem;
}

.input-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.calculation-area {
  background: var(--p-content-hover-background);
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
}

.operator-icon {
  font-size: 1.25rem;
  opacity: 0.5;
}

.result-display {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.result-label {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.1rem;
  opacity: 0.6;
}

.result-value {
  font-size: 3rem;
  font-weight: 900;
  color: var(--p-primary-color);
  font-family: 'Courier New', Courier, monospace;
}

.formula-text {
  font-weight: 600;
  background: var(--p-content-background);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.error-message {
  margin-top: 1rem;
}

.history-section {
  margin-top: 2rem;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.history-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: bold;
}

.history-icon {
  margin-right: 0.5rem;
}
</style>
