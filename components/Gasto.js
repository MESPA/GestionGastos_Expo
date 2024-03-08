import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import globalStyle from "../style";
import { formatearCantidad ,formatearFecha} from "../helper";

const diccionarioIconos = {
  ahorro: require("../img/icono_ahorro.png"),
  comida: require("../img/icono_comida.png"),
  casa: require("../img/icono_casa.png"),
  gastos: require("../img/icono_gastos.png"),
  ocio: require("../img/icono_ocio.png"),
  salud: require("../img/icono_salud.png"),
  suscripciones: require("../img/icono_suscripciones.png"),
};

const Gasto = ({ gasto,setModal,setGasto}) => {

    const handleAcciones = () => {
      setModal(true),
      setGasto(gasto)
    }
  return (
<Pressable
onLongPress={() => handleAcciones()}
>

    <View style={styles.contenedor}>
      <View style={styles.contenido} >
        <View style={styles.contenedorimagen}> 
        <Image source={diccionarioIconos[gasto.categoria]} 
        style={styles.imagen}
        />
        <View style={styles.contenedorTexto}>
          <Text style={styles.categoria}>{gasto.categoria}</Text>
          <Text style={styles.nombre}>{gasto.nombre}</Text>
          <Text style={styles.fecha}>Fecha: {formatearFecha(gasto.fecha)}</Text>
        </View>
        </View>
        
        <Text style={styles.cantidad}>{formatearCantidad(gasto.cantidad)}</Text>
      </View>
    </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  contenedor: {
    ...globalStyle.contenedor,
    marginBottom: 10,
  },
  contenido:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  contenedorimagen:{
     flexDirection:'row',
     alignItems:'center',
     flex:1
     
},
  imagen:{
    width:80,
    height:80,
    marginRight:20,
   

},
  contenedorTexto:{flex:1},
  categoria:{
    color:'#94a3b8',
    fontSize:16,
    fontWeight:'700',
    textTransform:'capitalize',
    marginBottom:5
  },
  nombre:{
    fontSize:22,
    color:'#64748b',
    marginBottom:5,
  },cantidad:{
    fontSize:22,
    fontWeight:'bold'
  },
  fecha:{
    fontSize:17,
    color:'#3882f6',
    fontWeight:'bold'
  }
});

export default Gasto;
