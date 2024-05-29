import { Text, StyleSheet, View, TouchableOpacity} from "react-native";
import {StatusBar} from "expo-status-bar"
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Timer from "@/components/Timer";
import { Audio } from "expo-av";

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"]

const styles = StyleSheet.create({

  text: {fontSize:32, fontWeight:"bold"},
  
  container: {
    flex: 1
  },

  button: {
    backgroundColor:"#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: "center"
    
  }

});

export default function Index() {

  // un hook nos ayuda a setear dos variables en un arreglo / en este caso para el reloj
  const [time, setTime] = useState(25*60);

  const [currentTime, setCurrentTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => { // declaracion que accion que se repite cada vez que hay un cambio en ciertas variables
    // declaracion del interval para luego hacerle un clear
    let interval = null;

    if (isActive) {
      interval = setInterval( () => {
        // lo que se va a hacer
        setTime(time-1);
      }, 1000); // cada cuantos milisegundos
    }
    if (time === 0) {
      setIsActive(false);
    }
    // warning de posible error de ejecucion que nunca sucede por que
    // nunca se devuelve null
    return () => clearInterval(interval);
  }, [isActive, time]); // whenever this changes

  function handelStartStop() {
    playSound();
    setIsActive(!isActive);
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/click.mp3")
    )
    await sound.playAsync();
  }
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor:colors[currentTime]}]}
    >
      
      <View style={{
        paddingHorizontal: 15,
        flex: 1
      }}>
        <StatusBar style="inverted" />
        <Text style={styles.text}>Pomodoro</Text>

        <Header currentTime = {currentTime}
        setCurrentTime={setCurrentTime}
        setTime={setTime}/>

        <Timer time={time}></Timer>
        
        <TouchableOpacity style={styles.button}
        onPress={handelStartStop}>
          <Text style={{color:"white", fontWeight:"bold"}}>
            {isActive ? "STOP":"START"}
          </Text>
        </TouchableOpacity>
      </View>


    </SafeAreaView>
  );


}
