
import React, { useState } from 'react';
import { 
  AlertDialog,
  AlertDialogContent, 
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/use-cart';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  name: z.string().min(3, { message: 'الاسم يجب أن يكون 3 أحرف على الأقل' }),
  address: z.string().min(10, { message: 'الرجاء كتابة العنوان بشكل مفصل' }),
  phone: z.string().optional(),
});

const CheckoutForm = ({ isOpen, onClose }: CheckoutFormProps) => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      phone: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // تجهيز رسالة الواتساب
    const phoneNumber = '777492635';
    const orderItems = cart.map(item => 
      `${item.product.name} (${item.quantity}) - ${item.product.price} ريال`
    ).join('\n');
    
    const message = `
طلب جديد:
------------------
الاسم: ${values.name}
العنوان: ${values.address}
${values.phone ? `رقم الهاتف: ${values.phone}` : ''}
------------------
المنتجات:
${orderItems}
------------------
الإجمالي: ${getCartTotal().toFixed(2)} ريال
    `;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // فتح رابط الواتساب
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: 'تم إرسال الطلب',
      description: 'تم تحويلك إلى واتساب لإتمام الطلب',
    });
    
    clearCart();
    setIsSubmitting(false);
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>إتمام الطلب</AlertDialogTitle>
          <AlertDialogDescription>
            الرجاء إدخال بيانات التوصيل لإتمام الطلب
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الاسم</FormLabel>
                  <FormControl>
                    <Input placeholder="الاسم الكامل" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عنوان التوصيل</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="يرجى كتابة العنوان بالتفصيل" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم هاتف إضافي (اختياري)</FormLabel>
                  <FormControl>
                    <Input placeholder="رقم الهاتف" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <AlertDialogFooter className="pt-4">
              <AlertDialogCancel>إلغاء</AlertDialogCancel>
              <Button 
                type="submit" 
                className="bg-amber-600 hover:bg-amber-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'جاري الإرسال...' : 'إرسال الطلب عبر واتساب'}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CheckoutForm;
