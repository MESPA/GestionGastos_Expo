import { StyleSheet, View, Alert, Pressable, Image, Modal, ScrollView } from "react-native";
import Header from "./components/Header";
import NuevoPresupuesto from "./components/NuevoPresupuesto";
import { useEffect, useState } from "react";
import ComponentePresupuesto from "./components/ComponentePresupuesto";
import FormularioGastos from "./components/FormularioGastos";
import { generaId } from "./helper";
import ListadoGastos from "./components/ListadoGastos";
import Filtro from "./components/Filtro";
import AsyncStorage from '@react-native-async-storage/async-storage'; 


export default function App() {
  const [isValidPresupuesto, setIsvaidPresupuesto] = useState(false);
  const [presupuesto,setPresupuesto]= useState(0)
  const [gastos,setgastos]= useState([])
  const [modal, setModal] = useState(false)
  const [gasto, setGasto] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  //guarda y obtiene del storage
  useEffect(() => {
    const obtenerPresupuestoStorage = async () => {
        try {
          const presupuestoStorage = await AsyncStorage.getItem('planificador_presupuesto') ?? 0

          if(presupuestoStorage > 0 ) {
            setPresupuesto(presupuestoStorage)
            setIsvaidPresupuesto(true)
          }
        } catch (error) {
          console.log(error)
        }
    }
    obtenerPresupuestoStorage()
  }, [])

  useEffect(() => { 
    if(isValidPresupuesto) {
      const guardarPresupuestoStorage = async () => {
          try {
            await AsyncStorage.setItem('planificador_presupuesto', presupuesto)
          } catch (error) {
            console.log(error)
          }
      }
      guardarPresupuestoStorage()
    }
  }, [ isValidPresupuesto ])

  useEffect(() => {
      const obtenerGastosStorage = async () => {
        try {
            const gastosStorage = await AsyncStorage.getItem('planificador_gastos') 

            setgastos( gastosStorage ? JSON.parse(gastosStorage) : [] )
        } catch (error) {
            console.log(error)
        }
      }
      obtenerGastosStorage()
  }, [])

  useEffect(() => {
    const guardarGastosStorage = async () => {
      try {
        await AsyncStorage.setItem('planificador_gastos', JSON.stringify(gastos))
      } catch (error) {
        console.log(error)
      }
    }
    guardarGastosStorage();
  }, [gastos])


  const handleNuevoPresupuesto = (presupuesto) => {
    
    if (Number(presupuesto) > 0) {
      setIsvaidPresupuesto(true);
    } else {
      Alert.alert("Error", "Presupuesto debe ser mayor  Cero", "Ok");
    }

  };

  //se comunica con el formulario y el modal
  const handleGasto = gasto =>{
   if ([gasto.nombre,gasto.categoria,gasto.cantidad].includes('')) {
   
    Alert.alert(
      "Error",
      "Todos lo Campos Son Obligatorios"
    )
      return
   }



   if(gasto.id) {
    //edita el registro
  const gastosActualizados = gastos.map(gastosState => gastosState.id === gasto.id ? gasto : gastosState)
  setgastos(gastosActualizados)
   }
  else {
    ///nuevo registro
    gasto.id = generaId()
   gasto.fecha= Date.now()
   
   setgastos([...gastos, gasto])

   }
   setModal(!modal)
  }

  const eliminarGasto = id =>{
    Alert.alert(
      'Desea Eliminar este Gasto',
      'Los gastos Eliminados No se Recuperan',
      [
        {text:'No', style:'cancel'},
        {text:'Si, Eliminar', onPress: () =>{
          //asi eliminamos de un arreglo
          const gastosActualizados = gastos.filter(gastoState => gastoState.id !==id) 
          setgastos(gastosActualizados)
          setModal(!modal)
          setGasto({})
        }}
      ]
    )
  }

  const resetearApp = () =>{
    Alert.alert(
      'Desea Resetear la App',
      'Esto eliminara Gastos y Presupuesto',
      [
        {text:'No', style:'cancel'},
        {text: 'Si, Eliminar', onPress : async () =>{
          try {
            await AsyncStorage.clear()
            setIsvaidPresupuesto(false)
            setPresupuesto(0)
            setgastos([])

          } catch (error) {
            console.log(error);
          }
        }}
      ]
    )
  }
  return (
    <View style={styles.contenedor}>
      <ScrollView>
      <View style={styles.header}>
        <Header />
        {
          isValidPresupuesto 
          ? ( <ComponentePresupuesto
            presupuesto={presupuesto}
            gastos={gastos}
            resetearApp={resetearApp}
          /> ) 
          : <NuevoPresupuesto 
          handleNuevoPresupuesto={handleNuevoPresupuesto} 
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}

          />
        }
        
      </View>
        {
          //se usa el componente listado y filtro  tambien se envian via props 
          isValidPresupuesto && (
            <>
             <Filtro
             filtro={filtro}
             setFiltro={setFiltro}
             gastos={gastos}
             setGastosFiltrados={setGastosFiltrados}
             />

            <ListadoGastos
            gastos={gastos}
            setModal = {setModal}
            setGasto={setGasto}
            filtro={filtro}
            gastosFiltrados={gastosFiltrados}
            />
            </>
           
          )
        }
    </ScrollView> 
          {
             //se usa el componente modal y formulario  tambien se envian via props 
            modal && (
              <Modal
              animationType="slice"
              visible={modal}
              >
                <FormularioGastos
                setModal={setModal}
                handleGasto={handleGasto}
                gasto={gasto}
                setGasto={setGasto}
                eliminarGasto={eliminarGasto}
                />
              </Modal>
            )
          }

          {isValidPresupuesto && (
             //se usa el componente image y modal  tambien se envian via props y se agrega con el modal
            <Pressable  
            style={styles.presable}
            onPress={() => setModal(!modal)}
            >
              <Image
              style={styles.imagen}
              source={require('./img/nuevo-gasto.png')}
              
              />
            </Pressable>
          )}

    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: "#F5F5F5",
    flex: 1,
  },
  header: {
    backgroundColor: "#3882f6",
    minHeight: 400
  },
  presable:{
    width:60,height:60,position:'absolute',
    bottom:40, right:20
  },
  imagen:{
    width:60,height:60
  }
});
