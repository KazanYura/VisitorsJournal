import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import {Button} from 'react-native-elements';
import {VisitorContext} from '../context/VisitorContext';
import {getPreviousMonday, getNextMonday, join} from '../constants/constants';

export const CustomCalendar = () => {
  const {
    startDateRange,
    setStartDateRange,
    setEndDateRange,
    isCalendarFilterVisible,
    setIsCalendarFilterVisible,
  } = useContext(VisitorContext);
  const [markedDates, setMarkedDates] = useState({});
  const [isStartDatePicked, setIsStartDatePicked] = useState(false);
  const [isEndDatePicked, setIsEndDatePicked] = useState(false);

  useEffect(() => {
    const mondayDate = getPreviousMonday(new Date());
    const nextMondayDate = getNextMonday(new Date());
    const startDate = moment(mondayDate);
    let date = {};
    date[join(mondayDate, '-')] = {
      startingDay: true,
      color: '#444B6E',
      textColor: '#FFFFFF',
    };
    let endDate = moment(nextMondayDate);
    let range = endDate.diff(startDate, 'days');
    for (let i = 1; i <= range; i++) {
      let tempDate = startDate.add(1, 'day');
      tempDate = moment(tempDate).format('YYYY-MM-DD');
      if (i < range) {
        date[tempDate] = {color: '#444B6E', textColor: '#FFFFFF'};
      } else {
        date[tempDate] = {
          endingDay: true,
          color: '#444B6E',
          textColor: '#FFFFFF',
        };
      }
    }
    setMarkedDates(date);
    setIsEndDatePicked(true);
    setStartDateRange(moment(mondayDate));
    setEndDateRange(moment(nextMondayDate));
  }, [setEndDateRange, setStartDateRange]);

  const onDayPress = day => {
    if (!isStartDatePicked) {
      let date = {};
      date[day.dateString] = {
        startingDay: true,
        color: '#444B6E',
        textColor: '#FFFFFF',
      };
      setMarkedDates(date);
      setIsStartDatePicked(true);
      setStartDateRange(moment(day.dateString));
      setIsEndDatePicked(false);
    } else {
      let date = moment(day.dateString);
      let range = date.diff(startDateRange, 'days');
      let dates = {};
      if (range > 0) {
        let startDate = startDateRange.clone();
        for (let i = 1; i <= range; i++) {
          let tempDate = startDate.add(1, 'day');
          tempDate = moment(tempDate).format('YYYY-MM-DD');
          if (i < range) {
            dates[tempDate] = {color: '#444B6E', textColor: '#FFFFFF'};
          } else {
            dates[tempDate] = {
              endingDay: true,
              color: '#444B6E',
              textColor: '#FFFFFF',
            };
          }
        }
        setMarkedDates({...markedDates, ...dates});
        setIsStartDatePicked(false);
        setIsEndDatePicked(true);
        setEndDateRange(moment(day.dateString));
      }
    }
  };
  return isCalendarFilterVisible ? (
    <View>
      <Calendar
        markingType={'period'}
        style={styles.container}
        markedDates={markedDates}
        theme={{
          textDayHeaderFontWeight: 500,
          selectedDayBackgroundColor: '#00adf5',
          textDayFontSize: 18,
          textMonthFontSize: 24,
          textDayHeaderFontSize: 20,
          textSectionTitleColor: 'black',
          textMonthFontWeight: 'bold',
        }}
        renderArrow={direction =>
          direction === 'left' ? (
            <Icon name="arrow-circle-o-left" size={35} color="#444B6E" />
          ) : (
            <Icon name="arrow-circle-o-right" size={35} color="#444B6E" />
          )
        }
        onPressArrowLeft={subtractMonth => subtractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        onDayPress={day => {
          onDayPress(day);
        }}
      />
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={styles.clearButton}
          title={'Clear'}
          onPress={() => {
            setMarkedDates({});
            setStartDateRange(null);
            setEndDateRange(null);
            setIsStartDatePicked(false);
          }}
        />
        <Button
          buttonStyle={styles.button}
          title={'Submit'}
          disabled={!isEndDatePicked}
          onPress={() => {
            setIsCalendarFilterVisible(false);
          }}
        />
      </View>
    </View>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 350,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingLeft: '10%',
    marginTop: 30,
    paddingRight: '10%',
    justifyContent: 'space-between',
  },
  button: {height: 50, backgroundColor: '#444B6E', width: '95%'},
  clearButton: {height: 50, backgroundColor: '#C44536', width: '95%'},
});
