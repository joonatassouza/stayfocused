import React, {
  useCallback,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {Dimensions, StyleSheet, Text, TextInputProps, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {TextInputMask} from 'react-native-masked-text';

export interface CustomInputProps extends TextInputProps {
  icon: string;
  placeholder: string;
  mask?: string;
  containerStyle?: {};
}

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, CustomInputProps> = (
  {icon, placeholder, containerStyle = {}, mask = '999', ...rest},
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const [isFocused, setIsFocused] = useState(false);
  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  return (
    <View style={[styles.container, containerStyle]}>
      <Feather
        style={styles.icon}
        name={icon}
        size={20}
        color={isFocused ? '#F25D27' : '#C7D9D7'}
      />
      <Text style={styles.label}>{placeholder}</Text>
      <TextInputMask
        ref={inputElementRef}
        type={'custom'}
        options={{mask}}
        style={styles.textInput}
        keyboardAppearance="dark"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={(value) => {
          inputElementRef.current.value = value;
        }}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width - 20,
    height: 60,
    paddingVertical: 0,
    paddingHorizontal: 16,
    backgroundColor: '#F2A172',
    borderRadius: 10,
    marginBottom: 8,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 16,
  },
  label: {
    position: 'absolute',
    fontSize: 12,
    color: '#8C4E37',
    top: 0,
    left: 50,
  },
  textInput: {
    flex: 1,
    color: '#8C4E37',
    fontSize: 16,
  },
});

export default forwardRef(Input);
