import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import MapView from 'react-native-maps';
import Map from '../components/Map'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigateCard from '../components/NavigateCard';
import RideOptions from '../components/RideOptions';
import { Icon as Icn } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
const MapScreen = () => {
    const Stack  = createNativeStackNavigator();
    const navigation = useNavigation()
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")} style={tw`absolute top-16 left-5 z-50 rounded-full p-2 bg-gray-100 shadow-lg`}>
            <Icn name="chevron-left" type="fontawesome" color="black" size={29} />
            </TouchableOpacity>
            <View style={tw`h-1/2`}>
                <Map />
            </View>
            <View style={tw`h-1/2`}>
                <Stack.Navigator>
                    <Stack.Screen 
                    name='NavigateCard'
                    component={NavigateCard}
                    options={{headerShown: false}}
                    />

                    <Stack.Screen 
                    name='RideOptionsCard'
                    component={RideOptions}
                    options={{headerShown: false}}
                    />
                </Stack.Navigator>
            </View>
        </View>
    )
}

export default MapScreen

const styles = StyleSheet.create({})
