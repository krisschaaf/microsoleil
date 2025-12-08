import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import { supabase } from '../../lib/supabase'; // adjust path

type Crop = {
  id: string;
  created_at: string;
  name: string;
  category: string;
  user_id: string;
};

export default function CropsList() {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCrops = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('crops')
      .select('*')
      .order('created_at', { ascending: false });

    setLoading(false);

    if (error) {
      Alert.alert('Error loading crops', error.message);
      return;
    }

    setCrops(data || []);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCrops();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (crops.length === 0) {
    return (
      <View style={{ padding: 16 }}>
        <Text>No crops found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={crops}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      renderItem={({ item }) => (
        <View
          style={{
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#eee'
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.name}</Text>
          <Text style={{ color: '#555' }}>{item.category}</Text>
          <Text style={{ fontSize: 12, color: '#999' }}>
            {new Date(item.created_at).toLocaleString()}
          </Text>
          <Text style={{ fontSize: 12, color: '#999' }}>
            User ID: {item.user_id}
          </Text>
        </View>
      )}
    />
  );
}
