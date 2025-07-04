import { useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Chip, Text } from '@space-uy/pulsar-ui';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import ResponsiveScroll from '../../components/ResponsiveScroll';

export default function ChipsExample() {
  const { showHeader } = useLocalSearchParams<{ showHeader: string }>();
  const headerVisible = showHeader !== 'false';
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: headerVisible,
    });
  }, [navigation, headerVisible]);

  return (
    <ResponsiveScroll>
      {headerVisible && (
        <View style={styles.section}>
          <Text variant="h2" style={styles.sectionTitle}>
            Chips
          </Text>
          <Text variant="pm" style={styles.sectionDescription}>
            Compact elements for displaying information or actions
          </Text>
        </View>
      )}

      <Card
        variant="tinted"
        style={[styles.exampleContainer, headerVisible && styles.firstExample]}
      >
        <Text variant="h4" style={styles.exampleTitle}>
          Chip Sizes
        </Text>
        <View style={styles.chipRow}>
          <Chip text="Small" size="small" />
          <Chip text="Medium" />
          <Chip text="Large" />
        </View>
      </Card>

      <Card variant="tinted" style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Chip States
        </Text>
        <View style={styles.chipRow}>
          <Chip text="Normal" />
          <Chip text="Selected" />
          <Chip text="Disabled" disabled />
        </View>
      </Card>

      <Card variant="tinted" style={styles.exampleContainer}>
        <Text variant="h4" style={styles.exampleTitle}>
          Usage Example - Tags
        </Text>
        <View style={styles.chipContainer}>
          <Chip text="React Native" />
          <Chip text="TypeScript" />
          <Chip text="UI Kit" />
          <Chip text="Design System" />
          <Chip text="Mobile" />
          <Chip text="Cross Platform" />
        </View>
      </Card>

      <View style={styles.spacer} />
    </ResponsiveScroll>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  section: { marginTop: 16 },
  firstExample: { marginTop: 16 },
  sectionTitle: { marginBottom: 8 },
  sectionDescription: { opacity: 0.7 },
  exampleContainer: { marginBottom: 24 },
  exampleTitle: { marginBottom: 12 },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  spacer: { height: 40 },
});
