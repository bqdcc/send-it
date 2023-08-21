import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import Login from './login';
import ModeToggle from './mode-toggle';
import Nav from './nav';
import Logged from './logged';

export default async function Header() {
    const session = await getServerSession(authOptions);
    console.log(session);
    return (
        <div className="flex items-center justify-between p-2">
            <Nav />
            <div className="flex items-center gap-2">
                {!session && <Login />}
                {!!session && (
                    <Logged image={session.user?.image || ''} name={session.user?.name || ''} />
                )}
                <ModeToggle />
            </div>
        </div>
    );
}
