import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import globalStyle from "../style";
import { formatearCantidad } from "../helper";

import { AnimatedCircularProgress } from "react-native-circular-progress";

const ComponentePresupuesto = ({ presupuesto, gastos,resetearApp }) => {
  const [disponble, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const[porcentaje, setPorcentaje] = useState(0)

  useEffect(() => {
    //total gastado
    const totalGastado = gastos.reduce(
      (total, gastos) => Number(gastos.cantidad) + total,
      0
    );
        //operacion total disponible
    const totalDisponible = presupuesto - totalGastado;
//calculo de porcentaje
    const nuevoPorcentage = (
      Math.ceil(((presupuesto - totalDisponible) / presupuesto) * 100)
    )
//mostrando dos segunds despues que se agrega un gasto
        setTimeout(() => {
            setPorcentaje(nuevoPorcentage)
        }, 2000);

    setDisponible(totalDisponible);

    setGastado(totalGastado);
  }, [gastos]);

  return (
    <View style={styles.contenedor}>
      <View style={styles.centrargrafica}>
        {/* <Image 
            source={require('../img/grafico.jpg')} 
            style={styles.imagen}
            /> */}

        <AnimatedCircularProgress
          size={220}
          width={20}
          fill={porcentaje}
          tintColor="#3882f6"
         
          backgroundColor="#E5E1DA"
      
        >
        {
            () => (
                <View>
                    
                <Text style={styles.porcentageinterno}>
                    {porcentaje}%
                </Text>
                <Text style={styles.porcentageinternotexto}>
                Gastado
            </Text>
                </View>
                
            )
        }
        </AnimatedCircularProgress>
      </View>

        <Pressable style={styles.boton}
        onLongPress={() => resetearApp()}
        >
          <Text style={styles.textoboton} >Resetear Gastos</Text>
        </Pressable>
      <View>
        <View style={styles.contenedorTexto}>
          <Text style={styles.valor}>
            <Text style={styles.label}>Presupuesto:</Text>
            {formatearCantidad(presupuesto)}
          </Text>
          <Text style={styles.valor}>
            <Text style={styles.label}>Disponible:</Text>
            {formatearCantidad(disponble)}
          </Text>
          <Text style={styles.valor}>
            <Text style={styles.label}>Gastado:</Text>
            {formatearCantidad(gastado)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyle.contenedor,
  },
  centrargrafica: { alignItems: "center" },
  imagen: {
    width: 200,
    height: 200,
  },
  contenedorTexto: {
    marginTop: 50,
  },
  valor: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
  label: {
    fontWeight: "800",
    color: "#3882f6",
  },
  porcentageinterno:{
    textAlign:'center',
    fontSize:35,
    fontWeight:'700',
    color:'#3882f6'
  },
  porcentageinternotexto:{
    textAlign:'center',
    fontSize:15,
    fontWeight:'600',
    color:'#647482'
  },
  boton:{
    alignItems:'center',
    marginTop:20,
    backgroundColor:'red',
    padding:15,
    borderRadius:20,
    
    

   
  },
  textoboton:{
    color:'#fff',
    fontWeight:'900',
    fontSize:20
  }
});

export default ComponentePresupuesto;
