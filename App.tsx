import React from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { AppNavigator } from './src/components/navigation/Navigation.component';
import { LogBox } from 'react-native';
import { customTheme } from './custom-theme';

export default (): React.ReactFragment => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...customTheme }}>
      <AppNavigator />
    </ApplicationProvider>
  </>
);

// Ignore log notification by message
// Invalid props.style key `tintColor` supplied to `Text`. is a UI KItten issue. Icons are rended as `Text`, but `tintColor` only applies to `Image`. Supposed to be fixed by UI Kitten, but was not.
LogBox.ignoreLogs([
  'Warning: Failed prop type: Invalid props.style key `tintColor` supplied to `Text`.',
]);
