import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {VisitorContext} from '../context/VisitorContext';

export const CustomHeader = () => {
  const {setIsCalendarFilterVisible, isCalendarFilterVisible, handleExport} =
    useContext(VisitorContext);

  return (
    <View style={styles.container}>
      <View style={styles.without_search_header}>
        <Text style={styles.title_text}>VisitorJournal</Text>
      </View>
      <View style={styles.icon_container}>
        <Icon
          name="calendar"
          size={35}
          style={styles.user_plus_icon}
          color="#3D315B"
          onPress={() => setIsCalendarFilterVisible(!isCalendarFilterVisible)}
        />
        <Icon
          name="download"
          size={35}
          style={styles.user_plus_icon}
          color="#3D315B"
          onPress={() => handleExport()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  without_search_header: {width: '75%', paddingLeft: 50},
  title_text: {color: 'black', fontSize: 26, fontWeight: 800},
  container: {
    display: 'flex',
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowOpacity: 0.2,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    elevation: 30,
  },
  icon_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '10%',
    marginLeft: '2%',
  },
  user_plus_icon: {marginLeft: 30, color: 'black'},
});
