import { StyleSheet, TouchableOpacity, View } from "react-native";
import BaseText from "./BaseText";
import Icon from "react-native-vector-icons/Ionicons";

interface RadioButtonProps {
    value: string;
    label: string;
    onSelect: (text: string) => void;
    selectedValue: string;
}

export const RadioGroup = (props: RadioButtonProps) => {
    const { value, label, onSelect, selectedValue } = props;
    return (
        <View style={style.container}>
            <TouchableOpacity
                style={style.radioCircle}
                onPress={onSelect}
            >
                {selectedValue === value && <View style={style.selectedRb} />}
                <Icon style={style.icon} name="male-outline"/>
                <BaseText style={style.text}>Male</BaseText>
            </TouchableOpacity>
            <TouchableOpacity
                style={style.radioCircle}
                onPress={onSelect}
            >
                {selectedValue === value && <View style={style.selectedRb} />}
                <Icon style={style.icon} name="female-outline"/>
                <BaseText style={style.text}>Female</BaseText>
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
      flexDirection: 'row',
      columnGap: 10,
      justifyContent: 'space-evenly',
      marginTop: 15,
    },
    radioCircle: {
        borderRadius: 10,
        padding: 20,
        columnGap: 20,
        flex: 1,
        borderColor: '#E6E6EE',
        borderWidth: 1,
    },
    selectedRb: {
        width: 15,
        height: 15,
        borderRadius: 100,
        backgroundColor: '#3E7BFA',
    },
    text: {
        fontSize: 16,
        color: '#070651',
        textAlign: 'center',
        marginLeft: '10%',
    },
    icon: {
        fontSize: 20,
        position: 'absolute',
        left: '30%',
        top: '95%',
    }
  });