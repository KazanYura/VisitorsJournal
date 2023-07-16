import Icon from 'react-native-vector-icons/FontAwesome';
import React, {useContext} from 'react';
import {
  TouchableOpacity
} from 'react-native';
import {VisitorContext} from '../context/VisitorContext';
export const AddButton = () => {
    const {
        toggleOverlay
      } = useContext(VisitorContext);

      return (          <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          width: 100,
          position: 'absolute',
          bottom: 100,
          right: 10,
          height: 100,
          backgroundColor: '#fff',
          borderRadius: 100,
        }}
      >
        <Icon name='plus' size={40} color='#444B6E'  onPress={toggleOverlay} />
      </TouchableOpacity>);
}