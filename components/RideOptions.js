import React, {useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native'
import tw from 'tailwind-react-native-classnames';

import { Icon as Icn } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';
import "intl";
import "intl/locale-data/jsonp/en";
// import en from 'react-intl/locale-data/en'
const data = [
    {
        id: "123",
        title: "UberX",
        multiplier: 1,
        image: "https://links.papareact.com/3pn"
    },
    {
        id: "456",
        title: "Uber XL",
        multiplier: 1.2,
        image: "https://links.papareact.com/5w8"
    },
    {
        id: "789",
        title: "Uber LUX",
        multiplier: 1.75,
        image: "https://links.papareact.com/7pf"
    }
]
const SURGE_CHARGE_RATE = 1.5
const RideOptions = () => {
    const [selected, setselected] = useState(false);
    const navigation = useNavigation()
    const travelTimeInformation = useSelector(selectTravelTimeInformation);
    // console.log(travelTimeInformation)
    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
                <TouchableOpacity style={[tw`absolute top-3 left-5 z-50 p-3 rounded-full`]} onPress={() => navigation.navigate("NavigateCard")}>
                    <Icn name="chevron-left" type="fontawesome" />
                </TouchableOpacity>
            <Text style={tw`text-center py-5 text-xl`}>Select a Ride - {travelTimeInformation?.distance.text}</Text>
            </View>

            <FlatList 
            data={data} 
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                <TouchableOpacity style={tw`flex-row items-center justify-between px-6 ${item.id == selected?.id && "bg-gray-200" }`} onPress={() => setselected(item)}>
                    <Image style={{
                        width: 100,
                        height: 100
                    }} 
                    resizeMode="contain"
                    source={{uri: item.image}}
                    />
                    <View style={tw`-ml-6`}>
                        <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
                        <Text>{travelTimeInformation?.duration.text} Travel Time</Text>
                    </View>
                    <Text style={tw`text-xl`}>
                        {new Intl.NumberFormat('en-us', {
                            style: 'currency',
                            currency: 'USD'
                        }).format(
                            (travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * item.multiplier) / 100
                        )}
                        </Text>
                </TouchableOpacity>
            )}
            />

            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 m-3 flex-row items-center justify-center ${!selected && "bg-gray-300"}`}>
                    <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title} </Text><Icn name="chevron-right" type="fontawesome" color="white" size={24}  />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RideOptions

const styles = StyleSheet.create({})
