import React, { useContext } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Button, ListItem, Text } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as TrackContext } from '../context/TrackContext';
import ImageP from '../components/ImageForm';


const AccountScreen = () => {
  const { signout } = useContext(AuthContext);
  const { state, fetchName } = useContext(TrackContext);
  const user = state[0];


  return (
    <View>
      <NavigationEvents onWillFocus={fetchName} />
      <Spacer>
      </Spacer>
      <ImageP />
      <Spacer>
        <Text style={{ alignSelf: 'center' }} h4>Основная информация:</Text>
      </Spacer>
      <FlatList 
        data={state}
        keyExtractor={item => item._id}
        renderItem={({ item }) => {
          return (
            <>
              <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title h4>
                    Имя - {item.first_name}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
              <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title h4>
                    Фамилия - {item.last_name}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
              <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title h4>
                    Почта - {item.email}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            </>
          );
        }}
      />
      <View style={{ borderStyle: 'solid' }}>
        <Spacer>
          <Button 
            title="Sign Out"
            type='outline'
            onPress={signout}
            style={{ shadowColor: 'black', shadowOffset: 20 }}
          />
        </Spacer>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlignVertical: 'auto'
  }
});

export default AccountScreen;