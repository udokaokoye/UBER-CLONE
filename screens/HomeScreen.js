import React, {useEffect} from 'react'
import { StyleSheet, Text, View, BackHandler, Image, AsyncStorage } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from '@env'
import { useDispatch, useSelector } from 'react-redux';
import {setDestination, setOrigin} from '../slices/navSlice'
import {installWebGeolocationPolyfill} from 'expo-location';
import NavFavourites from '../components/NavFavourites';
import { selectUserInfo } from '../slices/userSlice';
import { ScrollView } from 'react-native-gesture-handler';

const HomeScreen = () => {
    installWebGeolocationPolyfill()
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo)
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
        BackHandler.removeEventListener('hardwareBackPress', () => true)
    }, [])

    useEffect(() => {
        console.log(userInfo)
        console.log(AsyncStorage.getItem("user"))
    }, [])

    return (
        <View style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image 
                source={{uri: "https://links.papareact.com/gzs"}}
                style={{width: 100, height: 100, resizeMode: 'contain'}}
                />
                <Text style={tw`text-xl px-3 py-3`}>Welcome, <Text style={tw`font-bold`}>{userInfo.name}</Text></Text>

                <GooglePlacesAutocomplete 
                    styles={{container: {flex: 0}, textInput: {fontSize: 18}}}
                    placeholder='Where From?'
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                    minLength={2}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        dispatch(setOrigin({
                            location: details.geometry.location,
                            description: data.description
                        }))

                        dispatch(setDestination(null))
                    }}
                    fetchDetails={true}
                    enablePoweredByContainer={false}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'en',
                    }}
                    currentLocation={true}
                    />

                <NavOptions />
                <NavFavourites />
            </View>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    
})
