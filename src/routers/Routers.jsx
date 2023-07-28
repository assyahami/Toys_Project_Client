import React, { useState, useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Login from '../pages/login'
import Home from '../pages/home'
import ProductDetails from '../pages/productDetails'
import Register from '../pages/register'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector } from 'react-redux'

const Stack = createNativeStackNavigator()

const Routers = () => {
    const [token, setToken] = useState('')
    const {authToken} = useSelector((state) => state.authReducer)

    const hadnleAutu = async () => {
        try {
            let getToken = await AsyncStorage.getItem('token')
            setToken(getToken)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        hadnleAutu()
        console.log(authToken);
    }, [])

    return (
        <NavigationContainer screenOptions={{
            animation: 'slide_from_right',
            animationTypeForReplace: 'pop'
        }} >
            <Stack.Navigator >
                {authToken == null ?
                    (
                        <Stack.Group>
                            <Stack.Screen name='Register' component={Register} />
                            <Stack.Screen name='Login' component={Login} />
                        </Stack.Group>
                    )
                    :
                    (<Stack.Group>
                        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
                        <Stack.Screen name='Product Details' component={ProductDetails} />
                    </Stack.Group>
                    )
                }
            </Stack.Navigator>
        </NavigationContainer >
    )
};
export default Routers