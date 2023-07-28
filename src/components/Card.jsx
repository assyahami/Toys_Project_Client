import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Card } from "@rneui/themed";
import globalStyles from '../../styles';

const ProductCard = ({ item, index, navigate }) => {
    const imagePaths = {
        image1: require(`../assets/productImages/1.jpg`),
        image2: require(`../assets/productImages/2.jpg`),
        image3: require(`../assets/productImages/3.jpg`),
        image4: require(`../assets/productImages/4.jpg`),
        image5: require(`../assets/productImages/5.jpg`),
        image6: require(`../assets/productImages/7.jpg`),
        image7: require(`../assets/productImages/8.jpg`),
        image8: require(`../assets/productImages/2.jpg`),
    };

    let randomFloor = Math.floor(Math.random() * 10)
    let randNumber = randomFloor == 0 ? 1 : randomFloor
    let indx = index > 10 ? randNumber : index + 1
    const imagePath = imagePaths['image' + indx] || imagePaths['image5'];

    const handleNavigationPrdouctDetails = () => {
        navigate.navigate('Product Details', {
            data: {
                id: item._id,
                imagePath
            }
        })
    }


    return (
        <View key={item._id}>
            <TouchableOpacity onPress={handleNavigationPrdouctDetails} key={item._id}>
                <Card containerStyle={styles.productCard}>
                    <Card.Image source={imagePath} />
                    <View style={styles.productDetails}>
                        <View>
                            <Text style={globalStyles.black}>{item.name}</Text>
                        </View>
                        <View style={styles.price}>
                            <Text style={globalStyles.black}>$ {item.price}</Text>
                        </View>
                    </View>
                    <View style={styles.productDetails}>
                        <Text style={{ ...globalStyles.black, fontSize: 12 }}>{item.description}</Text>
                    </View>
                </Card>
            </TouchableOpacity>
        </View>
    )
}

export default ProductCard

const styles = StyleSheet.create({
    productDetails: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 15,
        padding: 10
    },
    price: {
        backgroundColor: "#e0dc14",
        padding: 5,
        borderRadius: 25,
        color: "#fff",
        marginTop: 15
    },
    productCard: {
        padding: 0,
        border: 0,
        margin: 25,
        elevation: 8,
        shadowOpacity: 0.4,
    }
})