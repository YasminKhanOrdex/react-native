/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Upload from './Upload';
import List from './List';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => List);
