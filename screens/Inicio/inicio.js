import { View, Text, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import CardComponent from "../../components/CardComponent";
import { StyleSheet } from 'react-native';


export default function Inicio() {
    return (
        <ScrollView contentContainerStyle={styles.contained}>

            <View style={styles.gridContained}>
                <CardComponent
                    title="Citas Medicas"
                    description="Gestion Citas Medicas"
                    icon="people-outline"
                />
                <CardComponent
                    title="Consultorios"
                    description="Gestion Consultorios"
                    icon="calendar-outline"
                />
                <CardComponent
                    title="Doctores"
                    description="Gestion Doctores"
                    icon="cash-outline"
                />
                <CardComponent
                    title="Especialidades"
                    description="Gestion Especialidades"
                    icon="card-outline"
                />
                 <CardComponent
                    title="Pacientes"
                    description="Gestion Pacientes"
                    icon="card-outline"
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});