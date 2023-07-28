import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { Input, CheckBox, Button } from "@rneui/themed";
import GlobalStyles from "../../styles";
import logo from "../assets/logo.png";
import globalStyles from '../../styles';
import { apiCalls } from '../utils/apiCalls';
import { useToast } from 'react-native-toast-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../store/auth/actions';
import { useDispatch } from 'react-redux'

const Register = (props) => {
    const [regUser, setRegUser] = useState({
        username: '',
        phone: '',
        password: '',
    })

    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const dispatch = useDispatch()
    const handleChange = (value, name) => {
        setRegUser({ ...regUser, [name]: value })
    }
    const handleNavigation = () => {
        props.navigation.navigate('Login')
        setRegUser({})
    }



    const handleSubmit = async () => {
        try {
            setLoading(true)
            let getResp = await apiCalls('/api/v1/users/register', regUser, 'POST', toast)
            if (getResp.data) {
                await AsyncStorage.setItem('token', getResp.data.data.token)
                await AsyncStorage.setItem('user_id', getResp.data.data.user_id)
                await AsyncStorage.setItem('username', getResp.data.data.username)
                // setRegUser({})
                dispatch((loginUser(getResp.data.data, getResp.data.data.token)))
                props.navigation.navigate('Home')
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    return (
        <ScrollView>
            <View style={styles.regContainer}>
                <View>
                    <Image source={logo} style={{ width: 150, objectFit: "contain", height: 150 }} />
                </View>
                <View style={{ width: "100%", marginTop: 10 }}>

                    <Input
                        placeholder='Enter your username'
                        errorStyle={{ color: 'red' }}
                        inputStyle={globalStyles.inputField}
                        inputContainerStyle={{
                            borderBottomColor: "green",
                            borderBottomWidth: 0
                        }}
                        value={regUser.username}
                        onChangeText={(e) => handleChange(e, 'username')}
                    />
                    <Input
                        placeholder='Enter your phone number'
                        errorStyle={{ color: 'red' }}
                        keyboardType='phone-pad'
                        inputStyle={globalStyles.inputField}
                        inputContainerStyle={{
                            borderBottomColor: "green",
                            borderBottomWidth: 0
                        }}
                        value={regUser.phone}
                        onChangeText={(e) => handleChange(e, 'phone')}

                    />
                    <Input
                        placeholder='Enter your password'
                        errorStyle={{ color: 'red' }}
                        inputStyle={globalStyles.inputField}
                        inputContainerStyle={{
                            borderBottomColor: "green",
                            borderBottomWidth: 0
                        }}
                        secureTextEntry={true}
                        value={regUser.password}
                        onChangeText={(e) => handleChange(e, 'password')}
                    />
                </View>

                <View style={{ width: "90%" }}>
                    <Button color={'#e0dc14'} loading={loading} disabled={loading} onPress={handleSubmit} buttonStyle={globalStyles.btnStyle}>
                        Submit
                    </Button>
                </View>
            </View>
            <View style={styles.regContainer}>
                <Text style={GlobalStyles.black}>
                    {"I have an acccount ? "}
                </Text>
                <Button type='*-clear' style={[GlobalStyles.black, {
                    fontWeight: 900,
                }]}
                    onPress={handleNavigation}
                >
                    Login
                </Button>
            </View>
        </ScrollView>
    )
}

export default Register

const styles = StyleSheet.create({
    regContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        marginTop: 5
    }
})