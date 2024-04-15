//call edge function in backend to create payment intent

import { Alert } from "react-native";
import { supabase } from '@/lib/supabase';
import { FunctionsFetchError, FunctionsHttpError, FunctionsRelayError } from "@supabase/supabase-js";
import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";

const fetchPaymentSheetParams = async (amount: number) => {

  const {data, error } = await supabase.functions.invoke('payment-sheet', {
    body: { amount },
  },
  );


  if(error) {
    // if (error instanceof FunctionsHttpError) {
    //   const errorMessage = await error.context.json()
    //   console.log('Function returned an error', errorMessage)
    // } else if (error instanceof FunctionsRelayError) {
    //   console.log('Relay error:', error.message)
    // } else if (error instanceof FunctionsFetchError) {
    //   console.log('Fetch error:', error.message)
    // } else {console.log('other error')}

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
  const {paymentIntent, publishableKey} = await fetchPaymentSheetParams(amount)
  if (!paymentIntent) {
    // console.log('stg missing');
    // console.log("paymentIntent", paymentIntent);
    // console.log("publishableKey", publishableKey);
    return
  }
  await initPaymentSheet({
    merchantDisplayName: "Dabdoubeh's",
    paymentIntentClientSecret: paymentIntent,
    defaultBillingDetails: {
      name: 'John Doe',
    }
  })

}

export const openPaymentSheet = async () => {
  const { error } = await presentPaymentSheet()
  if (error) {
    console.log(error.message);

    Alert.alert(error.message);
    return false;
  }
  Alert.alert('Success', 'Your order is confirmed!');
  return true
}
