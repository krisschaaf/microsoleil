import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { HomeScreen } from './components/Home/HomeScreen';
import { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';
import Auth from './components/Auth/Auth';
import AuthService from './services/AuthService';
import CreateCropForm from './components/Crops/CreateCropForm';
import CropsList from './components/Crops/CropsList';

const Stack = createNativeStackNavigator();

export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    AuthService.activate();

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        {session && session.user ?
          <Stack.Screen name="Home">
            {() => <HomeScreen session={session} />}
          </Stack.Screen>
          : <Stack.Screen name="Auth" component={Auth} />
        }

        <Stack.Screen name="CreateCrops" component={CreateCropForm} />
        <Stack.Screen name="ListCrops" component={CropsList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
