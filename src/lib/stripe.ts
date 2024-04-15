//call edge function in backend to create payment intent

import { Alert } from "react-native";
import { supabase } from '@/lib/supabase';

const fetchPaymentSheetParams = async (amount: number) => {

  const {data, error } = await supabase.functions.invoke('payment-sheet', {
    body: { amount },
    // headers: { "Content-Type": "application/json" }
  });


  if(error) {
    console.log("error", error.message);
    Alert.alert("error fetching payment sheet params"+ error.message)
    return {}
  }
  if (data) {
    return data;
  }
}

export const initializePaymentSheet = async (amount: number) => {
  console.log('initializing Payment Sheet for', amount);
  const data = await fetchPaymentSheetParams(amount)
  console.log('payment sheet params',data);

}
