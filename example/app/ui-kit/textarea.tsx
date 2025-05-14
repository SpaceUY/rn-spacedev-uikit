import { View, ScrollView } from 'react-native';
import { TextArea } from 'rn-spacedev-uikit';
import { useState } from 'react';

export default function InputsScreen() {
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 16, gap: 16 }}>
        {/* Basic Input */}
        <TextArea value={value} onChangeText={setValue} placeholder="Default" />
        <TextArea
          value={value2}
          onChangeText={setValue2}
          placeholder="4 Lines"
          maxLength={20}
        />
        <TextArea
          value={value3}
          onChangeText={setValue3}
          placeholder="8 Lines"
          numberOfLines={8}
          maxLength={100}
        />
        <TextArea
          value={value4}
          onChangeText={setValue4}
          placeholder="Disabled"
          editable={false}
        />
      </View>
    </ScrollView>
  );
}
