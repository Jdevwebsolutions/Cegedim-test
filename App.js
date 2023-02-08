import React from 'react';
import { Provider } from 'react-redux'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Router from './navigation/Router';
import configStore from "./redux/store";

const store = configStore();
const App = () => (
        <Provider store={store}>
            <SafeAreaProvider>
                <StatusBar />
                <Router />
            </SafeAreaProvider>
        </Provider>
    )

export default App;
