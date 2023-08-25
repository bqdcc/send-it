'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function DeleteDialog({ id }: { id: string }) {
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation({
        mutationFn: async () => {
            toast.loading('Delete your post...', { id: 'delete-post' });
            await fetch('/api/post', {
                method: 'DELETE',
                body: JSON.stringify({ id }),
            });
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['auth-posts']);
            toast.success('Delete post success ␡!', { id: 'delete-post' });
        },
        onError: (error) => {
            toast.error('Delete post worrng', { id: 'delete-post' });
            console.error(error);
        },
    });

    const deletePost = () => {
        mutate();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    isLoading={isLoading}
                    variant={'ghost'}
                    className="text-destructive hover:bg-transparent hover:text-background"
                >
                    Delete
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
                <DialogHeader className="space-y-3">
                    <DialogTitle className="leading-6">
                        Are you sure you want to delete this post?
                    </DialogTitle>
                    <DialogDescription>
                        Pressing the delete button will permenantly delete your post.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-center">
                    <Button
                        type="submit"
                        onClick={deletePost}
                        isLoading={isLoading}
                        variant={'destructive'}
                    >
                        Delete Post
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
