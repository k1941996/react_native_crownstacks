import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,Button,
  Text,
  TouchableHighlight,BackHandler,
  View
} from "react-native";

const PopUpModal = (props) => {
    let { modalVisibility,popUpModalInnerComponent,animationStyle,closeModal} = props
    // const [modalVisible, setModalVisible] = useState(modalVisibility);
    const [isChecked,setIsChecked] = useState(false)

    
    return (
        <View style={styles.centeredView}>
        <Modal
            animationType={animationStyle}
            transparent={true}
            visible={modalVisibility}
            onRequestClose={closeModal}
            
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {popUpModalInnerComponent?popUpModalInnerComponent:null}
                </View>
            </View>
        </Modal>
        </View>
    );
    };

    const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',
        
    },
    modalView: {
        // margin: 20,
        backgroundColor: "#1f1b24",
        borderRadius: 20,
        padding: 32,
        margin:32,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.50,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    }, 
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },checkbox: {
        alignSelf: "center",
    }
    });

export default PopUpModal;
