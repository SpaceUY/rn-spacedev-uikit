import { useEffect, useRef, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  Icon,
  OtpInputContainer,
  Text,
  useUIKitTheme,
  type OtpInputContainerRef,
} from 'rn-spacedev-uikit';

const validateSequentialPin = (pin: string) => {
  const digits = pin.split('').map(Number);
  const isAscending = digits.every(
    (digit, i) => i === 0 || digit === digits[i - 1]! + 1
  );
  const isDescending = digits.every(
    (digit, i) => i === 0 || digit === digits[i - 1]! - 1
  );

  return isAscending || isDescending;
};

const validateSameDigits = (pin: string) => {
  return /^(\d)\1{3}$/.test(pin);
};

const validateMinMaxChar = (pin: string) => {
  return /^\d{4}$/.test(pin);
};

export default function OtpInputScreen() {
  const otpInputRef = useRef<OtpInputContainerRef>(null);
  const otpInputRef2 = useRef<OtpInputContainerRef>(null);
  const otpInputRef3 = useRef<OtpInputContainerRef>(null);
  const otpInputRef4 = useRef<OtpInputContainerRef>(null);
  const { colors } = useUIKitTheme();

  const [value, setValue] = useState('');
  const [minMaxChar, setMinMaxChar] = useState(false);
  const [sequential, setSequential] = useState(false);
  const [sameDigits, setSameDigits] = useState(false);

  useEffect(() => {
    setMinMaxChar(validateMinMaxChar(value));
    setSequential(validateSequentialPin(value));
    setSameDigits(!validateSameDigits(value) && value.length === 4);
  }, [value]);

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Basic Input */}
        <Text variant="h1">Basic Input</Text>
        <OtpInputContainer
          ref={otpInputRef}
          length={4}
          inputStyle={styles.otpInput}
        />

        <Text variant="h1">Disabled Input</Text>
        <OtpInputContainer
          ref={otpInputRef2}
          length={4}
          inputStyle={styles.otpInput}
          editable={false}
        />

        <Text variant="h1">Longer Input</Text>
        <OtpInputContainer
          ref={otpInputRef3}
          length={6}
          inputStyle={styles.otpInput}
        />

        <Text variant="h1">With Validations</Text>
        <OtpInputContainer
          ref={otpInputRef4}
          length={4}
          inputStyle={styles.otpInput}
          onFillEnded={setValue}
        />
        <View style={{ gap: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                width: '50%',
              }}
            >
              <Icon
                size={12}
                name={minMaxChar ? 'BadgeCheck' : 'BadgeX'}
                color={minMaxChar ? 'green' : colors.border}
              />
              <Text
                variant="ps"
                style={{ color: minMaxChar ? 'green' : colors.border }}
              >
                4 dígitos
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
            >
              <Icon
                size={12}
                name={!sequential ? 'BadgeCheck' : 'BadgeX'}
                color={!sequential ? 'green' : colors.border}
              />
              <Text
                variant="ps"
                style={{ color: !sequential ? 'green' : colors.border }}
              >
                No debe ser secuencial
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                width: '50%',
              }}
            >
              <Icon
                size={12}
                name={sameDigits ? 'BadgeCheck' : 'BadgeX'}
                color={sameDigits ? 'green' : colors.border}
              />
              <Text
                variant="ps"
                style={{ color: sameDigits ? 'green' : colors.border }}
              >
                No debe tener dígitos iguales
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    padding: 16,
    gap: 16,
  },
  otpInput: {
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
    width: 48,
  },
});
