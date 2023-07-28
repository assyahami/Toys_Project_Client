import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, FlatList, ScrollView, ActivityIndicator } from 'react-native'
import ProductCard from '../components/Card'
import globalStyles from '../../styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button, Skeleton } from '@rneui/themed'
import { GETAPI } from '../utils/apiCalls'
import LoadingSkeleton from '../components/loadingSkeleton'

const MAX_ITEMS = 30

const Home = (props) => {
    const [username, setUsername] = useState('')
    const [page, setPage] = useState(0)
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const flastList = useRef()

    const handleGetUserName = async () => {
        try {
            let name = await AsyncStorage.getItem('username')
            setUsername(name)
        }
        catch (error) {
            console.log(error,'error');
        }
    }

    const handleFetchData = async (pageNumber) => {
        try {
            setIsLoading(true)
            let getResp = await GETAPI(`/api/v1/products/list_products?page=${pageNumber}`)
            let getData = getResp?.data?.data;
            setIsLoading(false)
            return getData
        }
        catch (error) {
            setData([])
            setIsLoading(false)
            console.log(error,'error');
        }
    }

    const loadMoreData = async () => {
        if (data.length >= MAX_ITEMS) return;
        if (!isLoading) {
            setPage(page + 5)
            handleFetchData(page + 5).then((res) => {
                if (res.length > 0) {
                    setData((prevData) => [...prevData, ...res]);
                }
            })
        }
    }


    useEffect(() => {
        handleGetUserName()
        handleFetchData(page).then((responseData) => setData(responseData)).catch((err) => setData([]))
    }, [])
    const renderFooter = () => {
        if (data?.length >= MAX_ITEMS) {
            return (<View style={{ backgroundColor: "#e7e7e7" }}>
                <Text style={{ color: "#333", textAlign: "center", padding: 15 }} >No more toys</Text>
            </View>)
        }
        return isLoading ?
            [...Array(5)].map((item, index) =>
                <View key={index}>
                    <LoadingSkeleton />
                </View>
            )
            : null
    };
    return (
        <View>

            <View style={styles.headContainer}>
                <View style={styles.header}>
                    <Text style={globalStyles.heading}>SkipCry</Text>
                </View>
                <View style={styles.header}>
                    <Text style={globalStyles.heading}>Hey {username} !</Text>
                </View>
            </View>

            <FlatList
                data={data}
                keyExtractor={(item) => item._id}
                onEndReached={loadMoreData}
                ListFooterComponent={renderFooter}
                ListEmptyComponent={renderFooter}
                onEndReachedThreshold={1}
                renderItem={({ item, index }) => <ProductCard item={item} index={index} navigate={props.navigation} />}
            />
            {data == undefined && (<View style={{ backgroundColor: "#e7e7e7", height: "100%r", justifyContent: "center" }}>
                <Text style={{ color: "#333", textAlign: "center", padding: 15 }} >No more toys</Text>
            </View>)}
        </View>
    )
}

export default Home


const styles = StyleSheet.create({
    header: {
        padding: 15,
    },
    headContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
        backgroundColor: "#fff",
        elevation: 5

    }
})