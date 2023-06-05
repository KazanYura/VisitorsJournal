import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableHighlight,
} from 'react-native';
import {Button, Overlay} from 'react-native-elements';
import {VisitorContext} from '../context/VisitorContext';
import Entypo from 'react-native-vector-icons/Entypo';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {join, toDisplayTime} from '../constants/constants';

export const AddVisitorOverlay = () => {
  const {
    addVisitorOverlayVisible,
    toggleOverlay,
    addVisitor,
    visitorToEdit,
    editVisitor,
  } = useContext(VisitorContext);
  const [visitorName, setVisitorName] = useState(null);
  const [visitDate, setVisitDate] = useState(Date.now());
  const [visitorHostName, setVisitorHostName] = useState(null);
  const [visitReason, setVisitReason] = useState(null);
  const [
    isVisitorEnterTimeDatePickerVisible,
    setVisitorEnterTimeDatePickerVisible,
  ] = useState(false);

  const [
    isVisitorLeaveTimeDatePickerVisible,
    setVisitorLeaveTimeDatePickerVisible,
  ] = useState(false);

  const [isVisitorDatePickerVisible, setVisitorDatePickerVisible] =
    useState(false);
  const [visitorEnterTime, setVisitorEnterTime] = useState(null);
  const [visitorLeaveTime, setVisitorLeaveTime] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [timeRangeErrorMessage, setTimeRangeErrorMessage] = useState(null);
  useEffect(() => {
    if (!visitorToEdit) {
      setVisitorName(null);
      setVisitorHostName(null);
      setVisitReason(null);
      setVisitorEnterTime(null);
      setVisitDate(Date.now());
      setVisitorLeaveTime(null);
      setErrorMessage(null);
    } else {
      setVisitorName(visitorToEdit.name);
      setVisitorHostName(visitorToEdit.visitToName);
      setVisitReason(visitorToEdit.visitReason);
      setVisitorEnterTime(visitorToEdit.enterTime);
      setVisitDate(visitorToEdit.visitDate);
      setVisitorLeaveTime(visitorToEdit.leaveTime);
    }
  }, [addVisitorOverlayVisible, visitorToEdit]);

  const submitForm = () => {
    const vError = [
      !visitorName && 'Visitor name',
      !visitReason && 'Visit reason',
      !visitorEnterTime && 'Enter time',
      !visitorLeaveTime && 'Leave time',
      !visitorHostName && 'Host name',
      !visitDate && 'Visit Date',
      visitorEnterTime &&
        visitorLeaveTime &&
        visitorLeaveTime < visitorEnterTime &&
        'timeRange',
    ];
    if (vError.filter(v => v).length === 0) {
      const visitor = {
        name: visitorName,
        visitReason: visitReason,
        enterTime: visitorEnterTime,
        leaveTime: visitorLeaveTime,
        visitToName: visitorHostName,
        visitDate: visitDate,
      };
      !visitorToEdit && addVisitor(visitor);
      visitorToEdit && editVisitor({...visitor, id: visitorToEdit.id});
      toggleOverlay();
    } else {
      const eMessage =
        'Missing fields: ' +
        vError
          .filter(v => v)
          .filter(v => v !== 'timeRange')
          .join(', ');
      setErrorMessage(eMessage);
      if (vError.includes('timeRange')) {
        setTimeRangeErrorMessage(
          'Leave time cannot be earlier then enter time',
        );
      }
    }
  };

  return (
    <Overlay
      isVisible={addVisitorOverlayVisible}
      onBackdropPress={toggleOverlay}>
      <View style={styles.overlay_header}>
        <Text style={styles.overlay_header_text}>
          {visitorToEdit ? 'Edit Visitor' : 'Add Visitor'}
        </Text>
        <Entypo
          name="cross"
          size={25}
          color="black"
          style={styles.cross_icon}
          onPress={toggleOverlay}
        />
      </View>
      <View style={styles.main_container}>
        <View style={styles.input_container}>
          <TextInput
            style={styles.input}
            placeholder="Visitor Name"
            keyboardType="web-search"
            value={visitorName}
            onChangeText={setVisitorName}
          />
        </View>
        <View style={styles.input_container}>
          <TextInput
            style={styles.input}
            placeholder="Host Name"
            keyboardType="web-search"
            value={visitorHostName}
            onChangeText={setVisitorHostName}
          />
        </View>
        <View style={styles.input_container}>
          <TextInput
            style={styles.input}
            placeholder="Visit Reason"
            keyboardType="web-search"
            value={visitReason}
            onChangeText={setVisitReason}
          />
        </View>
        <TouchableHighlight
          style={styles.date_container}
          onPress={() => {
            setVisitorDatePickerVisible(true);
          }}
          underlayColor="white">
          <View style={styles.input_container}>
            <TextInput
              style={styles.date_input}
              placeholder="Enter visit date"
              value={join(visitDate, '-')}
              editable={false}
            />
          </View>
        </TouchableHighlight>
        <View style={styles.double_container}>
          <TouchableHighlight
            onPress={() => {
              setVisitorEnterTimeDatePickerVisible(true);
            }}
            underlayColor="white">
            <View style={styles.input_half_container}>
              <TextInput
                style={styles.input}
                placeholder="Enter time"
                value={toDisplayTime(visitorEnterTime)}
                editable={false}
              />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              setVisitorLeaveTimeDatePickerVisible(true);
            }}
            underlayColor="white">
            <View style={styles.input_half_container}>
              <TextInput
                style={styles.input}
                placeholder="Leave time"
                value={toDisplayTime(visitorLeaveTime)}
                editable={false}
              />
            </View>
          </TouchableHighlight>
        </View>
        <DateTimePickerModal
          isVisible={isVisitorEnterTimeDatePickerVisible}
          mode="time"
          onConfirm={time => {
            setVisitorEnterTime(time);
            setVisitorEnterTimeDatePickerVisible(false);
          }}
          onCancel={() => {
            setVisitorEnterTimeDatePickerVisible(false);
          }}
          is24Hour={true}
        />
        <DateTimePickerModal
          isVisible={isVisitorLeaveTimeDatePickerVisible}
          mode="time"
          onConfirm={time => {
            setVisitorLeaveTime(time);
            setVisitorLeaveTimeDatePickerVisible(false);
          }}
          onCancel={() => {
            setVisitorLeaveTimeDatePickerVisible(false);
          }}
          is24Hour={true}
        />
        <DateTimePickerModal
          isVisible={isVisitorDatePickerVisible}
          mode="date"
          onConfirm={date => {
            setVisitDate(date);
            setVisitorDatePickerVisible(false);
          }}
          onCancel={() => {
            setVisitorDatePickerVisible(false);
          }}
        />
        {errorMessage && (
          <View style={styles.error_message_container}>
            <Text style={styles.error_message}>{errorMessage}</Text>
            <Text style={styles.error_message}>{timeRangeErrorMessage}</Text>
          </View>
        )}
      </View>
      <View>
        <Button
          title={'Save'}
          buttonStyle={styles.save_button}
          onPress={() => {
            submitForm();
          }}
        />
      </View>
    </Overlay>
  );
};
const styles = StyleSheet.create({
  main_container: {width: '80%'},
  overlay_header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#3D315B',
    padding: 10,
  },
  date_container: {width: '100%'},
  double_container: {
    marginLeft: 50,
    display: 'flex',
    flexDirection: 'row',
  },
  error_message_container: {marginLeft: 50, marginBottom: 50, width: '70%'},
  error_message: {color: '#C44536', fontSize: 22},
  overlay_header_text: {fontSize: 26, fontWeight: 800, height: 45},
  input_container: {
    padding: 5,
    flexDirection: 'row',
    width: '90%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 50,
    marginLeft: 50,
  },
  input_half_container: {
    padding: 5,
    flexDirection: 'row',
    width: '60%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 50,
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    height: 50,
    width: '80%',
    color: 'black',
  },
  date_input: {
    fontSize: 20,
    marginLeft: 10,
    height: 50,
    width: '80%',
    color: 'black',
  },
  cross_icon: {
    fontSize: 28,
    marginTop: -12,
  },
  save_button: {height: 50, backgroundColor: '#444B6E'},
});
