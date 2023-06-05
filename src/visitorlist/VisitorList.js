import React, {useContext, useEffect, useState} from 'react';
import {VisitorContainer} from './VisitorContainer';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {VisitorContext} from '../context/VisitorContext';
import {groupBy, join} from '../constants/constants';
import moment from 'moment';
import {Image} from 'react-native-elements';

export const VisitorList = () => {
  const {visitorList, searchPhrase, startDateRange, endDateRange} =
    useContext(VisitorContext);
  const [dateRange, setDateRange] = useState([]);
  const [visitorsByDate, setVisitorsByDate] = useState(null);
  const [dataExists, setDataExists] = useState(false);
  useEffect(() => {
    if (endDateRange && startDateRange && visitorList) {
      setVisitorsByDate(
        groupBy(visitorList, v => join(new Date(v.visitDate), '-')),
      );
      const diff = endDateRange.diff(startDateRange, 'days');
      let range = [];
      for (let i = 0; i < diff; i++) {
        range.push(join(moment(startDateRange).add(i, 'days'), '-'));
      }
      setDateRange(range);
    }
  }, [startDateRange, endDateRange, visitorList]);

  useEffect(() => {
    if (visitorsByDate) {
      setDataExists(
        dateRange.some(el => Array.from(visitorsByDate.keys()).includes(el)),
      );
    } else {
      setDataExists(false);
    }
  }, [visitorsByDate, dateRange]);

  return dataExists ? (
    <ScrollView style={styles.scroll_view_container}>
      {dateRange.map(
        date =>
          visitorsByDate.get(date) &&
          visitorsByDate
            .get(date)
            .filter(visitor => visitor.name.includes(searchPhrase)).length >
            0 && (
            <View id={visitorsByDate.get(date).id}>
              <View style={styles.inner_container}>
                <Text style={styles.date_font}>{date}</Text>
              </View>
              {visitorsByDate
                .get(date)
                .filter(visitor => visitor.name.includes(searchPhrase))
                .sort((a, b) => a.enterTime - b.enterTime)
                .map(visitor => (
                  <VisitorContainer id={visitor.id} visitor={visitor} />
                ))}
            </View>
          ),
      )}
    </ScrollView>
  ) : (
    <View style={styles.missing_items_container}>
      <Image
        source={require('../img/no_items.png')}
        style={styles.missing_items_image}
      />
      <Text style={styles.no_data_message}>No Data to display</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  scroll_view_container: {margin: 20, height: '90%'},
  inner_container: {marginBottom: 10},
  time_container: {width: '15%'},
  date_font: {fontSize: 24, fontWeight: 800},
  missing_items_container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  },
  missing_items_image: {height: 150, width: 150, marginBottom: 20},
  no_data_message: {fontSize: 22},
});
