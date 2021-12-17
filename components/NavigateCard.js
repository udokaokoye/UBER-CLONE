import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from '@env'
import { setDestination } from '../slices/navSlice';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import NavFavourites from './NavFavourites';
import { Icon as Icn } from 'react-native-elements';

const NavigateCard = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}>Good Morning Udoka</Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <View>
                <GooglePlacesAutocomplete 
                    styles={{container: {flex: 0, backgroundColor: "white", paddingTop: 20}, textInput: {fontSize: 18, borderRadius: 0, backgroundColor: "#DDDDDF"}, textInputContainer: {paddingHorizontal: 20, paddingBottom: 0}}}
                    placeholder='Where to?'
                    nearbyPlacesAPI="GooglePlacesSearch"
                    returnKeyType={"search"}
                    debounce={400}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        dispatch(setDestination({
                            location: details.geometry.location,
                            description: data.description
                        }))

                        navigation.navigate("RideOptionsCard")
                    }}
                    fetchDetails={true}
                    enablePoweredByContainer={false}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'en',
                    }}
                    // currentLocation={true}
                    />
                </View>
                <NavFavourites />
            </View>
            <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
                <TouchableOpacity style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`} 
                onPress={() => navigation.navigate("RideOptionsCard")}
                > 
                    <Icn name='car' type="font-awesome" color="white" size={16} />
                    <Text style={tw`text-white text-center`}>Rides</Text>
                </TouchableOpacity>

                <TouchableOpacity style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}> 
                    <Icn name='fast-food-outline' type="ionicon" color="black" size={16} />
                    <Text style={tw`text-center`}>Eats</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default NavigateCard

const styles = StyleSheet.create({})
