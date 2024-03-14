import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider'
import { InsertTables, UpdateTables } from '@/types';


export const useAdminOrderList = ({ archived = false }) =>  {
  const statuses = archived ? ['Delivered'] : ['New', 'Cooking', 'Delivering']

  // READ

  return useQuery({
    queryKey: ['orders', { archived }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .in('status', statuses)
        .order('created_at', {ascending: false}); // most recent first;
      if (error) {
        throw new Error(error.message)
      }
      return data;
    }
  })
}

export const useMyOrderList = () =>  {
  const {session} = useAuth();
  const id = session?.user.id

  return useQuery({
    queryKey: ['orders', { userId: id}],
    // prevent undefined id
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', id)
        .order('created_at', {ascending: false}); // most recent first
      if (error) {
        throw new Error(error.message)
      }
      return data;
    }
  })
}

export const useOrderDetails = (id: number) => {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*, products(*))') // order.order_items.products
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

// CREATE

export const useInsertOrder = () =>  {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const userId = session?.user.id

  return useMutation({
    async mutationFn(data: InsertTables<'orders'>) {  // use helper rather than whole row
      const { error, data: newOrder } = await supabase
        .from('orders')
        .insert({...data, user_id: userId }) // override user_id in case it is sent
        .select() // necessary to return newOrder
        .single()

      if (error) {
        throw new Error(error.message);
      }
      return newOrder; // used for redirection (with id)
    },
    //invalidate the query cache for the 'products' key --> query get executed again
    async onSuccess() {
      await queryClient.invalidateQueries({queryKey: ['orders']});
    },
  })
}

// UPDATE

export const useUpdateOrder = () =>  {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({
      id,
      updatedFields,
    }: {
      id: number,
      updatedFields: UpdateTables<'orders'>;
    }) {
      const { error, data: updatedOrder } = await supabase
        .from('orders')
        .update(updatedFields)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        throw new Error(error.message);
      }
      return updatedOrder;
    },
    //invalidate the query cache for the 'products' key --> query get executed again
    async onSuccess(_, {id}) {
      await queryClient.invalidateQueries({queryKey:['orders']});
      await queryClient.invalidateQueries({queryKey:['orders', id]});
    },
    //  onError(error) {

    // }
  })
}


// // DELETE

// export const useDeleteOrder = () =>  {
//   const queryClient = useQueryClient();
//   return useMutation({
//     async mutationFn(id: number) {
//       const {error} = await supabase.from('products').delete().eq('id', id)
//       if (error) {
//         throw new Error(error.message)
//       }
//     },
//     async onSuccess() {
//       await queryClient.invalidateQueries({queryKey:['products']});
//     },
//   })
// }
