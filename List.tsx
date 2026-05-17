import React, { useRef } from 'react'
import { ScrollViewComponent, Text, FlatList, SafeAreaView } from 'react-native'
import { AsyncStorage } from '@react-native-async-storage/async-storage'
interface Props {
    tasks: string[]
    // style: {
    //     display: string
    // }
}

/**
 * React.memo is used for memorizing repetitive lists to save computational resources. 
 * We will test it using slow computation
 * React.memo
 */
const List = React.memo(({ tasks }: Props) => {
    //const count = useRef(0);
    const start = Date.now();
    while (Date.now() - start < 2000) {
        console.log(Date.now() - start);
    }
    return (
        <SafeAreaView>
            <FlatList
                data={tasks}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <Text> {item}</Text>}>
            </FlatList>
        </SafeAreaView >
    )
})

export default List