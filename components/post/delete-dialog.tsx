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

export default function DeleteDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
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
                    <Button variant={'destructive'}>Delete Post</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
