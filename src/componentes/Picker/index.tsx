import React from 'react';
import { Picker as PickerRn } from '@react-native-picker/picker';

import { Container, Icon } from './styles';

const Picker = ({ icon, data, setValue, value, ...rest }: any) => {
  return (
    <Container {...rest}> 
      <Icon name={icon} size={20} color="grey" />
      
      <PickerRn
        selectedValue={value}
        style={{height: 50, width: '90%'}}
        onValueChange={(itemValue, itemIndex) =>
          setValue(itemValue)
        }>
          {data && data.length ? data.map(dat => (
            <PickerRn.Item label={dat.label} value={dat.value} />
          )) : ''}
      </PickerRn>
    </Container>
  );
};
export default Picker;
