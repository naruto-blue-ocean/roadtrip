import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import AddPOI from './AddPOI';
import POIList from './POIList';

const screens = {
  AddPOI: {
    screen: AddPOI,
  },
  POIList: {
    screen: POIList,
  }
}

const NavStack = createStackNavigator(screens);
export default createAppContainer(NavStack);