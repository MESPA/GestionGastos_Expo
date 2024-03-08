import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import globalStyle from "../style";
const FormularioGastos = ({setModal,handleGasto,setGasto,gasto,eliminarGasto}) => {

  const[nombre,setNombre]= useState('')
  const[cantidad,setcantidad]= useState('')
  const[categoria,setCategoria]= useState('')
  const[id,setId] = useState('')
  const [fecha, setFecha]=useState('')

  useEffect(() =>{

    if(gasto?.nombre){
      setNombre(gasto.nombre)
      setCategoria(gasto.categoria)
      setcantidad(gasto.cantidad)
      setId(gasto.id)
      setFecha(gasto.fecha)
    }
  },[gasto])

  return (
    <SafeAreaView style={styles.contenedor}>
      <View style={styles.contenedorbotones} >
        <Pressable onPress={() => {
          setModal(false)
          setGasto({})
        } }
        style={[styles.btn,styles.btnCancelar]}
        >
          <Text style={styles.btnTexto} >Cancelar</Text>
        </Pressable>
       { !!id &&
  <Pressable 
  onLongPress={() => eliminarGasto(id)}
  style={[styles.btn,styles.btnEliminar]}
  >
    <Text style={styles.btnTexto} >Eliminar</Text>
  </Pressable>
       }
      
      </View>

      <View style={styles.formulario}>
        <Text style={styles.titulo}>{gasto?.nombre ? 'Editar Gasto' : 'Nuevo Gasto'} </Text>
        <View style={styles.campo}>
          <Text style={styles.label}>Nombre Gasto</Text>
          <TextInput 
          placeholder="Nombre del Gasto Ej. Comida"
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Cantidad Gasto</Text>
          <TextInput 
            placeholder='Cantidad del gasto. ej. 300'
            keyboardType='numeric'
            style={styles.input}
            value={cantidad}
            onChangeText={setcantidad}
          />
        </View>
        <View    style={styles.campo}>
          <Text    style={styles.label}>Categoria Gasto</Text>
          <Picker   
          style={styles.input}
          selectedValue={categoria}
         onValueChange={(valor) =>{
          setCategoria(valor)
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

      <Pressable
      style={styles.btnagregar}
      onPress={() => handleGasto({nombre,cantidad,categoria, id, fecha})}
      >
        <Text style={styles.btnagregarTexto}> {gasto?.nombre ? 'Guardar Gasto' : 'Agregar Gastos'}</Text>
      </Pressable>
      

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor:{
    backgroundColor:'#3882f6',
    flex:1
  },
  contenedorbotones:{
    flexDirection:'row',
    justifyContent:'space-between'
    
  },
  btn:{
    marginHorizontal:10,
    padding:5,
    borderRadius:10,
    marginTop:10,
    flex:1
  },
btnEliminar:{
  backgroundColor:'red',
},
  btnCancelar:{
    backgroundColor:'#db2777',
   
  },
  btnTexto:{
    color:'#fff',
    textAlign:'center',
    fontSize:18,
    fontWeight:'bold'
  },
  formulario:{ ...globalStyle.contenedor
    ,bottom:25
  
  },
  titulo:{
    textAlign:'center',
    fontSize:28,
    color:'#64748b',
    marginVertical:10,
  },
  campo:{
    marginVertical:10
  },
  label:{
    color:'#64748b',
    textTransform: 'uppercase',
    fontSize:16,
    fontWeight:'bold',

  },
  input:{
    backgroundColor:'#f5f5f5',
    borderRadius:10,
    marginTop:5,
    paddingVertical:8
  },
  btnagregar:{
    backgroundColor:'#3882f6',
    marginHorizontal:20,
    padding:10,
    borderRadius:10
  },
  btnagregarTexto:{
    color:'#fff',
    textAlign:'center',
    fontSize:18,
    fontWeight:'bold'
  }


})

export default FormularioGastos;
