import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import {Alert} from 'react-native';
import {join, toDisplayTime} from '../constants/constants';
import xlsx from 'xlsx';
import {DownloadDirectoryPath, writeFile} from 'react-native-fs';
export const VisitorContext = React.createContext(null);

export const VisitorContextValue = ({children}) => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);
  const [isCalendarFilterVisible, setIsCalendarFilterVisible] = useState(false);
  const [startDateRange, setStartDateRange] = useState(null);
  const [visitorToEdit, setVisitorToEdit] = useState(null);
  const [endDateRange, setEndDateRange] = useState(null);
  const [addVisitorOverlayVisible, setAddVisitorOverlayVisible] =
    useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [visitorList, setVisitorList] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem('@MySuperStore:visitorsKey').then(res => {
      if (res !== null) {
        setVisitorList(
          JSON.parse(res).map(el => {
            return {
              ...el,
              enterTime: new Date(el.enterTime),
              leaveTime: el.leaveTime ? new Date(el.leaveTime) : null,
            };
          }),
        );
      }
    });
  }, []);
  const addVisitor = visitor => {
    const maxId = uuid.v4();
    AsyncStorage.setItem(
      '@MySuperStore:visitorsKey',
      JSON.stringify([...visitorList, {...visitor, id: maxId}]),
    );
    setVisitorList([...visitorList, {...visitor, id: maxId}]);
  };
  const deleteVisitor = visitor => {
    AsyncStorage.setItem(
      '@MySuperStore:visitorsKey',
      JSON.stringify([...visitorList.filter(el => el.id !== visitor.id)]),
    );
    setVisitorList([...visitorList.filter(el => el.id !== visitor.id)]);
  };

  const editVisitor = visitor => {
    AsyncStorage.setItem(
      '@MySuperStore:visitorsKey',
      JSON.stringify([
        ...visitorList.map(v => (v.id === visitor.id ? visitor : v)),
      ]),
    );
    setVisitorList([
      ...visitorList.map(v => (v.id === visitor.id ? visitor : v)),
    ]);
  };

  const exportDataToCsv = () => {
    let wb = xlsx.utils.book_new();

    let ws = xlsx.utils.json_to_sheet(
      visitorList.map(v => {
        return {
          ...v,
          enterTime: toDisplayTime(v.enterTime),
          leaveTime: toDisplayTime(v.leaveTime),
          visitDate: join(new Date(v.visitDate), '-'),
        };
      }),
      {
        header: [
          'id',
          'name',
          'visitDate',
          'enterTime',
          'leaveTime',
          'visitToName',
        ],
      },
    );
    xlsx.utils.book_append_sheet(wb, ws, 'Visitors');
    const wbout = xlsx.write(wb, {type: 'binary', bookType: 'csv'});
    writeFile(
      DownloadDirectoryPath +
        '/visitors_export_' +
        join(new Date(), '_') +
        '.csv',
      wbout,
      'ascii',
    )
      .then(res => {
        Alert.alert(
          'Data saved successfully',
          "Check 'Download' folder for file with name 'visitors_export_" +
            join(new Date(), '_') +
            ".csv'",
        );
      })
      .catch(() => {
        Alert.alert('Something went wrong');
      });
  };

  const handleExport = () => {
    exportDataToCsv();
  };

  const toggleOverlay = () => {
    setVisitorToEdit(null);
    setAddVisitorOverlayVisible(!addVisitorOverlayVisible);
  };

  const toggleOverlayForEdit = visitor => {
    setVisitorToEdit(visitor);
    setAddVisitorOverlayVisible(!addVisitorOverlayVisible);
  };
  return (
    <VisitorContext.Provider
      value={{
        searchPhrase,
        setSearchPhrase,
        searchClicked,
        setSearchClicked,
        visitorList,
        addVisitorOverlayVisible,
        toggleOverlay,
        setVisitorList,
        addVisitor,
        isCalendarFilterVisible,
        setIsCalendarFilterVisible,
        startDateRange,
        setSearchVisible,
        searchVisible,
        setStartDateRange,
        endDateRange,
        setEndDateRange,
        deleteVisitor,
        editVisitor,
        visitorToEdit,
        setVisitorToEdit,
        toggleOverlayForEdit,
        handleExport,
      }}>
      {children}
    </VisitorContext.Provider>
  );
};
