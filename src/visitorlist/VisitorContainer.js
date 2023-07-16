import React, {useContext} from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import {Divider} from 'react-native-elements';
import {
  DIVISORS_COLORS,
  DEFAULT_FONT_STYLE,
  BIGGER_FONT_STYLE,
  toDisplayTime,
} from '../constants/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {VisitorContext} from '../context/VisitorContext';
export const VisitorContainer = ({visitor}) => {
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * DIVISORS_COLORS.length);
  };
  const {deleteVisitor, toggleOverlayForEdit} = useContext(VisitorContext);
  return (
    <TouchableHighlight
      onPress={() => {
        toggleOverlayForEdit(visitor);
      }}
      underlayColor="white"
      style={styles.main_action_container}>
      <View style={styles.inner_container}>
        <View style={styles.time_container}>
          <Text style={styles.general_font}>
            From: {toDisplayTime(visitor.enterTime)}
          </Text>
          <Text style={styles.general_font}>
            To: {toDisplayTime(visitor.leaveTime, true)}
          </Text>
        </View>
        <Divider
          orientation="vertical"
          width={5}
          color={DIVISORS_COLORS[generateRandomNumber()]}
        />
        <View style={styles.guest_info_container}>
          <Text style={styles.bigger_font}>Guest Name: {visitor.name}</Text>
          <Text style={styles.space_save}>
            Responsible Person: {visitor.visitToName}
          </Text>
          <Text style={styles.general_font}>
            Reason for visit: {visitor.visitReason}
          </Text>
        </View>
        <View style={styles.action_button_container}>
          <Icon
            name="edit"
            size={40}
            color="#444B6E"
            style={styles.user_plus_icon}
            onPress={() => {
              toggleOverlayForEdit(visitor);
            }}
          />
          <Icon
            name="delete"
            size={45}
            color="#C44536"
            style={styles.icon}
            onPress={() => {
              deleteVisitor(visitor);
            }}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
};
const styles = StyleSheet.create({
  main_action_container: {marginBottom: 40},
  inner_container: {display: 'flex', flexDirection: 'row'},
  time_container: {width: '15%'},
  general_font: DEFAULT_FONT_STYLE,
  space_save: {fontSize: 20, width: '75%', marginRight: '10%'},
  bigger_font: BIGGER_FONT_STYLE,
  guest_info_container: {marginLeft: 20, width: '65%'},
  guest_additional_info_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  action_button_container: {display: 'flex', flexDirection: 'row'},
  icon: {marginLeft: 30, marginRight: 50},
});
