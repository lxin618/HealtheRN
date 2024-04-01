import Toast from "react-native-root-toast";

export const SnackBar = {
    show: (message: string, type: string) => {
        let bgcolor = '#FFCC00'
        let textColor = 'black'

        if (type === 'success') {
            bgcolor = '#00A86B'
            textColor = 'white'
        }
        else if (type === 'error') {
            bgcolor = '#FFCCCC'
        }

        Toast.show(message, {
            duration: 5000,
            backgroundColor: bgcolor,
            textColor: textColor,
            opacity: 1
        });
    }
}