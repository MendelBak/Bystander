import React from 'react';
// import {ImageProps, StyleSheet} from 'react-native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {AppNavigator} from './src/navigation.component';

export default (): React.ReactFragment => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <AppNavigator />
    </ApplicationProvider>
  </>
  // <>
  //   <IconRegistry icons={EvaIconsPack} />
  //   <ApplicationProvider {...eva} theme={eva.light}>
  //     <Layout style={styles.container}>
  //       <Text style={styles.text} category="h1">
  //         Welcome to UI Kitten 😻
  //       </Text>
  //       <Text style={styles.text} category="s1">
  //         Start with editing App.js to configure your App
  //       </Text>
  //       <Text style={styles.text} appearance="hint">
  //         For example, try changing theme to Dark by using eva.dark
  //       </Text>
  //       <Button style={styles.likeButton} accessoryLeft={HeartIcon}>
  //         LIKE
  //       </Button>
  //     </Layout>
  //   </ApplicationProvider>
  // </>
);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     textAlign: 'center',
//   },
//   likeButton: {
//     marginVertical: 16,
//   },
// });