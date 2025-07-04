import { NotificationBell } from "./NotificationBell";
import { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import logo from "../assets/logo.png";

import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  { href: "#features", label: "Преимущества" },
  { href: "#pricing", label: "Подписка" },
  { href: "https://discord.gg/твоя-ссылка", label: "Discord" },
  { href: "#faq", label: "FAQ" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background">
      <div className="relative container h-14 px-4 w-screen flex items-center justify-between mx-auto">
        {/* Логотип */}
        <div className="flex items-center gap-2">
          <a
            rel="noreferrer noopener"
            href="/"
            className="font-bold text-xl flex items-center text-white"
          >
            <img src={logo} alt="Replay Platform" className="h-8 w-auto mr-2" />
            <span className="font-bold">Replay MM!</span>
          </a>
        </div>

        {/* Центрированные ссылки */}
        <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex gap-4">
          {routeList.map(({ href, label }, i) => (
            <a
              rel="noreferrer noopener"
              href={href}
              key={i}
              className={buttonVariants({ variant: "ghost" })}
            >
              {label}
            </a>
          ))}
        </nav>

    {/* Справа — личный кабинет + тема */}
    <div className="hidden md:flex gap-4 items-center">
      {user ? (
        <>
          <NotificationBell /> {/* 🔔 вот сюда вставлено */}
          <button
            onClick={() => navigate("/profile")}
            className={buttonVariants({ variant: "ghost" })}
          >
            {user.displayName || user.email}
          </button>
          <button
            onClick={handleLogout}
            className={buttonVariants({ variant: "outline" })}
          >
            Выйти
          </button>
        </>
      ) : (
        <>
          <a href="/auth" className={buttonVariants({ variant: "outline" })}>
            Войти
          </a>
          <ModeToggle />
        </>
      )}
    </div>


        {/* Мобильное меню */}
        <div className="md:hidden flex items-center gap-2">
          <ModeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="px-2">
              <Menu className="h-5 w-5 text-white" />
            </SheetTrigger>

            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="font-bold text-xl text-white">
                  Replay MM!
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                {routeList.map(({ href, label }) => (
                  <a
                    rel="noreferrer noopener"
                    key={label}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={buttonVariants({ variant: "ghost" })}
                  >
                    {label}
                  </a>
                ))}
                {user ? (
                  <>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        navigate("/profile");
                      }}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {user.displayName || user.email}
                    </button>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        handleLogout();
                      }}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Выйти
                    </button>
                  </>
                ) : (
                  <a
                    href="/auth"
                    onClick={() => setIsOpen(false)}
                    className={buttonVariants({ variant: "ghost" })}
                  >
                    Войти
                  </a>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
