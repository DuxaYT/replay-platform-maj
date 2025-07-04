import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Twitch, Send } from "lucide-react";
import { motion } from "framer-motion";

interface TeamProps {
  imageUrl: string;
  name: string;
  position: string;
  socialNetworks: SocialNetworkProps[];
}

interface SocialNetworkProps {
  name: string;
  url: string;
}

const teamList: TeamProps[] = [
  {
    imageUrl: "/media/timofei.png", // пример пути к картинке
    name: "duxaGG",
    position: "Product Owner",
    socialNetworks: [
      { name: "Twitch", url: "https://www.twitch.tv/duxagg" },
      { name: "Telegram", url: "https://t.me/duxawww" },
    ],
  },
  {
    imageUrl: "/media/kirill.png",
    name: "Kritix",
    position: "CEO",
    socialNetworks: [
      { name: "Twitch", url: "https://www.twitch.tv/kr1tix666" },
      { name: "Telegram", url: "https://t.me/kr1tix666" },
    ],
  },
];

export const Team = () => {
  const socialIcon = (iconName: string) => {
    switch (iconName) {
      case "Twitch":
        return <Twitch size={20} />;
      case "Telegram":
        return <Send size={20} />;
      default:
        return null;
    }
  };

  return (
    <section id="team" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold">
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Наша
        </span>{" "}
        Команда
      </h2>

      <p className="mt-4 mb-10 text-xl text-muted-foreground">
        Мы — небольшая, но очень сплочённая команда профессионалов.
      </p>

      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 gap-y-10">
        {teamList.map(({ imageUrl, name, position, socialNetworks }) => (
          <Card
            key={name}
            className="bg-muted/50 relative mt-8 flex flex-col justify-center items-center"
          >
            <CardHeader className="mt-8 flex justify-center items-center pb-2">
              <img
                src={imageUrl}
                alt={`${name} ${position}`}
                className="absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover"
              />
              <CardTitle className="text-center">{name}</CardTitle>
              <CardDescription className="text-primary">{position}</CardDescription>
            </CardHeader>

            <CardContent className="text-center pb-2">
              <p>Мог бы ебать инстрину, но ебет Ганзону.</p>
            </CardContent>

            <CardFooter className="flex gap-4 justify-center">
              {socialNetworks.map(({ name, url }) => (
                <motion.a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "ghost", size: "sm" })}
                  aria-label={`${name} профиль`}
                  whileHover={{ scale: 1.3, color: "#EF4444" }} // красный цвет и увеличение
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {socialIcon(name)}
                </motion.a>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
