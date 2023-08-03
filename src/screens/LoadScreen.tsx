import {StyleSheet,Text,View,ActivityIndicator} from 'react-native';
import {} from 'react-native';
import LoadIco from './loadIco.svg'

const svgImageSource = require('./loadIco.svg');

const LoadScreen = ()=>{
    return(
    <View style = {styles.container}> 
            <View style = {styles.textPosition}>
                <Text style = {styles.customFontText}> Coinvertly </Text>
            </View>
            <View style = {styles.imagePosition}>
                <LoadIco width={161} height={165} />
            </View>
            <View style = {styles.bottomContent}>
                <ActivityIndicator color={"#181A4B"} size="large"/>
            </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#F6F6F6",
        justifyContent:'space-between',
        alignItems:'center',
        flex:1
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    imagePosition:{
        top:339,
        left:115,
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    textPosition:{
        top:230,
        left:35,
        alignItems:'center',
        justifyContent:'center'
    },
    customFontText:{
        fontFamily:'Montserrat-Regular',
        fontWeight:'bold',
        width:267,
        height:64,
        fontSize:40,
        color:"#181A4B"
    },
    bottomContent: {
        paddingBottom: 100
      },
});

export default LoadScreen;