import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App = () => {
  const [toggle, setToggle] = useState(false);

  const handleChangeToggle = () => { 
    setToggle(oldToggle => !oldToggle);
  };

  // Utiliza o flash do celular 
  useEffect(() => {
    Torch.switchState(toggle);
  }, [toggle]);

  // Evento de shake no celular
  useEffect(() => {
    //Quando o celular for chacoalhado, muda-se o toggle
    const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle)
    });

    // Essa função vai ser chamada quando o componente for desmontado
    return () => subscription.remove();
  }, [])

  return (
     <View style={toggle ? style.containerLight : style.container}>
      <TouchableOpacity onPress={handleChangeToggle}>
        <Image 
          style={
            toggle 
            ? style.lightingOn
            : style.lightingOff}
            source={
              toggle 
              ? (require('./assets/eco-light.png')) 
              : (require('./assets/eco-light-off.png'))}/>
          <Image 
            style={style.dioLogo}
            source={
              toggle 
              ? (require('./assets/logo-dio.png')) 
              : (require('./assets/logo-dio-white.png'))}/>
          <Image 
            style={
              toggle 
              ? [style.lightingOn, style.avanadeLogo]
              : [style.lightingOff, style.avanadeLogo]}
            source={(require('./assets/avanade.png'))}/>
      </TouchableOpacity>
     </View>
  );
}

export default App

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 200,
    height: 250,
  },
  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 200,
    height: 250,
  },
  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 300,
    height: 80,
  },
  avanadeLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 300,
    height: 100,
  }  
})