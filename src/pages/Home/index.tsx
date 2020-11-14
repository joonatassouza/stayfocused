import React, {useEffect, useMemo, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Vibration,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {
  addMilliseconds,
  differenceInMilliseconds,
  isBefore,
  format,
} from 'date-fns';

import {AdMobInterstitial} from 'react-native-admob';

import {useSettings} from '../../hooks/settings';

// eslint-disable-next-line no-undef
let focusInterval: NodeJS.Timeout;
// eslint-disable-next-line no-undef
let restInterval: NodeJS.Timeout;

const Home: React.FC = () => {
  const {
    workTimeMinutes,
    breakTimeMinutes,
    rounds,
    restTimeMinutes,
    resting,
    updateResting,
  } = useSettings();

  const workTimeMilliseconds = useMemo(() => 60000 * workTimeMinutes, [
    workTimeMinutes,
  ]);

  const breakTimeMilliseconds = useMemo(() => 60000 * breakTimeMinutes, [
    breakTimeMinutes,
  ]);

  const restTimeMilliseconds = useMemo(() => 60000 * restTimeMinutes, [
    restTimeMinutes,
  ]);

  const [milliseconds, setMiliseconds] = useState(`${workTimeMinutes}:00:000`);
  const [focusing, setFocusing] = useState(false);
  const [state, setState] = useState<'focused' | 'resting'>('resting');
  const [roundsCount, setRoundsCount] = useState(1);

  function stopFocusing() {
    clearInterval(focusInterval);
    setMiliseconds(
      roundsCount < rounds
        ? `${breakTimeMinutes}:00:000`
        : `${restTimeMinutes}:00:000`,
    );
    setFocusing(false);
    setState('focused');
    Vibration.cancel();
  }

  async function stopRest() {
    clearInterval(restInterval);
    setMiliseconds(`${workTimeMinutes}:00:000`);
    updateResting(false);
    setState('resting');

    if (roundsCount >= rounds) {
      setRoundsCount(1);
    } else {
      setRoundsCount(roundsCount + 1);
    }

    Vibration.cancel();

    await AdMobInterstitial.setAdUnitID(
      'ca-app-pub-1702335065522010/8005164711',
    );
    await AdMobInterstitial.requestAd();
    await AdMobInterstitial.showAd();
  }

  function getFocused() {
    if (focusing) {
      return;
    }
    setFocusing(true);

    const targetDate = addMilliseconds(new Date(), workTimeMilliseconds);

    focusInterval = setInterval(() => {
      if (isBefore(targetDate, new Date())) {
        setMiliseconds('00:00:000');
        clearInterval(focusInterval);
        Vibration.vibrate([1000, 1000, 1500], true);
      } else {
        const helperDate = addMilliseconds(
          new Date(0, 0, 0, 0, 0, 0),
          differenceInMilliseconds(targetDate, new Date()),
        );

        setMiliseconds(format(helperDate, 'mm:ss:SSS'));
      }
    }, 50);
  }

  function getRest() {
    if (resting) {
      return;
    }
    updateResting(true);

    const targetDate = addMilliseconds(
      new Date(),
      roundsCount < rounds ? breakTimeMilliseconds : restTimeMilliseconds,
    );

    restInterval = setInterval(() => {
      if (isBefore(targetDate, new Date())) {
        setMiliseconds('00:00:000');
        clearInterval(restInterval);
        Vibration.vibrate([1000, 500, 500, 100, 100, 100, 500], true);
      } else {
        const helperDate = addMilliseconds(
          new Date(0, 0, 0, 0, 0, 0),
          differenceInMilliseconds(targetDate, new Date()),
        );

        setMiliseconds(format(helperDate, 'mm:ss:SSS'));
      }
    }, 50);
  }

  useEffect(() => {
    clearInterval(focusInterval);
    clearInterval(restInterval);
    setMiliseconds(`${workTimeMinutes}:00:000`);
    setFocusing(false);
    updateResting(false);
    setState('resting');
    setRoundsCount(1);
    Vibration.cancel();
  }, [
    workTimeMinutes,
    breakTimeMinutes,
    rounds,
    restTimeMinutes,
    updateResting,
  ]);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={resting ? '#8C4E37' : '#F25D27'}
      />
      <View
        style={[
          styles.container,
          resting ? styles.containerRest : styles.containerFocus,
        ]}>
        <Text style={styles.timer}>{milliseconds}</Text>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => {
            if (focusing) {
              stopFocusing();
              return;
            }

            if (resting) {
              stopRest();
              return;
            }

            if (state === 'focused') {
              getRest();
            } else {
              getFocused();
            }
          }}>
          <View
            style={[
              styles.startButtonContent,
              resting
                ? styles.startButtonContentRest
                : styles.startButtonContentFocus,
            ]}>
            <Text
              style={[
                styles.title,
                resting ? styles.titleRest : styles.titleFocus,
              ]}>
              {focusing || resting
                ? 'STOP'
                : state === 'resting'
                ? 'GET\nFOCUSED'
                : 'GIVE A\nBREAK'}
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.rounds}>ROUND: {roundsCount}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerFocus: {
    backgroundColor: '#F25D27',
  },
  containerRest: {
    backgroundColor: '#8C4E37',
  },
  timer: {
    fontSize: 50,
    color: '#C7D9D7',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  rounds: {
    fontSize: 50,
    color: '#C7D9D7',
    fontWeight: 'bold',
    marginTop: 30,
  },
  startButton: {
    backgroundColor: '#C7D9D7',
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  restButton: {
    backgroundColor: '#C7D9D7',
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  startButtonContent: {
    width: 190,
    height: 190,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 95,
    borderWidth: 1,
  },
  startButtonContentFocus: {
    borderColor: '#F25D27',
  },
  startButtonContentRest: {
    borderColor: '#8C4E37',
  },
  title: {
    textAlign: 'center',
    color: '#F25D27',
    fontSize: 30,
    lineHeight: 50,
  },
  titleFocus: {
    color: '#F25D27',
  },
  titleRest: {
    color: '#8C4E37',
  },
});

export default Home;
