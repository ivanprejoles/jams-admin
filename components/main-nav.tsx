"use client";

import { useParams, usePathname } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, LayoutDashboardIcon, Signpost } from "lucide-react";
import { FloatingDock } from "./ui/floating-deck";
import { IconBasket, IconCategory2, IconChalkboard, IconHome, IconPalette, IconRuler2, IconSettings, IconShoe } from "@tabler/icons-react";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const links = [
    {
      href: `/${params.storeId}`,
      title: "Dashboard",
      icon: (
        <IconHome className={cn("h-full w-full text-red-500", pathname === `/${params.storeId}` && 'text-orange-500')} />
      ),
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      title: "Billboard",
      icon: (
        <IconChalkboard className={cn("h-full w-full text-red-500", pathname === `/${params.storeId}` && 'text-orange-500')} />
      ),
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      icon: (
        <IconCategory2 className={cn("h-full w-full text-red-500", pathname === `/${params.storeId}` && 'text-orange-500')} />
      ),
      title: "Categories",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/sizes`,
      icon: (
        <IconRuler2 className={cn("h-full w-full text-red-500", pathname === `/${params.storeId}` && 'text-orange-500')} />
      ),
      title: "Sizes",
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/colors`,
      icon: (
        <IconPalette className={cn("h-full w-full text-red-500", pathname === `/${params.storeId}` && 'text-orange-500')} />
      ),
      title: "Colors",
      active: pathname === `/${params.storeId}/colors`,
    },
    {
      href: `/${params.storeId}/products`,
      icon: (
        <IconShoe className={cn("h-full w-full text-red-500", pathname === `/${params.storeId}` && 'text-orange-500')} />
      ),
      title: "Products",
      active: pathname === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/orders`,
      icon: (
        <IconBasket className={cn("h-full w-full text-red-500", pathname === `/${params.storeId}` && 'text-orange-500')} />
      ),
      title: "Orders",
      active: pathname === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/settings`,
      icon: (
        <IconSettings className={cn("h-full w-full text-red-500", pathname === `/${params.storeId}` && 'text-orange-500')} />
      ),
      title: "Settings",
      active: pathname === `/${params.storeId}/settings`,
    },
  ];


  return (
    <>
      {/* {isMobile ? (
        <div className="flex items-center justify-center ml-2 visible md:invisible">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu className="h-8 w-8 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <nav>
                {routes.map((route) => (
                  <DropdownMenuItem key={route.href} asChild>
                    <Link
                      href={route.href}
                      className={cn(
                        "text-sm font-medium transition-colors bg-clip-text hover:text-transparent hover:bg-no-repeat hover:bg-gradient-to-r hover:from-red-500 hover:via-orange-500 hover:to-yellow-500",
                        route.active
                          ? "relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500"
                          : "text-muted-foreground"
                      )}
                    >
                      {route.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </nav>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : ( */}
        <nav
          className={cn(
            "flex items-center md:space-x-6 ",
            className
          )}
        >
          {/* {routes.map((route) => ( */}
            <FloatingDock
              mobileClassName="absolute top-0 z-[50]" // only for demo, remove for production
              desktopClassName="absolute top-0 z-[50]"
              items={links}
            />
            {/* // <Link
            //     key={route.href}
            //     href={route.href}
            //     className={cn(
            //         "text-sm font-medium transition-colors bg-clip-text hover:text-transparent hover:bg-no-repeat hover:bg-gradient-to-r hover:from-red-500 hover:via-orange-500 hover:to-yellow-500",
            //         route.active ? "relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500" : "text-muted-foreground"
            //     )}
            // >
            //     {route.label}
            // </Link>
          ))} */}
        </nav>
      {/* )} */}
    </>
  );
}
