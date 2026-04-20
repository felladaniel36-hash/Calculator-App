// Calculator Logic Hook
// Part of CalcFlow - Huncho.Dev

import { useState, useCallback, useRef } from 'react';

export interface HistoryEntry {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

interface CalculatorState {
  display: string;
  expression: string;
  previousValue: string | null;
  operator: string | null;
  waitingForOperand: boolean;
  shouldResetDisplay: boolean;
}

const initialState: CalculatorState = {
  display: '0',
  expression: '',
  previousValue: null,
  operator: null,
  waitingForOperand: false,
  shouldResetDisplay: false,
};

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>(initialState);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [memory, setMemory] = useState<number>(0);
  const [isScientific, setIsScientific] = useState(false);
  const [isError, setIsError] = useState(false);
  const historyIdRef = useRef(0);

  const calculate = useCallback((left: number, right: number, op: string): number => {
    switch (op) {
      case '+': return left + right;
      case '-': return left - right;
      case '*': return left * right;
      case '/': return right === 0 ? NaN : left / right;
      case '%': return left % right;
      case '^': return Math.pow(left, right);
      default: return right;
    }
  }, []);

  const formatNumber = useCallback((num: number): string => {
    if (isNaN(num)) return 'Error';
    if (!isFinite(num)) return 'Error';
    if (Number.isInteger(num)) return num.toString();
    const formatted = parseFloat(num.toPrecision(12)).toString();
    return formatted;
  }, []);

  const addToHistory = useCallback((expression: string, result: string) => {
    historyIdRef.current += 1;
    const entry: HistoryEntry = {
      id: `hist-${historyIdRef.current}`,
      expression,
      result,
      timestamp: Date.now(),
    };
    setHistory(prev => [entry, ...prev].slice(0, 100));
  }, []);

  const inputDigit = useCallback((digit: string) => {
    setIsError(false);
    setState(prev => {
      if (prev.shouldResetDisplay) {
        return {
          ...prev,
          display: digit,
          shouldResetDisplay: false,
          waitingForOperand: false,
        };
      }
      if (prev.waitingForOperand) {
        return {
          ...prev,
          display: digit,
          waitingForOperand: false,
        };
      }
      const newDisplay = prev.display === '0' ? digit : prev.display + digit;
      if (newDisplay.length > 15) return prev;
      return { ...prev, display: newDisplay };
    });
  }, []);

  const inputDecimal = useCallback(() => {
    setIsError(false);
    setState(prev => {
      if (prev.shouldResetDisplay) {
        return { ...prev, display: '0.', shouldResetDisplay: false, waitingForOperand: false };
      }
      if (prev.waitingForOperand) {
        return { ...prev, display: '0.', waitingForOperand: false };
      }
      if (prev.display.includes('.')) return prev;
      return { ...prev, display: prev.display + '.' };
    });
  }, []);

  const inputOperator = useCallback((op: string) => {
    setIsError(false);
    setState(prev => {
      const currentValue = parseFloat(prev.display);
      if (prev.previousValue === null) {
        return {
          ...prev,
          previousValue: prev.display,
          operator: op,
          waitingForOperand: true,
          expression: `${prev.display} ${op}`,
        };
      }
      if (prev.waitingForOperand) {
        return {
          ...prev,
          operator: op,
          expression: `${prev.previousValue} ${op}`,
        };
      }
      const prevValue = parseFloat(prev.previousValue);
      const result = calculate(prevValue, currentValue, prev.operator || '+');
      const formattedResult = formatNumber(result);
      if (formattedResult === 'Error') {
        setIsError(true);
        return { ...initialState, display: 'Error' };
      }
      addToHistory(`${prev.previousValue} ${prev.operator} ${prev.display} =`, formattedResult);
      return {
        ...prev,
        display: formattedResult,
        previousValue: formattedResult,
        operator: op,
        waitingForOperand: true,
        expression: `${formattedResult} ${op}`,
      };
    });
  }, [calculate, formatNumber, addToHistory]);

  const performCalculation = useCallback(() => {
    setState(prev => {
      if (prev.previousValue === null || prev.operator === null) return prev;
      const currentValue = parseFloat(prev.display);
      const prevValue = parseFloat(prev.previousValue);
      const result = calculate(prevValue, currentValue, prev.operator);
      const formattedResult = formatNumber(result);
      if (formattedResult === 'Error') {
        setIsError(true);
        return { ...initialState, display: 'Error' };
      }
      const fullExpression = `${prev.previousValue} ${prev.operator} ${prev.display} =`;
      addToHistory(fullExpression, formattedResult);
      return {
        ...prev,
        display: formattedResult,
        previousValue: null,
        operator: null,
        waitingForOperand: true,
        shouldResetDisplay: true,
        expression: fullExpression,
      };
    });
  }, [calculate, formatNumber, addToHistory]);

  const clear = useCallback(() => {
    setIsError(false);
    setState(initialState);
  }, []);

  const clearEntry = useCallback(() => {
    setIsError(false);
    setState(prev => ({ ...prev, display: '0', shouldResetDisplay: false }));
  }, []);

  const deleteLast = useCallback(() => {
    setIsError(false);
    setState(prev => {
      if (prev.waitingForOperand || prev.shouldResetDisplay) return prev;
      if (prev.display.length === 1) return { ...prev, display: '0' };
      return { ...prev, display: prev.display.slice(0, -1) };
    });
  }, []);

  const toggleSign = useCallback(() => {
    setState(prev => {
      if (prev.display === '0' || prev.display === 'Error') return prev;
      if (prev.display.startsWith('-')) {
        return { ...prev, display: prev.display.slice(1) };
      }
      return { ...prev, display: '-' + prev.display };
    });
  }, []);

  const inputPercent = useCallback(() => {
    setState(prev => {
      const value = parseFloat(prev.display);
      const result = value / 100;
      return { ...prev, display: formatNumber(result), shouldResetDisplay: true };
    });
  }, [formatNumber]);

  const scientificFunction = useCallback((func: string) => {
    setIsError(false);
    setState(prev => {
      const value = parseFloat(prev.display);
      let result: number;
      switch (func) {
        case 'sin': result = Math.sin(value); break;
        case 'cos': result = Math.cos(value); break;
        case 'tan': result = Math.tan(value); break;
        case 'log': result = Math.log10(value); break;
        case 'ln': result = Math.log(value); break;
        case 'sqrt': result = Math.sqrt(value); break;
        case '1/x': result = 1 / value; break;
        case 'x^2': result = Math.pow(value, 2); break;
        case 'x^3': result = Math.pow(value, 3); break;
        case 'e^x': result = Math.exp(value); break;
        case 'abs': result = Math.abs(value); break;
        case 'pi': return { ...prev, display: formatNumber(Math.PI), shouldResetDisplay: true };
        case 'e': return { ...prev, display: formatNumber(Math.E), shouldResetDisplay: true };
        case 'n!': {
          if (value < 0 || !Number.isInteger(value)) {
            setIsError(true);
            return { ...initialState, display: 'Error' };
          }
          result = 1;
          for (let i = 2; i <= value; i++) result *= i;
          break;
        }
        default: return prev;
      }
      const formattedResult = formatNumber(result);
      if (formattedResult === 'Error') {
        setIsError(true);
        return { ...initialState, display: 'Error' };
      }
      addToHistory(`${func}(${prev.display})`, formattedResult);
      return { ...prev, display: formattedResult, shouldResetDisplay: true };
    });
  }, [formatNumber, addToHistory]);

  const memoryClear = useCallback(() => setMemory(0), []);
  const memoryRecall = useCallback(() => {
    setState(prev => ({ ...prev, display: formatNumber(memory), shouldResetDisplay: true }));
  }, [memory, formatNumber]);

  const memoryAdd = useCallback(() => {
    setMemory(prev => prev + parseFloat(state.display || '0'));
  }, [state.display]);

  const memorySubtract = useCallback(() => {
    setMemory(prev => prev - parseFloat(state.display || '0'));
  }, [state.display]);

  const memoryStore = useCallback(() => {
    setMemory(parseFloat(state.display || '0'));
  }, [state.display]);

  const clearHistory = useCallback(() => setHistory([]), []);

  const handleParenthesis = useCallback((paren: string) => {
    setState(prev => {
      if (paren === '(') {
        return { ...prev, display: '(', shouldResetDisplay: false };
      }
      return { ...prev, display: prev.display + ')' };
    });
  }, []);

  return {
    display: state.display,
    expression: state.expression,
    isError,
    history,
    memory,
    isScientific,
    inputDigit,
    inputDecimal,
    inputOperator,
    performCalculation,
    clear,
    clearEntry,
    deleteLast,
    toggleSign,
    inputPercent,
    scientificFunction,
    memoryClear,
    memoryRecall,
    memoryAdd,
    memorySubtract,
    memoryStore,
    clearHistory,
    handleParenthesis,
    setIsScientific,
  };
}
