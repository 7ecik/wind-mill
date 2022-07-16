import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableOpacityBase,
  View,
  SafeAreaView,
  Image,
  ScrollView
} from 'react-native';

type Props = {};
export default class App extends Component<Props> {

constructor(props){
  super(props)
  this.state = {quant:0, velo:0, horas:0, elev:0, resultcata:0, resultdiam:0, resultvolu:0, teste:0}
  this.calcular = this.calcular.bind(this)
}

calcular(){

  var fatorconsumo = this.state.horas/24
  var vazao = (this.state.quant/(fatorconsumo*86400))
  var diametro = Math.sqrt((vazao*this.state.elev)/(0.08*(Math.pow(this.state.velo/3.6,3))))
  var vc = (0.98*(Math.pow(this.state.velo/3.6,3))/this.state.elev)

  if(diametro<=3.5){
    catavento=1
  }else{
    diametro = 3.5
    var catavento = vazao/vc
  }

  let rc = this.state
  rc.resultcata = Math.ceil(catavento)
  this.setState(rc)

  let rd = this.state
  rd.resultdiam = diametro
  this.setState(rd)

  let rv = this.state
  rv.resultvolu = vc
  
  if(rv.resultvolu<=0.5){
    rv.resultvolu=0.5;
  }else if(rv.resultvolu>0.5 && rv.resultvolu<=1){
    rv.resultvolu=1;
  }else if(rv.resultvolu>1 && rv.resultvolu<=1.5){
    rv.resultvolu=1.5;
  }else if(rv.resultvolu>1.5 && rv.resultvolu<=2){
    rv.resultvolu=2;
  }else if(rv.resultvolu>2 && rv.resultvolu<=3){
    rv.resultvolu=3;
  }else if(rv.resultvolu>3){
    rv.resultvolu=5;
  }
  this.setState(rv)

}

  render(){
    return (
      <ScrollView>
      <View style = {styles.container}>
        <SafeAreaView>
        <View style={styles.header}>
          <Image
          source={require('./src/assets/logo.png')}
          style={{width: 50, height: 50}}
          resizeMode="contain"
          />
          <Image
          source={require('./src/assets/header.jpg')}
          style={{width: 300, height:100}}
          resizeMode="contain"
          />
        </View>
      </SafeAreaView>
        <View style = {styles.entradas}>
          <View style={styles.icones}>
            <Image
            source={require('./src/assets/agua.png')}
            style={{width: 40, height: 40}}
            resizeMode="contain"
            />
            <View style={{flex: 1}}>
              <TextInput placeholder = "Quantidade de água" keyboardType="numeric" style={styles.input} onChangeText={(quant)=>{this.setState({quant})}}/>
          </View>
            </View>
          <View style={styles.icones}>
          <Image
          source={require('./src/assets/vento.png')}
          style={{width: 40, height: 40}}
          resizeMode="contain"
          />
          <View style={{flex: 1}}>
            <TextInput placeholder = "Velocidade média do vento" keyboardType="numeric" style={styles.input} onChangeText={(velo)=>{this.setState({velo})}}/>
          </View>
            </View>  
            <View style={styles.icones}>
          <Image
          source={require('./src/assets/relogio.png')}
          style={{width: 40, height: 40}}
          resizeMode="contain"
          />
          <View style={{flex: 1}}>
          <TextInput placeholder = "Média da quantidade de horas" keyboardType="numeric" style={styles.input} onChangeText={(horas)=>{this.setState({horas})}}/>
          </View>
            </View> 
            <View style={styles.icones}>
          <Image
          source={require('./src/assets/altura.png')}
          style={{width: 40, height: 40}}
          resizeMode="contain"
          />
          <View style={{flex: 1}}>
          <TextInput placeholder = "Altura de elevação do sistema" keyboardType="numeric" style={styles.input} onChangeText={(elev)=>{this.setState({elev})}}/>
          </View>
            </View>
          </View>
        <TouchableOpacity style = {styles.button} onPress = {this.calcular}><Text style={styles.buttonText}>Dimensionar</Text></TouchableOpacity>
        <Text style={styles.resultado}>Quantidade de catavento: {this.state.resultcata.toFixed(2)}</Text>
        <Text style={styles.resultado}>Diâmetro das pás: {this.state.resultdiam.toFixed(2)}</Text>
        <Text style={styles.resultado}>Velocidade do vento na região: {this.state.velo}</Text>
        <Text style={styles.resultado}>Horas com vento na região: {this.state.horas}</Text>
        <Text style={styles.resultado}>Volume da bomba: {this.state.resultvolu.toFixed(2)}</Text>
        <Text style={styles.resultado}>Volume do reservatóri: {this.state.quant}</Text>
       </View>
       </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  header:{
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,  
    backgroundColor: '#F5FCFF',
  },
  entradas: {
    flexDirection: "column",
  },
  icones:{
    marginLeft:10,
    alignItems: 'center',
    flexDirection: "row",
  },
  input:{
    height:40,
    textAlign:"center",
    fontSize:20,
    marginTop:24,
  },
  button: {
    backgroundColor: "#b0e2ff",
  },
  buttonText:{
    alignSelf: "center",
    padding:20,
    fontSize:25,
    color:"#000000",
    
  },
  resultado:{
    alignSelf: "center",
    color:"black",
    fontSize:20,
    padding:25,
  },
  
});

