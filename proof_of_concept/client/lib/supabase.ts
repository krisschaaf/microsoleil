import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ckjhfyyubzzpocvazkhc.supabase.co'
const supabasePublishableKey = 'sb_publishable_nFo6mA3ujqn4MRuBdBNJgw_rQAd9TMO'

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})