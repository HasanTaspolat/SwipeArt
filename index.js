import { registerRootComponent } from 'expo';

import App from './App';    

/* if (Platform.OS === 'iOS') {
    const rootTag = document.getElementById('root') || document.getElementById('swiperart');
    AppRegistry.runApplication('swiperart', { rootTag });
} */
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
