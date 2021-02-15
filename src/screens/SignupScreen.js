import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { NavigationEvents } from 'react-navigation';
import { Text, Input, Button } from 'react-native-elements';
import NavLink from '../components/NavLink';
import Spacer from '../components/Spacer';

const SignupScreen = ({ navigation }) => {
    const { state, signup, clearErrorMessage } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [first_name, setFname] = useState('');
    const [last_name, setLname] = useState('');


    return (
        <View style={styles.container}>
            <NavigationEvents 
                onWillFocus={clearErrorMessage}
            />
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer>
                <Text h3>Registration form</Text>
            </Spacer>
            <Spacer />
            <Input 
                label='Email' 
                value={email} 
                onChangeText={setEmail}
                autoCapitalize='none' 
                autoCorrect={false}
            />
            <Input 
                secureTextEntry={true}
                label='Password'
                value={password} 
                onChangeText={setPassword}
                autoCapitalize='none' 
                autoCorrect={false}  
            />
            <Input 
                label='First Name' 
                value={first_name} 
                onChangeText={setFname}
                autoCorrect={false} 
            />
            <Input 
                label='Last Name' 
                value={last_name} 
                onChangeText={setLname}
                autoCorrect={false} 
            />
            {state.errorMessage ? (
                <Text 
                    style={styles.errorMessage}>{state.errorMessage}
                </Text>
            ) : null}
            <Spacer>
                <Button title="Sign Up" onPress={() => signup({ email, password, first_name, last_name })}/>
            </Spacer>
            <NavLink
                routeName="Signin"
                text="Already have an accuont? Sign in instead!"
            />
        </View>
    );
};

SignupScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 230
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 10
    }
});

export default SignupScreen;