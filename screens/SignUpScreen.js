import { TabRouter, useNavigation } from '@react-navigation/native';
import React, {useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, AsyncStorage } from 'react-native'
import { Icon as Icn } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { setuserInfo } from '../slices/userSlice';

const SignUpScreen = ({route}) => {
    const navigation = useNavigation()
    const [email, setemail] = useState("")
    const [name, setname] = useState("")

    const dispatch = useDispatch()

    const signUp = () => {
        // console.log(route.params.phone);
        // return;
        if (email == "" || name == "") {
            alert("FILL_IN_ALL_FIELDS")
            return false;
        }
        const formData = new FormData;
        formData.append("email", email)
        formData.append("name", name);
        formData.append("phone", route.params.phone)

        fetch("http://192.168.1.2/taxi-app/auth.php?signup=1", {
            method: "POST",
            body: formData
        }).then((res) => res.json()).then((data) => {
            if (data[0] == "PROCEED") {
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
            } else {
                alert("AN EROOR OCCURED")
            }
        })


    }
    return (
        <SafeAreaView style={[tw`w-full h-full px-5`, {paddingTop: StatusBar.currentHeight}]}>
            <KeyboardAvoidingView 
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{flex: 1}} >

                <View style={tw`flex-row items-center`}>
                    <TouchableOpacity onPress={() => navigation.navigate("AuthScreen")}>
                            <Icn name="arrow-back" type="ionicons" color="black" size={25} />
                    </TouchableOpacity>
                    <Text style={tw`text-2xl font-bold pt-10 pb-10 ml-5`}>SignUP</Text>
                </View>
                
                <View style={{marginBottom: 20}}>
                    <Text style={tw`text-xl`}>Email Address</Text>
                    <TextInput style={[tw` mt-3 px-2 py-2`, {borderBottomWidth: 2, borderBottomColor: "black"}]} placeholder="Enter Email" onChangeText={(txt) => setemail(txt) } />
                </View>

                <View style={{marginBottom: 20}}>
                    <Text style={tw`text-xl`}>Name</Text>
                    <TextInput style={[tw` mt-3 px-2 py-2`, {borderBottomWidth: 2, borderBottomColor: "black"}]} placeholder="Enter Name" onChangeText={(txt) => setname(txt) } />
                </View>
            </KeyboardAvoidingView>

            <TouchableOpacity style={[tw`w-full bg-black mt-auto items-center justify-center mb-2`, {height: 60}]} onPress={() => signUp()}>
                <Text style={tw`text-2xl text-white`}>Signup</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({})
