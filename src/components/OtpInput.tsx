import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  type NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  type TextInputProps,
  type TextInputKeyPressEventData,
} from 'react-native';
import { convertHexToRgba } from '../utils/uiUtils';
import useTheme from '../hooks/useTheme';

export const OtpInput = forwardRef<TextInput, TextInputProps>(
  (
    {
      placeholder = '*',
      style,
      onChangeText,
      onKeyPress,
      editable = true,
      ...rest
    }: TextInputProps,
    ref
  ) => {
    const innerRef = useRef<TextInput>(null);
    const [value, setValue] = useState<string>('');
    const [innerPlaceholder, setInnerPlaceholder] =
      useState<string>(placeholder);
    const { colors } = useTheme();

    useImperativeHandle(ref, () => innerRef.current as TextInput);

    const onFocus = useCallback(() => setInnerPlaceholder(''), []);

    const onBlur = useCallback(() => {
      if (!value?.length) {
        setInnerPlaceholder(placeholder);
      }
    }, [placeholder, value?.length]);

    const handleChangeText = useCallback(
      (text: string) => {
        const regex = /^\d+$/;
        if (regex.test(text)) {
          setValue(text);
          onChangeText?.(text);
        } else {
          innerRef.current?.setNativeProps({ text: '' });
        }
      },
      [onChangeText]
    );

    const handleKeyPress = useCallback(
      (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        if (event.nativeEvent.key === 'Backspace') {
          setValue('');
          innerRef.current?.setNativeProps({ text: '' });
          if (!innerRef?.current?.isFocused()) {
            innerRef.current?.setNativeProps({ placeholder: innerPlaceholder });
          }
        }
        onKeyPress?.(event);
      },
      [innerPlaceholder, onKeyPress]
    );

    return (
      <TextInput
        ref={innerRef}
        {...rest}
        placeholderTextColor={convertHexToRgba(colors.foreground, 0.5)}
        style={[
          styles.container,
          style,
          { backgroundColor: colors.background },
        ]}
        placeholder={innerPlaceholder}
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeText={handleChangeText}
        maxLength={1}
        onKeyPress={handleKeyPress}
        keyboardType="number-pad"
        editable={editable}
        textAlignVertical="center"
        textAlign="center"
      />
    );
  }
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 10,
    fontWeight: 'normal',
    borderWidth: 1,
    borderRadius: 8,
    height: 71,
    width: 80,
  },
});
