<script setup lang="ts">
import { ref, computed } from 'vue'

const buildingSize = ref(2000) // in square feet
const currentUsage = ref(15) // in kWh per square foot per month
const efficiencyPercentage = ref(30) // percentage improvement

// Energy rates in cents per kWh
const energyRate = 0.15

// Calculate monthly and yearly savings
const monthlySavings = computed(() => {
  const currentMonthlyUsage = buildingSize.value * currentUsage.value
  const newMonthlyUsage = currentMonthlyUsage * (1 - efficiencyPercentage.value / 100)
  const savedEnergy = currentMonthlyUsage - newMonthlyUsage
  const savedCost = savedEnergy * energyRate
  return {
    energy: savedEnergy.toFixed(0),
    cost: savedCost.toFixed(2)
  }
})

const annualSavings = computed(() => {
  return {
    energy: (parseFloat(monthlySavings.value.energy) * 12).toFixed(0),
    cost: (parseFloat(monthlySavings.value.cost) * 12).toFixed(2)
  }
})

const co2Reduction = computed(() => {
  // Average CO2 emissions: 0.85 pounds per kWh
  const co2PerKWh = 0.85
  const annualKwhSaved = parseFloat(annualSavings.value.energy)
  const poundsCO2Saved = annualKwhSaved * co2PerKWh
  // Convert to metric tons
  const metricTonsCO2Saved = poundsCO2Saved / 2204.62
  return metricTonsCO2Saved.toFixed(2)
})

const paybackPeriod = computed(() => {
  // Assuming $2 per sq ft implementation cost
  const implementationCost = buildingSize.value * 2
  const annualCostSavings = parseFloat(annualSavings.value.cost)
  const paybackYears = implementationCost / annualCostSavings
  return paybackYears.toFixed(1)
})
</script>

<template>
  <div class="energy-calculator">
    <div class="calculator-container">
      <div class="calculator-inputs">
        <div class="form-group">
          <label for="buildingSize" class="form-label">Building Size (sq ft)</label>
          <input 
            type="range" 
            id="buildingSize" 
            v-model="buildingSize" 
            min="500" 
            max="10000" 
            step="100"
            class="form-range"
          >
          <div class="range-value">{{ buildingSize.toLocaleString() }} sq ft</div>
        </div>
        
        <div class="form-group">
          <label for="currentUsage" class="form-label">Current Energy Usage (kWh per sq ft per month)</label>
          <input 
            type="range" 
            id="currentUsage" 
            v-model="currentUsage" 
            min="5" 
            max="30" 
            step="0.5"
            class="form-range"
          >
          <div class="range-value">{{ currentUsage }} kWh/sq ft</div>
        </div>
        
        <div class="form-group">
          <label for="efficiencyPercentage" class="form-label">Smart Building Efficiency Improvement</label>
          <input 
            type="range" 
            id="efficiencyPercentage" 
            v-model="efficiencyPercentage" 
            min="10" 
            max="50" 
            step="1"
            class="form-range"
          >
          <div class="range-value">{{ efficiencyPercentage }}%</div>
        </div>
      </div>
      
      <div class="calculator-results">
        <div class="results-header">Projected Savings</div>
        
        <div class="results-grid">
          <div class="result-card">
            <div class="result-value">${{ monthlySavings.cost }}</div>
            <div class="result-label">Monthly Cost Savings</div>
          </div>
          
          <div class="result-card">
            <div class="result-value">${{ annualSavings.cost }}</div>
            <div class="result-label">Annual Cost Savings</div>
          </div>
          
          <div class="result-card">
            <div class="result-value">{{ annualSavings.energy }} kWh</div>
            <div class="result-label">Annual Energy Saved</div>
          </div>
          
          <div class="result-card">
            <div class="result-value">{{ co2Reduction }} tons</div>
            <div class="result-label">Annual CO₂ Reduction</div>
          </div>
        </div>
        
        <div class="payback-info">
          <div class="payback-label">Estimated Payback Period:</div>
          <div class="payback-value">{{ paybackPeriod }} years</div>
        </div>
        
        <div class="calculator-note">
          Note: This calculator provides estimates based on typical values. Actual savings may vary 
          based on building specifics, implementation details, and energy costs in your area.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.energy-calculator {
  background-color: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  overflow: hidden;
}

.calculator-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

@media (min-width: 768px) {
  .calculator-container {
    grid-template-columns: 1fr 1fr;
  }
}

.calculator-inputs {
  padding: var(--space-6);
}

.calculator-results {
  padding: var(--space-6);
  background-color: var(--color-primary-50);
  border-top: 1px solid var(--color-primary-100);
}

@media (min-width: 768px) {
  .calculator-results {
    border-top: none;
    border-left: 1px solid var(--color-primary-100);
  }
}

.form-group {
  margin-bottom: var(--space-6);
}

.form-label {
  display: block;
  margin-bottom: var(--space-2);
  font-weight: 500;
}

.form-range {
  width: 100%;
  margin-bottom: var(--space-2);
  -webkit-appearance: none;
  appearance: none;
  height: 8px;
  background: var(--color-neutral-200);
  border-radius: var(--radius-full);
  outline: none;
}

.form-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: var(--color-primary-500);
  border-radius: 50%;
  cursor: pointer;
}

.form-range::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: var(--color-primary-500);
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

.range-value {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-primary-600);
}

.results-header {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: var(--space-4);
  color: var(--color-primary-700);
}

.results-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.result-card {
  background-color: white;
  padding: var(--space-4);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  text-align: center;
}

.result-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary-600);
  margin-bottom: var(--space-1);
}

.result-label {
  font-size: 0.875rem;
  color: var(--color-neutral-600);
}

.payback-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4);
  background-color: var(--color-primary-100);
  border-radius: var(--radius);
  margin-bottom: var(--space-4);
}

.payback-label {
  font-weight: 500;
  color: var(--color-primary-700);
}

.payback-value {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-primary-700);
}

.calculator-note {
  font-size: 0.75rem;
  color: var(--color-neutral-500);
  font-style: italic;
}
</style>