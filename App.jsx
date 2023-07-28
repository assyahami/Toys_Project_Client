/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Routers from './src/routers/Routers';
import { ToastProvider } from 'react-native-toast-notifications'
import { Provider } from 'react-redux'
import { store } from './src/store/store';

function App() {
  return (
    <Provider store={store}>
      <ToastProvider
        placement="top"
        duration={5000}
        animationType='zoom-in'
        animationDuration={250}
        successColor="#08bd38"
        dangerColor="#f72331"
        warningColor="#f79123"
        normalColor="gray"
        offset={50} // offset for both top and bottom toasts
        offsetTop={30}
        offsetBottom={40}
        renderType={{
          custom_type: (toast) => (
            <View style={{ width: '100%', padding: 15, backgroundColor: toast.data.type || 'red' }}>
              <Text>{toast.message}</Text>
            </View>
          )
        }}
        renderToast={(toast) => {
          return (
            <View style={{ padding: 15, backgroundColor: toast.data.type }}>
              <Text style={{
                fontSize: 15,
                fontWeight: 'bold',
              }}>{toast.message}</Text>
            </View>
          )
        }}
        swipeEnabled={true}
      >
        <Routers />
      </ToastProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
