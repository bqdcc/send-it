'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { cn } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { PostType } from '@/app/types/post';

const formSchema = z.object({
    title: z.string().min(2).max(255),
});

export default function AddPost() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
        },
    });
    const queryClient = useQueryClient();
    let toastPostId: string;

    const { mutate, isLoading } = useMutation({
        mutationFn: async (values: z.infer<typeof formSchema>) => {
            toastPostId = toast.loading('Creating your post...');
            return await fetch('/api/post', {
                method: 'POST',
                body: JSON.stringify({ title: values.title }),
            });
        },
        onSuccess: async (response) => {
            const { data, message }: { data?: PostType; message?: string } = await response.json();
            if (!!data) {
                queryClient.invalidateQueries(['all-post']);
                toast.success('Add post success 🔥!', { id: toastPostId });
                form.reset();
            } else {
                throw new Error(message);
            }
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Add post worrng', { id: toastPostId });
            console.error(error);
        },
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((values) => {
                    mutate(values);
                })}
                className="space-y-8 rounded-md bg-foreground/90 p-8"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    disabled={isLoading}
                                    className="border-none bg-background/90 text-foreground shadow-none placeholder:text-foreground/50 focus-visible:ring-0"
                                    placeholder="What's you on mind?"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex items-center justify-between">
                    <span
                        className={cn([
                            'text-sm text-background',
                            form.watch('title').length > 255 ? 'font-bold text-red-800' : undefined,
                        ])}
                    >
                        {form.watch('title').length}/255
                    </span>
                    <Button isLoading={isLoading} className="bg-green-400" type="submit">
                        Create Post
                    </Button>
                </div>
            </form>
        </Form>
    );
}
