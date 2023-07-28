import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import globalStyles from '../../styles'
import { GETAPI } from '../utils/apiCalls'
import LoadingSkeleton from '../components/loadingSkeleton'


const ProductDetails = (props) => {
    const { data } = props.route.params
    const [crtItem, setCrtItem] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const handleFetchData = async (pageNumber) => {
        try {
            setIsLoading(true)
            let getResp = await GETAPI(`/api/v1/products/get_product/${data.id}`)
            let getData = getResp?.data;
            setIsLoading(false)
            setCrtItem(getData)
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleFetchData()
    }, [])


    return (
        <ScrollView>
            {isLoading ? <LoadingSkeleton /> : <View style={styles.detailsContainer}>
                <Image source={data.imagePath} style={{ width: 250, height: 250, objectFit: "cover" }} />
                <Text style={globalStyles.heading}>{crtItem.name}</Text>
                <View style={styles.price}>
                    <Text style={globalStyles.black}>Price - $ {crtItem.price}</Text>
                </View>
                <View>
                    <Text style={globalStyles.heading}>{"Description :"}</Text>
                    <Text style={globalStyles.black}>{crtItem.description}</Text>
                </View>
            </View>}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    detailsContainer: {
        justifyContent: "space-around",
        gap: 15,
        flexDirection: "column",
        padding: 25,
        alignItems: 'flex-start'
    },
    price: {
        backgroundColor: "#e0dc14",
        padding: 5,
        borderRadius: 25,
        color: "#fff",
        marginTop: 15,
        width: ''
    },
})
export default ProductDetails