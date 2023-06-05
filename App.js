import React from 'react';
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from 'react-native';
import {CustomHeader} from './src/header/CustomHeader';
import {VisitorContextValue} from './src/context/VisitorContext';
import {VisitorList} from './src/visitorlist/VisitorList';
import {AddVisitorOverlay} from './src/overlay/AddVisitorOverlay';
import {CustomCalendar} from './src/calendar/CustomCalendar';
import {SearchBar} from './src/header/SearchBar';
function App() {
  return (
    <SafeAreaView>
      <VisitorContextValue>
        <CustomHeader />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View>
            <SearchBar />
            <CustomCalendar />
            <VisitorList />
          </View>
        </TouchableWithoutFeedback>
        <AddVisitorOverlay />
      </VisitorContextValue>
    </SafeAreaView>
  );
}

export default App;
