import React from 'react';
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  View
} from 'react-native';
import {CustomHeader} from './src/header/CustomHeader';
import {VisitorContextValue} from './src/context/VisitorContext';
import {VisitorList} from './src/visitorlist/VisitorList';
import {AddVisitorOverlay} from './src/overlay/AddVisitorOverlay';
import {CustomCalendar} from './src/calendar/CustomCalendar';
import { AddButton } from './src/overlay/AddButton';

function App() {
  return (
    <SafeAreaView>
      <VisitorContextValue>
        <CustomHeader />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View>
            <CustomCalendar />
            <VisitorList />
          </View>
        </TouchableWithoutFeedback>
        <AddVisitorOverlay />
        <AddButton/>
      </VisitorContextValue>
    </SafeAreaView>
  );
}

export default App;
