import React, {useRef, useState, useEffect} from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableWithoutFeedback, TouchableOpacity, TextInput } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import { Icon as Icn } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setuserInfo } from '../slices/userSlice';
import { AsyncStorage } from 'react-native';
const VerifyCode = ({route}) => {
    const navigation = useNavigation()
    const [code1Value, setcode1Value] = useState("")
    const [code2Value, setcode2Value] = useState("")
    const [code3Value, setcode3Value] = useState("")
    const [code4Value, setcode4Value] = useState("")
    const [code5Value, setcode5Value] = useState("")
    const [fieldsComplete, setfieldsComplete] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        if (code1Value, code2Value, code3Value, code4Value, code5Value == '') {
            setfieldsComplete(false)
        } else {
            setfieldsComplete(true)
        }
    }, [code1Value, code2Value, code3Value, code4Value, code5Value])



    const code1 = useRef()
    const code2 = useRef()
    const code3 = useRef()
    const code4 = useRef()
    const code5 = useRef()
    const nextInput = (point, value, end) => {
      if (value !== '') {
            point.current.focus()
        }
    }

    const verifyCode = () => {
        if (code1Value, code2Value, code3Value, code4Value, code5Value == '') {
            return;
        }
        const mainCode = code1Value + code2Value + code3Value + code4Value + code5Value
        const formData = new FormData
        formData.append("code", mainCode)
        formData.append("phone", route.params.phone)
        
        try {
            fetch("http://192.168.1.2/taxi-app/auth.php?auth=1", {
            method: "POST",
            body: formData
        }).then((res) => res.json()).then((data) => {
            if (data[0] == 'HOME') {
                dispatch(setuserInfo({
                    id: data[1].id,
                    name: data[1].name,
                    email: data[1].email,
                    phone: data[1].phone
                }))
                AsyncStorage.setItem("user", JSON.stringify({
                    id: data[1].id,
                    name: data[1].name,
                    email: data[1].email,
                    phone: data[1].phone
                }))
                navigation.navigate("HomeScreen")
                
            } else if (data[0]  == "EXPIRED") {
                alert("CODE EXPIRED - RESEND CODE")
            } else if (data[0] == "SIGNUP") {
                navigation.navigate("SignupScreen", {
                    phone: route.params.phone
                })
            } else {
                alert(data[0])
            }
        })
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <SafeAreaView style={[tw`w-full h-full`, {paddingTop: StatusBar.currentHeight}]} >
            <TouchableOpacity style={tw`items-start px-5 pt-2`} onPress={() => navigation.navigate("AuthScreen")}>
            <Icn name="arrow-back" type="ionicons" color="black" size={25} />
            </TouchableOpacity>

            <View style={tw`px-5 mt-5`}>
                <Text style={tw`text-xl`}>Enetr the 5-digit code sent to you at <Text style={tw`font-bold`}>{route.params.phone}</Text> .</Text>

                <View style={tw`w-full h-10 mt-5 flex-row justify-evenly`}>
                    <TextInput keyboardType="numeric" style={[tw`text-center`, {width: "17%", borderBottomWidth: 2, borderColor: "black"}]} maxLength={1} ref={code1} onChangeText={(txt) => {setcode1Value(txt); nextInput(code2, txt)}} />
                    <TextInput keyboardType="numeric" style={[tw`text-center`, {width: "17%", borderBottomWidth: 2, borderColor: "black"}]} maxLength={1} ref={code2} onChangeText={(txt) => {setcode2Value(txt); nextInput(code3, txt)}} />
                    <TextInput keyboardType="numeric" style={[tw`text-center`, {width: "17%", borderBottomWidth: 2, borderColor: "black"}]} maxLength={1} ref={code3} onChangeText={(txt) => {setcode3Value(txt); nextInput(code4, txt)}} />
                    <TextInput keyboardType="numeric" style={[tw`text-center`, {width: "17%", borderBottomWidth: 2, borderColor: "black"}]} maxLength={1} ref={code4} onChangeText={(txt) => {setcode4Value(txt); nextInput(code5, txt)}} />
                    <TextInput keyboardType="numeric" style={[tw`text-center`, {width: "17%", borderBottomWidth: 2, borderColor: "black"}]} maxLength={1} ref={code5} onChangeText={(txt) => {setcode5Value(txt);}} />
                </View>

                <TouchableOpacity style={tw`mt-8`} onPress={() => alert("RESEND_CODE_FUNCTION")}>
                    <Text style={tw`text-blue-500`}>Resend Code</Text>
                </TouchableOpacity>
            </View>

            <View style={[tw` mt-auto w-full items-center justify-center px-3 mb-3`, {height: 70}]}>
            <TouchableOpacity disabled={!fieldsComplete} style={tw`${!fieldsComplete ? 'bg-gray-400' : 'bg-black'} w-full h-full items-center justify-center`} onPress={() => verifyCode()} >
                        <Text style={tw`text-center text-2xl text-white`}>Next</Text>
            </TouchableOpacity>
            </View>


        </SafeAreaView>
    )
}

export default VerifyCode

const styles = StyleSheet.create({})
