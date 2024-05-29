import { View, Text, StyleSheet} from "react-native";
import React from "react";

export default function Timer (propos: any){
    const formattedTime = `${Math.floor(propos.time / 60)
        .toString()
        .padStart(2,"0")}:${(propos.time % 60)
        .toString()
        .padStart(2,"0")
        }`
    return(
        <View style={styles.container}>
            <Text style={styles.time}>
                {formattedTime}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F2F2F2",
        padding: 15,
        borderRadius: 15,
        flex: 0.3,
        justifyContent: "center"
    },

    time: {
        fontSize: 80,
        fontWeight: "bold",
        textAlign: "center",
        color: "#333333"
    }
})

