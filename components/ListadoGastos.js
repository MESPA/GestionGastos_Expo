import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Gasto from "./Gasto";

const ListadoGastos = ({
  gastos,
  setModal,
  setGasto,
  filtro,
  gastosFiltrados,
}) => {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Gastos</Text>
      {filtro
        ? gastosFiltrados.map((gasto) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setModal={setModal}
              setGasto={setGasto}
            />
        ))
        : gastos.map((gasto) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setModal={setModal}
              setGasto={setGasto}
            />
          ))
          }

      { (gastos.length === 0 || (gastosFiltrados.length === 0 && !!filtro)) && (
        <Text style={styles.NoGastos}>No hay Gastos...</Text>
      )}

      {
        //primera logica para mostrar antes de aplicar el filtro
        //     gastos.length === 0
        //     ?
        //     <Text style={styles.NoGastos}>No hay Gastos...</Text>
        //     :
        //    // <Text> hay Gastos...</Text>
        //    gastos.map( gasto => (
        //     <Gasto
        //     key={gasto.id}
        //     gasto={gasto}
        //     setModal={setModal}
        //     setGasto={setGasto}
        //     />
        //    ))
      }
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    marginTop: 20,
    marginBottom: 100,
  },
  titulo: {
    color: "#64748b",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "700",
    marginTop: 30,
  },
  NoGastos: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 20,
  },
});
export default ListadoGastos;
