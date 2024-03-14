import { useEffect } from "react"
import { supabase } from '@/lib/supabase'
import { useQueryClient } from '@tanstack/react-query'

export const useInsertOrderSubscription = () => {
  const queryClient = useQueryClient()

  useEffect(()=> {
    const ordersSubscription = supabase
      .channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload) => {
          console.log('Change received!', payload)
          // invalidate query to trigger refresh
          queryClient.invalidateQueries({queryKey:['orders']}); // all queries starting with orders
        }
      )
      .subscribe()

      return () => { // returning a function from useEffect -> called when unmounting the component
      // unsubscribe
      ordersSubscription.unsubscribe();
    }
  }, [])
}
