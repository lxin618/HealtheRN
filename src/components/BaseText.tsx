import React from 'react';
import {Text, StyleSheet} from 'react-native';

const BaseText = (props: any) => {
    return (
      <Text style={[styles.defaultStyle, props.style]}>
        {props.children}
      </Text>
    );
  };
  

const styles = StyleSheet.create({
  // ... add your default style here
  defaultStyle: {
    fontFamily: 'Poppins-Regular',
  },
});
  
export default BaseText;