import { StyleSheet, Text, View, Image, Button, TextInput, SafeAreaView } from 'react-native';
import Inicio from './screens/Inicio/inicio';
import { StatusBar } from 'expo-status-bar';
import Login from './screens/Auth/login';



export default function App() {

  return (


    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <Login />
    </SafeAreaView>
    
    // <View style={styles.container}>
    //   <Inicio/>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'start',
    justifyContent: 'center',
    padding: 20
  },
  
});
