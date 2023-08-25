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

const formSchema = z.object({
    content: z.string().min(2).max(255),
});

export default function AddComment({ id }: { id: string }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: '',
        },
    });
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation({
        mutationFn: async ({ content, postId }: { content: string; postId: string }) => {
            toast.loading('Creating your comment...', { id: 'add-comments' });
            await fetch('/api/comment', {
                method: 'POST',
                body: JSON.stringify({ content, postId }),
            });
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['post-detail']);
            toast.success('Add comment success 🔥!', { id: 'add-comments' });
            form.reset();
        },
        onError: (error) => {
            toast.error('Add comment worrng', { id: 'add-comments' });
            console.error(error);
        },
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((values) => {
                    mutate({ content: values.content, postId: id });
                })}
                className="space-y-8 rounded-md bg-foreground/90 p-8"
            >
                <FormField
                    control={form.control}
                    name="content"
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
                <div className="flex items-center gap-4">
                    <Button isLoading={isLoading} className="bg-green-400" type="submit">
                        Add Comment 🚀
                    </Button>
                    <span
                        className={cn([
                            'text-sm text-background',
                            form.watch('content').length > 255
                                ? 'font-bold text-red-800'
                                : undefined,
                        ])}
                    >
                        {form.watch('content').length}/255
                    </span>
                </div>
            </form>
        </Form>
    );
}
