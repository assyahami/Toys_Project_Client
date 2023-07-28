import { ScrollView, StyleSheet, Text, View, Image, NativeModules } from 'react-native'
import React, { useState } from 'react'
import { Input, CheckBox, Button } from "@rneui/base";
import GlobalStyles from "../../styles";
import logo from "../assets/logo.png";
import globalStyles from '../../styles';
import { useToast } from 'react-native-toast-notifications'
import { apiCalls } from '../utils/apiCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import { loginUser } from '../store/auth/actions';


const Login = (props) => {
    const [regUser, setRegUser] = useState({
        phone: '',
        password: '',
    })
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const handleNavigation = () => {
        props.navigation.navigate('Register')
    }

    const toast = useToast()

    const handleChange = (value, name) => {
        setRegUser({ ...regUser, [name]: value })
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)
            let getResp = await apiCalls('/api/v1/users/login', regUser, 'POST', toast)
            if (getResp.data) {
                await AsyncStorage.setItem('token', getResp.data.data.token)
                await AsyncStorage.setItem('user_id', getResp.data.data.user_id)
                await AsyncStorage.setItem('username', getResp.data.data.username)
                setRegUser({})
                dispatch((loginUser(getResp.data.data,getResp.data.data.token)))
                props.navigation.navigate('Home')
            }
            setLoading(false)
            // NativeModules.DevSettings.reload()
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
                <View style={{ width: "100%", marginTop: 15 }}>
                    <Input
                        placeholder='Enter your phone number'
                        errorStyle={{ color: 'red' }}
                        inputStyle={globalStyles.inputField}
                        inputContainerStyle={{
                            borderBottomColor: "green",
                            borderBottomWidth: 0
                        }}
                        keyboardType='phone-pad'
                        onChangeText={(e) => handleChange(e, 'phone')}
                        value={regUser.phone}

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
                    {"Don't have an acccount ? "}
                </Text>
                <Button type='*-clear' style={[GlobalStyles.black, {
                    fontWeight: 900,
                }]} onPress={handleNavigation}>
                    Register
                </Button>
            </View>
        </ScrollView>
    )
}

export default Login

const styles = StyleSheet.create({
    regContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        marginTop: 15,
    }
})