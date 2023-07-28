import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Skeleton } from '@rneui/themed'
import globalStyles from '../../styles'
const LoadingSkeleton = (props) => {
    return (
        <View style={styles.skeletonContainer} >
            <Skeleton width={"100%"} height={250} />
            <View style={styles.productDetails}>
                <View style={styles.titles}>
                    <Skeleton width={"70%"} height={10} />
                    <Skeleton width={"30%"} height={20} />
                </View>
                <View>
                    <Skeleton width={"100%"} height={20} />
                </View>
            </View>
            <View style={styles.productDetails}>
                <Skeleton width={"100%"} height={20} />
            </View>
        </View>
    )
}

export default LoadingSkeleton

const styles = StyleSheet.create({
    productDetails: {
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: 15,
        padding: 10
    },
    skeletonContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: 25,
    },
    titles: {
        justifyContent: "flex-start",
        flexDirection: "row",
        gap: 10,
        alignItems: 'flex-start',
        marginBottom: 5

    }
})