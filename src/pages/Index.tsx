import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BudgetBar from "@/components/BudgetBar";
import StepBudget from "@/components/StepBudget";
import StepGroupType from "@/components/StepGroupType";
import StepCountryState from "@/components/StepCountryState";
import StepEntertainment from "@/components/StepEntertainment";
import StepFood from "@/components/StepFood";
import StepAccommodation from "@/components/StepAccommodation";
import StepSummary from "@/components/StepSummary";
import type { TravelState } from "@/types/travel";

const initialState: TravelState = {
  budget: 0,
  people: 1,
  groupType: "solo",
  country: "",
  state: "",
  entertainment: [],
  food: [],
  accommodation: null,
};

const stepLabels = ["Orçamento", "Grupo", "Destino", "Lazer", "Comida", "Hotel", "Resumo"];

const Index = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<TravelState>(initialState);

  const goToStep = (s: number) => setStep(s);

  const handleBudget = (budget: number, people: number) => {
    setData((d) => ({ ...d, budget, people, groupType: people === 1 ? "solo" : d.groupType }));
    setStep(people > 1 ? 1 : 2);
  };

  const handleGroupType = (type: "couple" | "friends") => {
    setData((d) => ({ ...d, groupType: type }));
    setStep(2);
  };

  const handleCountryState = (country: string, state: string) => {
    setData((d) => ({ ...d, country, state }));
    setStep(3);
  };

  const handleEntertainment = (entertainment: string[]) => {
    setData((d) => ({ ...d, entertainment }));
    setStep(4);
  };

  const handleFood = (food: string[]) => {
    setData((d) => ({ ...d, food }));
    setStep(5);
  };

  const handleAccommodation = (accommodation: string) => {
    setData((d) => ({ ...d, accommodation }));
    setStep(6);
  };

  const handleRestart = () => {
    setData(initialState);
    setStep(0);
  };

  // Determine visible steps (skip group type for solo)
  const activeSteps = data.people > 1
    ? stepLabels
    : stepLabels.filter((_, i) => i !== 1);

  const effectiveStep = data.people === 1 && step > 0 ? step : step;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Budget bar — visible after step 0 */}
      {step > 0 && data.budget > 0 && (
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-3">
          <div className="max-w-2xl mx-auto">
            <BudgetBar total={data.budget} spent={0} />
          </div>
        </div>
      )}

      {/* Step indicators */}
      {step > 0 && step < 6 && (
        <div className="flex justify-center gap-2 pt-6 pb-2">
          {activeSteps.map((label, i) => {
            const isActive = i <= (data.people === 1 && step > 1 ? step - 1 : step);
            return (
              <button
                key={label}
                onClick={() => {
                  if (i < (data.people === 1 && step > 1 ? step - 1 : step)) {
                    goToStep(data.people === 1 && i > 0 ? i + 1 : i);
                  }
                }}
                className={`h-1.5 rounded-full transition-all ${
                  isActive ? "w-8 bg-foreground" : "w-4 bg-border"
                }`}
              />
            );
          })}
        </div>
      )}

      {/* Step content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {step === 0 && <StepBudget key="budget" onNext={handleBudget} />}
            {step === 1 && <StepGroupType key="group" people={data.people} onNext={handleGroupType} />}
            {step === 2 && <StepCountryState key="country" onNext={handleCountryState} />}
            {step === 3 && <StepEntertainment key="entertainment" onNext={handleEntertainment} />}
            {step === 4 && <StepFood key="food" onNext={handleFood} />}
            {step === 5 && <StepAccommodation key="accommodation" budget={data.budget} onNext={handleAccommodation} />}
            {step === 6 && <StepSummary key="summary" data={data} onRestart={handleRestart} />}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-muted-foreground">
        Viatura · Sua viagem começa no seu bolso
      </footer>
    </div>
  );
};

export default Index;
