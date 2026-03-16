import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import BudgetBar from "@/components/BudgetBar";
import StepBudget from "@/components/StepBudget";
import StepGroupType from "@/components/StepGroupType";
import StepMonth from "@/components/StepMonth";
import StepTransportArrival from "@/components/StepTransportArrival";
import StepState from "@/components/StepState";
import StepAccommodation from "@/components/StepAccommodation";
import StepLocalTransport from "@/components/StepLocalTransport";
import StepSummary from "@/components/StepSummary";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plane } from "lucide-react";
import type { TravelState, TouristSpot, AccommodationDetail } from "@/types/travel";

type StepName = 'budget' | 'group' | 'month' | 'transport-arrival' | 'state' | 'accommodation' | 'local-transport' | 'summary';

const initialState: TravelState = {
  budget: 0,
  budgetLabel: '',
  people: 1,
  days: 3,
  groupType: "solo",
  month: null,
  transportToDestination: null,
  state: "",
  stateName: "",
  selectedSpots: [],
  accommodation: null,
  localTransport: null,
};

const Planner = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState<StepName>('budget');
  const [data, setData] = useState<TravelState>(initialState);
  const [preSelectedState, setPreSelectedState] = useState<string | undefined>();

  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [user, loading]);

  useEffect(() => {
    const stateParam = searchParams.get('state');
    if (stateParam) {
      setPreSelectedState(stateParam);
    }
  }, [searchParams]);

  const getSteps = (): StepName[] => {
    const steps: StepName[] = ['budget'];
    if (data.people > 1) steps.push('group');
    steps.push('month', 'transport-arrival', 'state', 'accommodation', 'local-transport', 'summary');
    return steps;
  };

  const goBack = () => {
    const steps = getSteps();
    const idx = steps.indexOf(step);
    if (idx > 0) setStep(steps[idx - 1]);
  };

  const handleBudget = (budget: number, budgetLabel: string, people: number, days: number) => {
    setData(d => ({ ...d, budget, budgetLabel, people, days, groupType: people === 1 ? "solo" : d.groupType }));
    if (people > 1) {
      setStep('group');
    } else {
      setStep('month');
    }
  };

  const handleGroupType = (type: "couple" | "friends") => {
    setData(d => ({ ...d, groupType: type }));
    setStep('month');
  };

  const handleMonth = (month: number) => {
    setData(d => ({ ...d, month }));
    setStep('transport-arrival');
  };

  const handleTransportArrival = (transport: string) => {
    setData(d => ({ ...d, transportToDestination: transport }));
    setStep('state');
  };

  const handleState = (state: string, stateName: string, spots: TouristSpot[]) => {
    setData(d => ({ ...d, state, stateName, selectedSpots: spots }));
    setStep('accommodation');
  };

  const handleAccommodation = (accommodation: AccommodationDetail) => {
    setData(d => ({ ...d, accommodation }));
    setStep('local-transport');
  };

  const handleLocalTransport = (transport: string) => {
    setData(d => ({ ...d, localTransport: transport }));
    setStep('summary');
  };

  const handleRestart = () => {
    setData(initialState);
    setStep('budget');
  };

  const activeSteps = getSteps();
  const currentIdx = activeSteps.indexOf(step);

  if (loading) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => step === 'budget' ? navigate('/') : goBack()} className="gap-2">
            <ArrowLeft size={16} /> {step === 'budget' ? 'Voltar' : 'Anterior'}
          </Button>
          <div className="flex items-center gap-2">
            <Plane size={16} className="text-primary" />
            <span className="font-bold text-sm gradient-text">Viatura</span>
          </div>
          {data.budget > 0 && (
            <div className="hidden sm:block w-48">
              <BudgetBar total={data.budget} spent={0} />
            </div>
          )}
        </div>
      </div>

      {step !== 'summary' && step !== 'budget' && (
        <div className="flex justify-center items-center gap-1.5 pt-4 pb-2 px-4 overflow-x-auto">
          {activeSteps.map((s, i) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all flex-shrink-0 ${
                i <= currentIdx ? 'w-6 gradient-tropical' : 'w-3 bg-border'
              }`}
            />
          ))}
        </div>
      )}

      <div className="flex-1 flex items-start justify-center px-4 py-8 overflow-y-auto">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {step === 'budget' && <StepBudget key="budget" onNext={handleBudget} />}
            {step === 'group' && <StepGroupType key="group" people={data.people} onNext={handleGroupType} />}
            {step === 'month' && <StepMonth key="month" onNext={handleMonth} />}
            {step === 'transport-arrival' && <StepTransportArrival key="transport" onNext={handleTransportArrival} />}
            {step === 'state' && <StepState key="state" month={data.month} preSelectedState={preSelectedState} onNext={handleState} />}
            {step === 'accommodation' && (
              <StepAccommodation
                key="accommodation"
                stateId={data.state}
                selectedSpots={data.selectedSpots}
                budget={data.budget}
                onNext={handleAccommodation}
              />
            )}
            {step === 'local-transport' && <StepLocalTransport key="local-transport" onNext={handleLocalTransport} />}
            {step === 'summary' && <StepSummary key="summary" data={data} onRestart={handleRestart} />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Planner;
