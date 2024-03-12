import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase';

// READ

export const useProductList = () =>  {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        throw new Error(error.message)
      }
      return data;
    }
  })
}

export const useProduct = (id: number) =>  {
  return useQuery({
    queryKey: ['products', 'id'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
      if (error) {
        throw new Error(error.message)
      }
      return data;
    }
  })
}

// CREATE

export const useInsertProduct = () =>  {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data: any) {
      const { error, data: newProduct } = await supabase.from('products').insert({
        name: data.name,
        image: data.image,
        price: data.price
      })
      .single()

      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
    //invalidate the query cache for the 'products' key --> query get executed again
    async onSuccess() {
      await queryClient.invalidateQueries(['products']);
    },
    //  onError(error) {

    // }
  })
}

// UPDATE

export const useUpdateProduct = () =>  {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data: any) {
      const { error, data: updatedProduct } = await supabase.from('products').update({
        name: data.name,
        image: data.image,
        price: data.price
      })
      .eq('id', data.id)
      .select()
      .single()

      if (error) {
        throw new Error(error.message);
      }
      return updatedProduct;
    },
    //invalidate the query cache for the 'products' key --> query get executed again
    async onSuccess(_, data) {
      await queryClient.invalidateQueries(['products']);
      await queryClient.invalidateQueries(['products', data.id]);
    },
    //  onError(error) {

    // }
  })
}

// DELETE

export const useDeleteProduct = () =>  {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(id: number) {
      const {error} = await supabase.from('products').delete().eq('id', id)
      if (error) {
        throw new Error(error.message)
      }
    },
    async onSuccess() {
      await queryClient.invalidateQueries(['products']);
    },
  })
}
