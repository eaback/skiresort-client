'use client'

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";


export default function App() {//todo: add dropdown menu and avatar for login/signup
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
        "Hem",
        "Om Oss",
        "Aktiviteter",
        "Tjänster",
        "Butik",
        "Log Out",
    ];

    return (
        <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent className="sm:hidden" justify="start" >
            <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
            <NavbarBrand>
            {/* <AcmeLogo /> */}
            {/* <p className="font-bold text-inherit">ACME</p> */}
            <div className="flex flex-row space-y-2">
            {/* <Box className="w-12 h-12" /> */}
            <p className="text-xl text-white font-bold p-1 bg-red-600">
              Ljung<br/>dalen.
            </p>
          </div>
            </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarBrand>
            {/* <AcmeLogo /> */}
            {/* <p className="font-bold text-inherit">ACME</p> */}
            <div className="flex flex-row space-y-2">
            {/* <Box className="w-12 h-12" /> */}
            <p className="text-xl text-white font-bold p-1 bg-red-600">
              Ljung<br/>dalen.
            </p>
          </div>
            </NavbarBrand>
            <NavbarItem>
            <Link  href="/">
                Hem
            </Link>
            </NavbarItem>
            <NavbarItem >
            <Link href="/Om Oss">
                Om Oss
            </Link>
            </NavbarItem>
            <NavbarItem>
            <Link  href="/aktiviteter">
                Aktiviteter
            </Link>
            </NavbarItem>
            <NavbarItem>
            <Link href="/butik">
                Butik
            </Link>
            </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
            </NavbarItem>
            <NavbarItem>
            <Button as={Link} color="warning" href="#" variant="flat">
                Sign Up
            </Button>
            </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
            {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                className="w-full"
                color={
                    index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
                }
                href="#"
                size="lg"
                >
                {item}
                </Link>
            </NavbarMenuItem>
            ))}
        </NavbarMenu>
        </Navbar>
    );
}

