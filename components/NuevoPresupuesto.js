import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import globalStyle from "../style";
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const NuevoPresupuesto = ({handleNuevoPresupuesto,presupuesto,setPresupuesto}) => {

  // useEffect(() => {
  //   const obtenerAs = async () =>{
  //       const valor = await AsyncStorage.getItem('prueba')
  //       console.log(valor);
  //   }
  //   obtenerAs()
  // }, [])

  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Definir Presupuesto</Text>

      <TextInput
      keyboardType="numeric"
      placeholder="Agrega tu Presupuesto"
      style={styles.input}
      value={presupuesto.toString()}
      onChangeText={setPresupuesto}
      />
      <Pressable style={styles.boton}
      onPress={() => handleNuevoPresupuesto(presupuesto)}
      >
        <Text style={styles.Textoboton} >Agregar Presupuesto</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
  ...globalStyle.contenedor
  },
  label:{
    textAlign:'center',
    fontSize:24,
    color:'#3882f6',

  },input:{
textAlign:'center',
marginTop:25,
backgroundColor:'#f5f5f5',
padding:10,
borderRadius:10
  },
  boton:{
    marginTop:20,
    backgroundColor:'#3882f6',
    padding:15,
    borderRadius:10
  },
  Textoboton:{
    textAlign:'center',
    fontSize:16,
    color:'#fff',
    fontWeight:'700'
  },
  
});

export default NuevoPresupuesto;
