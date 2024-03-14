
import { useQuery, useMutation } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider'
import { InsertTables } from '@/types';



export const useInsertOrderItem = () =>  {
  // const { session } = useAuth();

  return useMutation({
    async mutationFn(items: InsertTables<'order_items'>) {  // use helper rather than whole row
      const { error, data: newOrderItem } = await supabase
        .from('order_items')
        .insert(items) // override user_id in case it is sent
        .select() // necessary to return newOrder
        // .single()
      if (error) {
        throw new Error(error.message);
      }
      return newOrderItem; // used for redirection (with id)
    },
  })
}
