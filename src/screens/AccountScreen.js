import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';

const AccountScreen = () => {
    const { signout } = useContext(AuthContext);

    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            <Text style={{ fontSize:48 }}>Account Screen</Text>
            <Spacer>
                <Button 
                    title="signout"
                    onPress={signout}
                />
            </Spacer>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default AccountScreen;