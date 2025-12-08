import React, { useState } from 'react'
import { Alert, Text, View, TextInput } from 'react-native'
import { Button } from 'react-native'
import AuthService from '../../services/AuthService'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await AuthService.signIn({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await AuthService.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>Email</Text>
      <TextInput
        style={{
          marginBottom: 12,
          fontSize: 16,
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 8,
          borderRadius: 6,
        }}
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="email@address.com"
        autoCapitalize={'none'}
      />

      <Text style={{ fontSize: 18, marginBottom: 8 }}>Password</Text>
      <TextInput
        style={{
          marginBottom: 12,
          fontSize: 16,
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 8,
          borderRadius: 6,
        }}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
        autoCapitalize={'none'}
      />

      <View style={{ gap: 12 }}>
        <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
        <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
      </View>
    </View>
  )
}