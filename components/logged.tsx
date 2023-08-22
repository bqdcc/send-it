'use client';

import { LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Logged({ image, name }: { image: string; name: string }) {
    return (
        <div className="flex items-center gap-2">
            <Link href={'/dashboard'}>
                <Avatar className="h-8 w-8">
                    <AvatarImage src={image} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </Link>

            <span>{name}</span>
            <Button variant="outline" size="icon" onClick={() => signOut()}>
                <LogOut />
            </Button>
        </div>
    );
}
