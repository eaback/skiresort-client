'use client'

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@heroui/react";
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { User, LogOut, ShoppingCart } from "lucide-react"
import { useCartContext } from "@/contexts/cart-context"


export default function NavbarComponent() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, isAuthenticated, isAdmin, logout } = useAuth()
    const { totalItems } = useCartContext()

    const menuItems = [
        { name: "Hem", href: "/" },
        { name: "Om Oss", href: "/om-oss" },
        { name: "Aktiviteter", href: "/aktiviteter" },
        { name: "Tjänster", href: "/tjanster" },
        { name: "Butik", href: "/butik" },
    ]

    return (
        <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent className="sm:hidden" justify="start" >
            <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
            <NavbarBrand>
                <div className="flex flex-row space-y-2">
                <p className="text-xl text-white font-bold p-1 bg-red-600">
                    Ljung<br/>dalen.
                </p>
                </div>
            </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => (
            <NavbarItem key={item.name}>
                <Link color="foreground" href={item.href}>
                {item.name}
                </Link>
            </NavbarItem>
            ))}
        </NavbarContent>

        <NavbarContent justify="end">
            <NavbarItem>
            <Link href="/butik/cart" className="flex items-center gap-1">
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                <span className="bg-warning text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {totalItems}
                </span>
                )}
            </Link>
            </NavbarItem>

            {isAuthenticated ? (
            <NavbarItem>
                <Dropdown>
                <DropdownTrigger>
                    <Button variant="light" isIconOnly>
                    <User />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="User actions">
                    <DropdownItem key="profile" textValue="Profile">
                    <div className="py-2">
                        Inloggad som{" "}
                        <span className="font-bold">
                        {user?.firstname} {user?.lastname}
                        </span>
                    </div>
                    </DropdownItem>
                    <DropdownItem key="orders" as={Link} href="/butik/orders">
                    Mina beställningar
                    </DropdownItem>
                        {isAdmin ? (
                        <DropdownItem key="admin" as={Link} href="/admin">
                            Admin Dashboard
                        </DropdownItem>
                        ) : null}
                    <DropdownItem 
                        key="logout" 
                        onPress={logout} 
                        startContent={
                        <LogOut size={16} />}>
                        Logga ut
                    </DropdownItem>
                </DropdownMenu>
                </Dropdown>
            </NavbarItem>
            ) : (
            <>
                <NavbarItem className="hidden lg:flex">
                    <Link href="/auth/login">
                        Logga in
                    </Link>
                </NavbarItem>
                <NavbarItem>
                <Button 
                    as={Link} 
                    color="warning" 
                    href="/auth/signup" 
                    variant="flat">
                        Skapa konto
                </Button>
                </NavbarItem>
            </>
            )}
        </NavbarContent>

        <NavbarMenu>
            {menuItems.map((item) => (
            <NavbarMenuItem key={item.name}>
                <Link 
                    className="w-full" 
                    href={item.href} 
                    size="lg" 
                    onPress={() => setIsMenuOpen(false)}>
                        {item.name}
                </Link>
            </NavbarMenuItem>
            ))}

            {!isAuthenticated ? (
            <>
                <NavbarMenuItem>
                <Link 
                    className="w-full" 
                    href="/auth/login"
                    size="lg" 
                    onPress={() => setIsMenuOpen(false)}>
                        Logga in
                </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                <Link 
                    className="w-full" 
                    href="/auth/signup" 
                    size="lg" 
                    onPress={() => setIsMenuOpen(false)}>
                        Skapa konto
                </Link>
                </NavbarMenuItem>
            </>
            ) : (
            <NavbarMenuItem>
                <Link
                className="w-full"
                href="#"
                size="lg"
                onPress={() => {
                    logout()
                    setIsMenuOpen(false)
                }}
                >
                Logga ut
                </Link>
            </NavbarMenuItem>
            )}
        </NavbarMenu>
        </Navbar>
    )
}

