import React, {useState, useEffect} from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import { Icon as Icn } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import {SvgUri} from "react-native-svg"
// import { Input } from 'react-native-elements/dist/input/Input';
const SelectCountry = () => {
    const [countries, setcountries] = useState(require('../assets/countires.json'))
    const [allCountries, setallCountries] = useState(require('../assets/countires.json'))
    const navigation = useNavigation();

    
    return (
        <View>

            <View style={[tw`w-full bg-black flex-row items-center justify-between px-3`, {height: 70}]}>
                <View style={[{width: "15%", height: "80%"}, tw`bg-white flex-row items-center justify-center rounded-full`]}>
                <Icn name="search" type="ionicons" color="black" size={29} />
                </View>

                <TextInput onChangeText={(txt) =>  {
                    if (txt !== '') {
                        setcountries(allCountries.filter((country) => {return country.name.toLowerCase().includes(txt.toLowerCase())}))
                    } else {
                        setcountries(allCountries)
                    }
                }} style={[tw`p-4`, {color: "white",  width: "80%"}]} placeholderTextColor="white" placeholder="Search countries..." />
            </View>
            
        
                <FlatList data={countries} windowSize={10} keyExtractor={(item) => item.name} renderItem={({item}) => (

                    <TouchableOpacity onPress={() => {
                        navigation.navigate("AuthScreen", {
                            dial_code: item.dial_code,
                            name: item.name,
                            flag: item.flag
                        })
                    }} style={tw`w-full bg-gray-200 mb-2 py-5 px-3 flex-row items-center`}>
                        <Text style={{fontSize: 25, marginRight: 10}}>{item.flag}</Text>
                        <Text style={tw``}>{item.name} ({item.dial_code})</Text>
                    </TouchableOpacity>
    
                )} />


            {/* <TouchableOpacity onPress={() => console.log(countires[0])}>
                <Text>Check</Text>
            </TouchableOpacity> */}
            
        </View>
    )
}

export default SelectCountry

const styles = StyleSheet.create({})
