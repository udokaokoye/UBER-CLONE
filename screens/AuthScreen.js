import { useNavigation } from '@react-navigation/native';
import React, {useEffect,useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, TextInput, TouchableHighlight, AsyncStorage } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import { Icon as Icn } from 'react-native-elements';
import {SvgUri} from "react-native-svg"
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const AuthScreen = ({route}) => {
    const navigation = useNavigation()
    const defaultCountry = require('../assets/countires.json')
    const [countryInfo, setcountryInfo] = useState(defaultCountry[0])
    const [phoneNo, setphoneNo] = useState("")

    useEffect(() => {
        if (route && route.params) {
            setcountryInfo(route.params)
        }
    }, [route])

    useEffect(() => {
            console.log(  AsyncStorage.getItem("user"))
        
    }, [])

    const submmitNumber = () => {
        const formData = new FormData
        formData.append("phone", countryInfo.dial_code + phoneNo)
        
        try {
            fetch("http://192.168.1.2/taxi-app/auth.php?generate=1", {
            method: "POST",
            body: formData
        }).then((res) => res.json()).then((data) => {
            if (data == 'PROCEED') {
                navigation.navigate("VerifyScreen", {
                    phone: countryInfo.dial_code + phoneNo
                });
            } else {
                alert("ERROR_WITH_NUMBER - TRY_AGAIN")
                console.log(data)
            }
        })
        } catch (error) {
            console.log(error.message)
        }

    }


    return (
        <SafeAreaView style={[tw`flex h-full bg-white`, {paddingTop: StatusBar.currentHeight}]}>
            
            <Text style={tw`text-2xl text-center pt-10 font-semibold`}>Enter your mobile number</Text>

            <View style={tw`flex-row justify-between px-5 mt-10 `}>
                <TouchableOpacity style={tw`flex-row items-center`} onPress={() => navigation.navigate("CountrySelect")}>
                <Text style={tw`text-3xl`}>{countryInfo.flag} <Icn name="chevron-down" type="evilicon" color="black" size={20} /></Text>
                <Text style={tw`text-xl mr-3`}>{countryInfo.dial_code}</Text>
                </TouchableOpacity>
                <TextInput keyboardType="numeric" onChangeText={(txt) => setphoneNo(txt)} style={[tw``, {borderBottomWidth: 2, borderBottomColor: "black", width: '70%'}]} placeholder="Enter Number" />
            </View>
            <TouchableWithoutFeedback style={tw`px-3 mt-10 flex-row items-center`} onPress={() => navigation.navigate("SignupScreen", {phone: countryInfo.dial_code + phoneNo})} >
                <Text style={tw`text-xl text-blue-700 font-semibold`}>Or connect with social </Text>
                <Icn name="arrow-forward" type="ionicons" color="blue" size={25} />
            </TouchableWithoutFeedback>

            <View style={tw`px-5 mt-auto mb-2`}>
                <Text style={tw`text-gray-500 px-2 pb-3`} >By continuing you may receive an SMS for verifcation. Message and data rates may apply.</Text>
                <TouchableHighlight style={[tw`w-full bg-black justify-center`, {height: 55}]} onPress={() => submmitNumber()} >
                    <Text style={tw`text-white text-center text-2xl`}>Next</Text>
                </TouchableHighlight>
            </View>
        </SafeAreaView>
    )
}

export default AuthScreen

const styles = StyleSheet.create({})
