import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Session } from '@supabase/supabase-js';
import React from 'react';
import { View, Text, Button } from 'react-native';
import AuthService from '../../services/AuthService';

export function HomeScreen({ session }: { session: Session }) {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <View style={{ flex: 1, padding: 24, backgroundColor: '#fafafa' }}>
      <Text style={{ fontSize: 22, fontWeight: '600', marginBottom: 16 }}>
        Welcome
      </Text>

      <View
        style={{
          padding: 16,
          borderRadius: 12,
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowRadius: 6,
          marginBottom: 24
        }}
      >
        <Text style={{ fontSize: 16, marginBottom: 4 }}>
          <Text style={{ fontWeight: '600' }}>Email:</Text> {session.user.email}
        </Text>

        <Text style={{ fontSize: 16, marginBottom: 4 }}>
          <Text style={{ fontWeight: '600' }}>Role:</Text>{' '}
          {JSON.stringify(AuthService.getUserRole(session))}
        </Text>

        <Text style={{ fontSize: 16 }}>
          <Text style={{ fontWeight: '600' }}>User ID:</Text>{' '}
          {AuthService.getUserID(session)}
        </Text>
      </View>


      <View style={{ gap: 12 }}>
        <Button title="Create Crop" onPress={() => navigation.navigate('CreateCrops')} />
        <Button title="List Crops" onPress={() => navigation.navigate('ListCrops')} />
        <Button title="Sign Out" onPress={() => AuthService.signOut()} />
      </View>
    </View>

  );
}