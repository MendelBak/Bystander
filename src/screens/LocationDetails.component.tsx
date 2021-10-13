import { Layout } from '@ui-kitten/components';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { TextInput } from 'react-native-gesture-handler';

const LocationDetailsScreen = observer(
  ({ navigation }: { navigation: any }) => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Layout style={styles.container}>
          <View style={styles.card__container}>
            <Text style={{ color: 'black' }}>FLOOR NUMBER</Text>
            <TextInput
              keyboardType={'phone-pad'}
              style={{
                height: 70,
                width: '90%',
                borderColor: 'gray',
                borderWidth: 1,
              }}
            />
            <Text style={{ color: 'black' }}>APARTMENT NUMBER</Text>
            <TextInput
              keyboardType={'numeric'}
              style={{
                height: 70,
                width: '90%',
                borderColor: 'gray',
                borderWidth: 1,
              }}
            />
            <Text style={{ color: 'black' }}>DOOR CODE</Text>
            <TextInput
              keyboardType={'numeric'}
              style={{
                height: 70,
                width: '90%',
                borderColor: 'gray',
                borderWidth: 1,
              }}
            />
            <Text style={{ color: 'black' }}>OTHER INFORMATION</Text>
            <TextInput
              style={{
                height: 70,
                width: '90%',
                borderColor: 'gray',
                borderWidth: 1,
              }}
            />
            <Button
              title="Continue"
              onPress={() => navigation.navigate('Hero')}>
              <Text>CONTINUE</Text>
            </Button>
          </View>
        </Layout>
      </SafeAreaView>
    );
  },
);

export default LocationDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'grey',
    backgroundColor: 'white',
  },
  card__container: {
    backgroundColor: 'white',
    alignItems: 'center',
    alignContent: 'space-between',
    display: 'flex',
    flexDirection: 'column',
    // flexWrap: 'wrap',
    width: '100%',
    height: '100%',
  },
  card: {
    backgroundColor: 'green',
    height: 50,
    width: '50%',
    alignItems: 'center',
    // textAlignVertical: 'top',
    borderWidth: 2,
    borderColor: 'red',
    marginBottom: 100,
  },
  continueButton: {
    backgroundColor: 'green',
    width: 1000,
    height: 500,
  },
});
