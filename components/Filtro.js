import React, { useEffect } from "react";
import { Text, View,StyleSheet} from "react-native";
import { Picker } from "@react-native-picker/picker";
import globalStyle from "../style";


const Filtro = ({filtro,setFiltro,gastos,setGastosFiltrados}) => {

    //logica para traer los filtros por categoria
    useEffect(() => {

        if (filtro === '') {
            setGastosFiltrados([])
        }else{
            const gastosfiltrados = gastos.filter(gasto => gasto.categoria === filtro)
            setGastosFiltrados(gastosfiltrados)
        }

    },[filtro])
  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Filtro</Text>

      <Picker   
        selectedValue={filtro}
        onValueChange={(valor) => {
            setFiltro(valor)
        }}

          >
          <Picker.Item label="-- Seleccione --" value="" />
                        <Picker.Item label="Ahorro" value="ahorro" />
                        <Picker.Item label="Comida" value="comida" />
                        <Picker.Item label="Casa" value="casa" />
                        <Picker.Item label="Gastos Varios" value="gastos" />
                        <Picker.Item label="Ocio" value="ocio" />
                        <Picker.Item label="Salud" value="salud" />
                        <Picker.Item label="Suscripciones" value="suscripciones" />
                      
                    
          </Picker>
    </View>
  );
};
const styles = StyleSheet.create({
    contenedor:{
    ...globalStyle.contenedor,transform: [{translateY:0}],
    marginTop:70,
    
    },
    label:{
        fontSize:18,
        color:'#64748b',
        fontWeight:'900'
    }
})

export default Filtro;
