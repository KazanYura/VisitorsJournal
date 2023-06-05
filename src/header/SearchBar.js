import React from 'react';
import {StyleSheet, View, TextInput, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {useContext} from 'react';
import {VisitorContext} from '../context/VisitorContext';

export const SearchBar = () => {
  const {
    searchPhrase,
    searchVisible,
    setSearchPhrase,
    searchClicked,
    setSearchClicked,
  } = useContext(VisitorContext);
  return searchVisible ? (
    <View style={styles.container}>
      <View
        style={
          searchClicked
            ? styles.searchBar__clicked
            : styles.searchBar__unclicked
        }>
        <Icon
          name="search"
          size={20}
          color="black"
          style={styles.search_icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          keyboardType="web-search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setSearchClicked(true);
          }}
        />
        {searchClicked && searchPhrase && (
          <Entypo
            name="cross"
            size={25}
            color="black"
            style={styles.cross_icon}
            onPress={() => {
              setSearchPhrase('');
              Keyboard.dismiss();
            }}
          />
        )}
      </View>
    </View>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    marginLeft: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '80%',
  },
  searchBar__unclicked: {
    padding: 5,
    flexDirection: 'row',
    width: '95%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
  },
  searchBar__clicked: {
    padding: 5,
    flexDirection: 'row',
    width: '80%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    height: 50,
    width: '90%',
  },
  search_icon: {marginLeft: 12},
  cross_icon: {padding: 1, right: 15, position: 'absolute'},
});
