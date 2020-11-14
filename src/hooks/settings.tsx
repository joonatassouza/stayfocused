import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface SettingsContextProps {
  resting: boolean;
  workTimeMinutes: number;
  breakTimeMinutes: number;
  rounds: number;
  restTimeMinutes: number;
  updateResting(resting: boolean): void;
  updateWorkTimeMinutes(workTimeMinutes: number): void;
  updateBreakTimeMinutes(breakTimeMinutes: number): void;
  updateRounds(rounds: number): void;
  updateRestTimeMinutes(restTimeMinutes: number): void;
}

const SettingsContext = createContext<SettingsContextProps>(
  {} as SettingsContextProps,
);

export const SettingsProvider: React.FC = ({children}) => {
  const [resting, setResting] = useState(false);
  const [workTimeMinutes, setWorkTimeMinutes] = useState(25);
  const [breakTimeMinutes, setBreakTimeMinutes] = useState(5);
  const [rounds, setRounds] = useState(4);
  const [restTimeMinutes, setRestTimeMinutes] = useState(15);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [
        storageWorkTimeMinutes,
        storageBreakTimeMinutes,
        storageRounds,
        storageRestTimeMinutes,
      ] = await AsyncStorage.multiGet([
        '@jsdevstayfocused:workTimeMinutes',
        '@jsdevstayfocused:breakTimeMinutes',
        '@jsdevstayfocused:rounds',
        '@jsdevstayfocused:restTimeMinutes',
      ]);

      if (storageWorkTimeMinutes[1]) {
        setWorkTimeMinutes(Number(storageWorkTimeMinutes[1]));
      } else {
        setWorkTimeMinutes(25);
      }

      if (storageBreakTimeMinutes[1]) {
        setBreakTimeMinutes(Number(storageBreakTimeMinutes[1]));
      } else {
        setBreakTimeMinutes(5);
      }

      if (storageRounds[1]) {
        setRounds(Number(storageRounds[1]));
      } else {
        setRounds(4);
      }

      if (storageRestTimeMinutes[1]) {
        setRestTimeMinutes(Number(storageRestTimeMinutes[1]));
      } else {
        setRestTimeMinutes(15);
      }

      setResting(false);
    }

    loadStorageData();
  }, []);

  const updateResting = useCallback((newResting: boolean) => {
    setResting(newResting);
  }, []);

  const updateWorkTimeMinutes = useCallback(
    async (newWorkTimeMinutes: number) => {
      setWorkTimeMinutes(newWorkTimeMinutes);

      await AsyncStorage.setItem(
        '@jsdevstayfocused:workTimeMinutes',
        JSON.stringify(newWorkTimeMinutes),
      );
    },
    [],
  );

  const updateBreakTimeMinutes = useCallback(
    async (newBreakTimeMinutes: number) => {
      setBreakTimeMinutes(newBreakTimeMinutes);

      await AsyncStorage.setItem(
        '@jsdevstayfocused:breakTimeMinutes',
        JSON.stringify(newBreakTimeMinutes),
      );
    },
    [],
  );

  const updateRounds = useCallback(async (newRounds: number) => {
    setRounds(newRounds);

    await AsyncStorage.setItem(
      '@jsdevstayfocused:rounds',
      JSON.stringify(newRounds),
    );
  }, []);

  const updateRestTimeMinutes = useCallback(
    async (newRestTimeMinutes: number) => {
      setRestTimeMinutes(newRestTimeMinutes);

      await AsyncStorage.setItem(
        '@jsdevstayfocused:restTimeMinutes',
        JSON.stringify(newRestTimeMinutes),
      );
    },
    [],
  );

  return (
    <SettingsContext.Provider
      value={{
        resting,
        workTimeMinutes,
        breakTimeMinutes,
        rounds,
        restTimeMinutes,
        updateResting,
        updateWorkTimeMinutes,
        updateBreakTimeMinutes,
        updateRounds,
        updateRestTimeMinutes,
      }}>
      {children}
    </SettingsContext.Provider>
  );
};

export function useSettings(): SettingsContextProps {
  const context = useContext(SettingsContext);

  return context;
}
