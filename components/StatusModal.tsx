import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { Modal, StyleSheet } from "react-native";
import { Text, View } from './Themed';

interface IStatusModal {
    text: string;
    status: 'success' | 'error';
    timeout: number;
    onDone: () => void;
    isVisible: boolean;
}
const StatusModal = ({ text, status, timeout, onDone, isVisible }: IStatusModal) => {
    useEffect(() => {
        if(isVisible){
            setTimeout(() => {
                onDone();
            } , timeout);
        }
    } , [isVisible]);

    return (
        <Modal visible={isVisible} presentationStyle="overFullScreen" animationType='fade'>
            <View style={styles.modal}>
                <View style={styles.center}>
                <Ionicons name={status === 'success' ? "checkmark-circle-outline" : "alert-circle-outline"} size={50} color={status === 'success' ? 'green' : 'red'} />
                    <Text style={status === 'success' ? styles.success : styles.error}>{text}</Text>
                </View>
            </View>
        </Modal>
    );
}

export default StatusModal;

const styles = StyleSheet.create({
    modal: {
        padding: 20,
        backgroundColor: '#ffffff77',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    icon: {
        fontSize: 40,
    },
    success: {
        color: 'green',
        fontSize: 20,
    },
    error: {
        color: 'red',
        fontSize: 20,
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})