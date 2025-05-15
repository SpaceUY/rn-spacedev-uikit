import { forwardRef, useCallback, useRef, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import {
  View,
  Keyboard,
  type TextInputKeyPressEventData,
  type NativeSyntheticEvent,
  type ViewProps,
  type TextInputProps,
  type TextInput,
} from 'react-native';
import { OtpInput } from './OtpInput';
import useTheme from '../hooks/useTheme';
export type OtpInputContainerRef = {
  clear: () => void;
};

type OtpInputContainerProps = {
  inputProps?: Omit<
    TextInputProps,
    | 'style'
    | 'onChangeText'
    | 'onKeyPress'
    | 'autoComplete'
    | 'keyboardType'
    | 'autoFocus'
  >;
  inputStyle?: TextInputProps['style'];
  containerProps?: Omit<ViewProps, 'style'>;
  containerStyle?: ViewProps['style'];
  length?: number;
  onFillEnded?: (otp: string) => void;
  autoFocus?: boolean;
  editable?: boolean;
};

export const OtpInputContainer = forwardRef<
  OtpInputContainerRef,
  OtpInputContainerProps
>(
  (
    {
      length = 4,
      inputProps,
      inputStyle,
      containerProps,
      containerStyle,
      onFillEnded,
      autoFocus = true,
      editable = true,
    },
    _
  ) => {
    const isIOS = Platform.OS === 'ios';
    const pins = Array.from({ length }).map((_, i) => i);
    const inputRefs = useRef<TextInput[]>([]);
    const pinsValues = useRef<string[]>([]);
    const iosOTP = useRef<{
      key: string;
      index: number | null;
    }>({ key: '', index: null });
    const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

    const [maskedPins, setMaskedPins] = useState<boolean[]>(
      new Array(length).fill(false)
    );

    const { colors } = useTheme();

    const maskPin = useCallback((index: number) => {
      setMaskedPins((prev) => {
        const newMasked = [...prev];
        newMasked[index] = true;
        return newMasked;
      });
    }, []);

    const handleOTP = useCallback(
      (otp: string): boolean => {
        const regexp = new RegExp(`[0-9]{${length}}`);
        const otps = otp.match(regexp);
        if (otps?.length) {
          const otpSplits = otp.split('');
          otpSplits.forEach((otpSplit, i) =>
            inputRefs?.current[i]?.setNativeProps({ text: otpSplit })
          );
          onFillEnded?.(otp);
          iosOTP.current = { key: '', index: null };
          Keyboard.dismiss();
          return true;
        }
        return false;
      },
      [length, onFillEnded]
    );

    const handleChangeText = useCallback(
      async (text: string, index: number) => {
        pinsValues.current[index] = text;

        if (timeoutRefs.current[index]) {
          clearTimeout(timeoutRefs.current[index]);
        }

        setMaskedPins((prev) => {
          const newMasked = [...prev];
          newMasked[index] = false;
          return newMasked;
        });

        timeoutRefs.current[index] = setTimeout(() => {
          maskPin(index);
        }, 500);

        if (index + 1 <= pins.length - 1) {
          inputRefs?.current[index + 1]?.focus();
        } else {
          onFillEnded?.(pinsValues.current.join(''));
          Keyboard.dismiss();
        }
      },
      [maskPin, pins.length, onFillEnded]
    );

    const onKeyPress = useCallback(
      (
        event: NativeSyntheticEvent<TextInputKeyPressEventData>,
        index: number
      ) => {
        event.persist();
        if (isIOS && Number.isInteger(Number(event.nativeEvent.key))) {
          if (iosOTP.current.index === null) {
            iosOTP.current = { key: event.nativeEvent.key, index };
          } else {
            if (iosOTP.current.index === index) {
              iosOTP.current = {
                key: `${iosOTP.current.key}${event.nativeEvent.key}`,
                index,
              };
            } else {
              iosOTP.current = { key: '', index: null };
            }
          }
          if (iosOTP.current.key.length === length) {
            handleOTP(iosOTP.current.key);
            return;
          }
        }

        if (event.nativeEvent.key === 'Backspace') {
          onFillEnded?.('');
          iosOTP.current = { key: '', index: null };
          if (index - 1 >= 0) {
            inputRefs?.current[index - 1]?.focus();
          }
        }
      },
      [handleOTP, length, onFillEnded, isIOS]
    );

    return (
      <View style={[styles.container, containerStyle]} {...containerProps}>
        {pins.map((pin) => {
          return (
            <OtpInput
              {...inputProps}
              autoFocus={autoFocus && pin === 0}
              ref={(input) => inputRefs?.current.push(input as TextInput)}
              key={pin}
              style={[
                inputStyle,
                { borderColor: colors.border, color: colors.foreground },
              ]}
              onChangeText={(text) => handleChangeText(text, pin)}
              onKeyPress={(event) => onKeyPress(event, pin)}
              autoComplete="sms-otp"
              textContentType="oneTimeCode"
              keyboardType="numeric"
              secureTextEntry={maskedPins[pin]}
              editable={editable}
            />
          );
        })}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
