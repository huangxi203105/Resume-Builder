import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ResumeFormData } from '../../types/resume';

interface FormState {
  currentStep: number;
  formData: ResumeFormData;
  isSubmitting: boolean;
  errors: Record<string, string>;
}

type FormAction = 
  | { type: 'SET_STEP'; payload: number }
  | { type: 'UPDATE_FORM_DATA'; payload: Partial<ResumeFormData> }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'SET_ERRORS'; payload: Record<string, string> }
  | { type: 'RESET_FORM' };

const initialState: FormState = {
  currentStep: 0,
  formData: {
    title: '',
    profileInfo: {
      fullName: '',
      designation: '',
      summary: '',
    },
    contactInfo: {
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      website: '',
    },
    workExperience: [],
    education: [],
    skills: [],
    projects: [],
    achievements: [],
    certifications: [],
    languages: [],
    interests: [],
  },
  isSubmitting: false,
  errors: {},
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'UPDATE_FORM_DATA':
      return { 
        ...state, 
        formData: { ...state.formData, ...action.payload }
      };
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.payload };
    case 'SET_ERRORS':
      return { ...state, errors: action.payload };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
}

interface FormContextType {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<ResumeFormData>) => void;
  setErrors: (errors: Record<string, string>) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const nextStep = () => {
    dispatch({ type: 'SET_STEP', payload: state.currentStep + 1 });
  };

  const prevStep = () => {
    dispatch({ type: 'SET_STEP', payload: Math.max(0, state.currentStep - 1) });
  };

  const updateFormData = (data: Partial<ResumeFormData>) => {
    dispatch({ type: 'UPDATE_FORM_DATA', payload: data });
  };

  const setErrors = (errors: Record<string, string>) => {
    dispatch({ type: 'SET_ERRORS', payload: errors });
  };

  return (
    <FormContext.Provider value={{
      state,
      dispatch,
      nextStep,
      prevStep,
      updateFormData,
      setErrors,
    }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within FormProvider');
  }
  return context;
}