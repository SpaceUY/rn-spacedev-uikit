import {
  FlatList,
  Keyboard,
  Pressable,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  Card,
  convertHexToRgba,
  Icon,
  IconButton,
  Input,
  Text,
} from 'rn-spacedev-uikit';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useTheme from '../../src/hooks/useTheme';
import { useEffect, useState } from 'react';
import ThemeSettingsModal from '../components/ThemeSettingsModal';

const components = [
  {
    name: 'Icons',
    route: 'ui-kit/icons',
    iconName: 'BadgeCheck',
  },
  {
    name: 'Buttons',
    route: 'ui-kit/buttons',
    iconName: 'SquareMousePointer',
  },
  {
    name: 'Tabs',
    route: 'ui-kit/tabs',
    iconName: 'AppWindow',
  },
  {
    name: 'Inputs',
    route: 'ui-kit/inputs',
    iconName: 'TextCursorInput',
  },
  {
    name: 'Texts',
    route: 'ui-kit/texts',
    iconName: 'LetterText',
  },
  {
    name: 'Cards',
    route: 'ui-kit/cards',
    iconName: 'SquareEqual',
  },
  {
    name: 'Select',
    route: 'ui-kit/select',
    iconName: 'ListCheck',
  },
  {
    name: 'Checkboxes',
    route: 'ui-kit/checkboxes',
    iconName: 'SquareCheck',
  },
  {
    name: 'Loaders',
    route: 'ui-kit/loaders',
    iconName: 'LoaderCircle',
  },
  {
    name: 'Chips',
    route: 'ui-kit/chips',
    iconName: 'Tag',
  },
  {
    name: 'Icon Buttons',
    route: 'ui-kit/icon-buttons',
    iconName: 'SquareMousePointer',
  },
  {
    name: 'Switches',
    route: 'ui-kit/switches',
    iconName: 'ToggleRight',
  },
  {
    name: 'Textarea',
    route: 'ui-kit/textarea',
    iconName: 'WrapText',
  },
  {
    name: 'Otp Input',
    route: 'ui-kit/otp-input',
    iconName: 'ScanEye',
  },
];

export default function UIKitScreen() {
  const [search, setSearch] = useState('');
  const [filteredComponents, setFilteredComponents] = useState(components);
  const [isThemeModalVisible, setIsThemeModalVisible] = useState(false);
  const { top, bottom } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { colors, theme } = useTheme();

  const cardSize = (width - 48) / 2;

  useEffect(() => {
    setFilteredComponents(
      components.filter((component) =>
        component.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, paddingTop: top + 16 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 16,
            marginBottom: 16,
            gap: 16,
          }}
        >
          <Input
            style={{ flex: 1 }}
            iconName="Search"
            placeholder="Search"
            value={search}
            onChangeText={setSearch}
            clearable
          />
          <IconButton
            style={{}}
            iconName="Palette"
            variant="outline"
            size="large"
            onPress={() => setIsThemeModalVisible(true)}
          />
        </View>

        <FlatList
          data={filteredComponents}
          numColumns={2}
          contentContainerStyle={{
            gap: 16,
            paddingHorizontal: 8,
            paddingBottom: bottom + 16,
          }}
          renderItem={({ item }) => (
            <Pressable
              style={{ marginHorizontal: 8 }}
              onPress={() => router.push(item.route)}
            >
              <Card
                style={{
                  width: cardSize,
                  height: cardSize,
                }}
              >
                <View
                  style={{
                    flex: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: convertHexToRgba(colors.primary, 0.1),
                    borderRadius: theme.roundness,
                    overflow: 'hidden',
                  }}
                >
                  {/* <View
                    style={[
                      StyleSheet.absoluteFill,
                      {
                        backgroundColor: convertHexToRgba(colors.primary, 0.1),
                      },
                    ]}
                  /> */}
                  <Icon
                    name={item.iconName as any}
                    size={40}
                    color={colors.primary}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 16,
                  }}
                >
                  <Text style={{ flex: 1 }} variant="h3" numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Icon
                    style={{ marginLeft: 8 }}
                    name="ChevronRight"
                    size={24}
                    color={colors.foreground}
                  />
                </View>
              </Card>
            </Pressable>
          )}
        />

        <ThemeSettingsModal
          visible={isThemeModalVisible}
          onClose={() => setIsThemeModalVisible(false)}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
