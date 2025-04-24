
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  overall: z.number().min(1).max(5),
  service: z.number().min(1).max(5),
  quality: z.number().min(1).max(5),
  location: z.number().min(1).max(5),
  comment: z.string().min(10, {
    message: "Отзыв должен содержать минимум 10 символов",
  }),
});

interface ReviewFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  onCancel: () => void;
}

export function ReviewForm({ onSubmit, onCancel }: ReviewFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      overall: 0,
      service: 0,
      quality: 0,
      location: 0,
      comment: "",
    },
  });

  const StarRating = ({ name, label }: { name: string; label: string }) => {
    const value = form.watch(name as any) || 0;
    
    return (
      <FormField
        control={form.control}
        name={name as any}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base">{label}</FormLabel>
            <FormControl>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    className="p-0 m-0 bg-transparent border-none cursor-pointer"
                    onClick={() => field.onChange(rating)}
                  >
                    <Star
                      className={`h-6 w-6 ${
                        rating <= value
                          ? "fill-orange-400 text-orange-400"
                          : "fill-gray-200 text-gray-200"
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <StarRating name="overall" label="Общая оценка" />
          <StarRating name="service" label="Обслуживание" />
          <StarRating name="quality" label="Качество" />
          <StarRating name="location" label="Расположение" />
        </div>

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ваш отзыв</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Поделитесь своими впечатлениями..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Отмена
          </Button>
          <Button type="submit">
            Отправить отзыв
          </Button>
        </div>
      </form>
    </Form>
  );
}
