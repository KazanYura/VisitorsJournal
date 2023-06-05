import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {VisitorContext} from '../context/VisitorContext';

export const CustomHeader = () => {
  const {
    toggleOverlay,
    setIsCalendarFilterVisible,
    isCalendarFilterVisible,
    setSearchVisible,
    searchVisible,
  } = useContext(VisitorContext);
  return (
    <View style={styles.container}>
      <View style={styles.without_search_header}>
        <Text style={styles.title_text}>VisitorJournal</Text>
      </View>
      <View style={styles.icon_container}>
        <Icon
          name="search"
          size={35}
          color="#3D315B"
          style={styles.user_plus_icon}
          onPress={() => {
            setSearchVisible(!searchVisible);
          }}
        />
        <Icon
          name="calendar"
          size={35}
          style={styles.user_plus_icon}
          color="#3D315B"
          onPress={() => setIsCalendarFilterVisible(!isCalendarFilterVisible)}
        />
        <Icon
          name="user-plus"
          size={35}
          color="#3D315B"
          style={styles.user_plus_icon}
          onPress={toggleOverlay}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  without_search_header: {width: '70%', paddingLeft: 50},
  title_text: {color: 'white', fontSize: 26, fontWeight: 800},
  container: {
    display: 'flex',
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#444B6E',
  },
  icon_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '10%',
    marginLeft: '2%',
  },
  user_plus_icon: {marginLeft: 30, color: 'white'},
});
