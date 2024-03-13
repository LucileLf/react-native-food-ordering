import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider'


export const useAdminOrderList = ({ archived = false }) =>  {
  const statuses = archived ? ['Delivered'] : ['New', 'Cooking', 'Delivering']

  // READ

  return useQuery({
    queryKey: ['orders', { archived }],
    queryFn: async () => {
      const { data, error } = await supabase.from('orders').select('*').in('status', statuses);
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
      const { data, error } = await supabase.from('orders').select('*').eq('user_id', id);
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
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

// export const useOrder = (id: number) => {
//   return useQuery({
//     queryKey: ['products', id],
//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from('products')
//         .select('*')
//         .eq('id', id)
//         .single();

//       if (error) {
//         throw new Error(error.message);
//       }
//       return data;
//     },
//   });
// };
// // CREATE

// export const useInsertOrder = () =>  {
//   const queryClient = useQueryClient();
//   return useMutation({
//     async mutationFn(data: any) {
//       const { error, data: newProduct } = await supabase.from('products').insert({
//         name: data.name,
//         image: data.image,
//         price: data.price
//       })
//       .single()

//       if (error) {
//         throw new Error(error.message);
//       }
//       return newProduct;
//     },
//     //invalidate the query cache for the 'products' key --> query get executed again
//     async onSuccess() {
//       await queryClient.invalidateQueries({queryKey: ['products']});
//     },
//   })
// }

// // UPDATE

// export const useUpdateOrder = () =>  {
//   const queryClient = useQueryClient();
//   return useMutation({
//     async mutationFn(data: any) {
//       const { error, data: updatedProduct } = await supabase.from('products').update({
//         name: data.name,
//         image: data.image,
//         price: data.price
//       })
//       .eq('id', data.id)
//       .select()
//       .single()

//       if (error) {
//         throw new Error(error.message);
//       }
//       return updatedProduct;
//     },
//     //invalidate the query cache for the 'products' key --> query get executed again
//     async onSuccess(_, data) {
//       await queryClient.invalidateQueries({queryKey:['products']});
//       await queryClient.invalidateQueries({queryKey:['products', data.id]});
//     },
//     //  onError(error) {

//     // }
//   })
// }

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