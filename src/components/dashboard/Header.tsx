import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { auth, signOut } from '@/auth';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const Header = async () => {
    const session = await auth();

    return (
        <header className="flex h-16 items-center border-b border-white/10 px-6 bg-[#0a0a0a] w-full">
            <div className="flex-1"></div>
            <div className="flex items-center gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full ring-2 ring-white/10 hover:ring-lime-400/50 transition-all">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                                <AvatarFallback className="bg-[#111] text-white border border-white/10">{session?.user?.name?.charAt(0) || "U"}</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-[#111] border-white/10 text-gray-200" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none text-white">{session?.user?.name}</p>
                                <p className="text-xs leading-none text-gray-500">
                                    {session?.user?.email}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem className="focus:bg-white/5 focus:text-white cursor-pointer">
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-white/5 focus:text-white cursor-pointer">
                            Billing
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-white/5 focus:text-white cursor-pointer">
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem className="focus:bg-white/5 focus:text-red-400 cursor-pointer">
                            <form action={async () => {
                                "use server"
                                await signOut()
                            }}>
                                <button className="w-full text-left">Log out</button>
                            </form>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};
