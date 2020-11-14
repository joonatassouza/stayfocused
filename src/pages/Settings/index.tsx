import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useSettings} from '../../hooks/settings';

import Input from '../../components/Input';

const Settings: React.FC = () => {
  const {
    resting,
    workTimeMinutes,
    breakTimeMinutes,
    rounds,
    restTimeMinutes,
    updateWorkTimeMinutes,
    updateBreakTimeMinutes,
    updateRounds,
    updateRestTimeMinutes,
  } = useSettings();

  return (
    <View style={[styles.container, resting && styles.containerResting]}>
      <Text style={styles.title}>Setup your pomodoro</Text>
      <View style={styles.row}>
        <Input
          containerStyle={styles.inputContainer}
          icon="clock"
          placeholder="Focused minutes"
          keyboardType="number-pad"
          value={workTimeMinutes.toString()}
          onChangeText={(value) => updateWorkTimeMinutes(Number(value))}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            updateWorkTimeMinutes(Math.max(1, workTimeMinutes - 1))
          }>
          <Feather name="minus" color="#C7D9D7" size={40} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.plusButton]}
          onPress={() => updateWorkTimeMinutes(workTimeMinutes + 1)}>
          <Feather
            name="plus"
            color={resting ? '#8C4E37' : '#F25D27'}
            size={40}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Input
          containerStyle={styles.inputContainer}
          icon="clock"
          placeholder="Small break minutes"
          keyboardType="number-pad"
          value={breakTimeMinutes.toString()}
          onChangeText={(value) => updateBreakTimeMinutes(Number(value))}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            updateBreakTimeMinutes(Math.max(1, breakTimeMinutes - 1))
          }>
          <Feather name="minus" color="#C7D9D7" size={40} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.plusButton]}
          onPress={() => updateBreakTimeMinutes(breakTimeMinutes + 1)}>
          <Feather
            name="plus"
            color={resting ? '#8C4E37' : '#F25D27'}
            size={40}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Input
          containerStyle={styles.inputContainer}
          icon="rotate-ccw"
          placeholder="Rounds to rest"
          keyboardType="number-pad"
          mask="9"
          value={rounds.toString()}
          onChangeText={(value) => updateRounds(Number(value))}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => updateRounds(Math.max(1, rounds - 1))}>
          <Feather name="minus" color="#C7D9D7" size={40} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.plusButton]}
          onPress={() => updateRounds(rounds + 1)}>
          <Feather
            name="plus"
            color={resting ? '#8C4E37' : '#F25D27'}
            size={40}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Input
          containerStyle={styles.inputContainer}
          icon="clock"
          placeholder="Rest minutes"
          keyboardType="number-pad"
          value={restTimeMinutes.toString()}
          onChangeText={(value) => updateRestTimeMinutes(Number(value))}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            updateRestTimeMinutes(Math.max(1, restTimeMinutes - 1))
          }>
          <Feather name="minus" color="#C7D9D7" size={40} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.plusButton]}
          onPress={() => updateRestTimeMinutes(restTimeMinutes + 1)}>
          <Feather
            name="plus"
            color={resting ? '#8C4E37' : '#F25D27'}
            size={40}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F25D27',
  },
  containerResting: {
    backgroundColor: '#8C4E37',
  },
  inputContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  button: {
    width: 58,
    height: 58,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#C7D9D7',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  plusButton: {
    backgroundColor: '#C7D9D7',
  },
  title: {
    color: '#C7D9D7',
    fontSize: 20,
    marginVertical: 20,
  },
});

export default Settings;
