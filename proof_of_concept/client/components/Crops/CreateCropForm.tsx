import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, Alert } from 'react-native';
import { supabase } from '../../lib/supabase'; // adjust path to your client

export default function CreateCropForm() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const createCrop = async () => {
    if (!name || !category) {
      Alert.alert('Please fill all fields');
      return;
    }

    setLoading(true);

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      Alert.alert('Not authenticated');
      setLoading(false);
      return;
    }

    const { error } = await supabase.from('crops').insert({
      name,
      category,
      user_id: user.id
    });

    setLoading(false);

    if (error) {
      Alert.alert('Insert failed', error.message);
      return;
    }

    Alert.alert('Success', 'Crop created');
    setName('');
    setCategory('');
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>Create New Crop</Text>

      <Text>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 8,
          borderRadius: 6,
          marginBottom: 12
        }}
      />

      <Text>Category</Text>
      <TextInput
        value={category}
        onChangeText={setCategory}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 8,
          borderRadius: 6,
          marginBottom: 12
        }}
      />

      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button title="Create Crop" onPress={createCrop} />
      )}
    </View>
  );
}
