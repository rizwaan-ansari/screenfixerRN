import { Linking, Alert } from "react-native";

const usePhoneCall = () => {
    const makePhoneCall = (url: string) => {
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    Alert.alert('Calling is not supported on this device');
                }
            })
            .catch((err) => {
                Alert.alert("Error", err);
            })
    }

    return { makePhoneCall };
}

export default usePhoneCall;