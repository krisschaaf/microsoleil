import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Session } from '@supabase/supabase-js';
import React from 'react';
import {View, Text, Button} from 'react-native';
import AuthService from '../../services/AuthService';

export function HomeScreen({ session }: { session: Session }) {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Text>Welcome, {session.user.email}</Text>
      <Text> {JSON.stringify(AuthService.getUserRoles(session))}</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
      <Button title="Sign Out" onPress={() => AuthService.signOut()} />
    </View>
  );
}