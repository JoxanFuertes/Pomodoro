import {View, Text, TouchableOpacity, StyleSheet} from "react-native"
import React from "react"

/* el header se encarga de la logica y el look de la navegacion:
    | Pomodoro | Short Break | Long Break |
*/

const options = ["Pomodoro", "Short Break", "Long Break"];
// funcion de javascript para iterar es map
const styles = StyleSheet.create({
    itemStyle: {
        width: "33.333333334%",
        borderWidth: 3,
        padding: 5,
        borderColor: "white",
        marginVertical: 20,
        borderRadius: 10,
        alignItems: "center"
    }
});


export default function Header(propos: any){

    function handlePress(index: any){
        // el caracter ? es como un = para setear parametros / : es como un elif
        const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
        propos.setCurrentTime(index);
        propos.setTime(newTime*60);
    }

    return(
        <View style={{ flexDirection: "row"}}> 
        {/*TouchableOpacity = clicking animation
        el onPress es un evento de bototn y las funciones se llaman con un arrow function
        */}
            {options.map((item, index) => (
                
                <TouchableOpacity key={index}
                onPress={() => handlePress(index)}
                style={[styles.itemStyle, propos.currentTime !== index && {borderColor: "transparent"}]}>
                    <Text style={{fontWeight: "bold"}}>{item}</Text>
                </TouchableOpacity>
                
            ))}
        </View>
    )
}



