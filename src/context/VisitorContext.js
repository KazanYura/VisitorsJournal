import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
              leaveTime: new Date(el.leaveTime),
            };
          }),
        );
      }
    });
  }, []);
  const addVisitor = visitor => {
    const maxId = Math.max(visitorList.map(v => v.id));
    AsyncStorage.setItem(
      '@MySuperStore:visitorsKey',
      JSON.stringify([...visitorList, {...visitor, id: maxId + 1}]),
    );
    setVisitorList([...visitorList, {...visitor, id: maxId + 1}]);
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
      }}>
      {children}
    </VisitorContext.Provider>
  );
};
