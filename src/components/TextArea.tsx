import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  TextInput,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
  type TextInputProps,
  type TextInputFocusEventData,
  type NativeSyntheticEvent,
} from 'react-native';

import InputContainer from './InputContainer';

import useTheme from '../hooks/useTheme';

import { convertHexToRgba } from '../utils/uiUtils';
import Text from './Text';

type Props = TextInputProps & {
  style?: StyleProp<ViewStyle>;
  error?: boolean;
  label?: string;
  hint?: string;
  numberOfLines?: number;
  maxLength?: number;
  onChangeText?: (text: string) => void;
};

export type InputRef = { focus: () => void; blur: () => void };

export const TextArea = forwardRef<InputRef, Props>(
  (
    {
      style,
      editable = true,
      error,
      label,
      hint,
      onBlur,
      onFocus,
      numberOfLines = 4,
      maxLength = 1200,
      onChangeText,
      ...rest
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const { colors, theme } = useTheme();
    const inputRef = useRef<TextInput>(null);

    const value = useMemo(() => rest.value ?? '', [rest.value]);

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
    }));

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocused(false);
      onBlur?.(e);
    };

    const handleChangeText = (text: string) => {
      if (maxLength && text.length > maxLength) return;
      onChangeText?.(text);
    };

    return (
      <InputContainer
        style={style}
        label={label}
        hint={hint}
        error={error}
        onPress={() => inputRef.current?.focus()}
        contentContainerStyle={styles.container}
        focused={focused}
        disabled={!editable}
        height={numberOfLines * 22}
      >
        <TextInput
          {...rest}
          ref={inputRef}
          style={[
            styles.input,
            {
              fontFamily: theme.fonts.regular,
              color: colors.foreground,
              height: numberOfLines * 22,
            },
          ]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={convertHexToRgba(colors.foreground, 0.5)}
          editable={editable}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          textAlignVertical="top"
          onChangeText={handleChangeText}
          multiline
        />
        <Text
          variant="caption"
          style={[styles.caption, { color: colors.foreground }]}
        >
          {`${value.length ?? 0} / ${maxLength}`}
        </Text>
      </InputContainer>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 14,
    width: '100%',
  },
  caption: {
    marginBottom: 6,
    alignSelf: 'flex-end',
  },
});

export default TextArea;
