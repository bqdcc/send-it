'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

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

    const { mutate, isLoading } = useMutation({
        mutationFn: async (values: z.infer<typeof formSchema>) => {
            toast.loading('Posting...', { id: 'addPost' });
            await fetch('/api/posts', {
                method: 'POST',
                body: JSON.stringify({ title: values.title }),
            });
        },
        onSuccess: (data) => {
            toast.success('Add post success!', { id: 'addPost' });
            form.reset();
        },
        onError: (error) => {
            toast.error('Add post worrng', { id: 'addPost' });
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
