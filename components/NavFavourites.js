import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { Icon as Icn } from 'react-native-elements';

const data = [
    {
        id: "123",
        icon: "home",
        location: "Home",
        destination: "Ferguson Road, Cincinnati, OH"
    },
    {
        id: "456",
        icon: "briefcase",
        location: "Work",
        destination: "Crown Pointe, West Chester, OH"
    }
]
const NavFavourites = () => {
    return (
        <FlatList 
        data={data} 
        keyExtractor={(item) => item.id} 
        ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-200`, {height: 0.5}]}></View>
        )} 
        renderItem={({item}) => (
            <TouchableOpacity style={tw`flex-row items-center p-5`}>
                <Icn 
                style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                name={item.icon} 
                type="ionicon" 
                color="white" s
                ize={18} />
                
                <View>
                    <Text style={tw`font-semibold text-lg`}>{item.location}</Text>
                    <Text style={tw`text-gray-500`}>{item.destination}</Text>
                </View>
            </TouchableOpacity>
        )} />
    )
}

export default NavFavourites

const styles = StyleSheet.create({})
