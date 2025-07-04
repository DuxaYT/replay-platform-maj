import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import responsiveImg from "../assets/feature-responsive.png";
import intuitiveImg from "../assets/feature-intuitive.png";
import aiImg from "../assets/feature-ai.png";

interface FeatureProps {
  title: string;
  description: string;
  image: string;
}

const features: FeatureProps[] = [
  {
    title: "Адаптивный дизайн",
    description:
      "Платформа отлично смотрится и работает на любых устройствах.",
    image: responsiveImg,
  },
  {
    title: "Интуитивный интерфейс",
    description:
      "Простой и понятный интерфейс позволяет быстро загружать и оценивать свои реплеи.",
    image: intuitiveImg,
  },
  {
    title: "Аналитика на базе участников GUNZONE",
    description:
      "Получай глубокие инсайты и советы от лучших игроков Majestic RP.",
    image: aiImg,
  },
];

const featureList: string[] = [
  "Тёмная/Светлая тема",
  "Отзывы",
  "Преимущества",
  "Подписка",
  "Форма обратной связи",
  "Наша команда",
  "Адаптивный дизайн",
  "Залазы",
  "Минимализм",
];

export const Features = () => {
  return (
    <section
      id="features"
      className="container py-24 sm:py-32 space-y-8"
    >
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Многие{" "}
        <span className="bg-gradient-to-r from-red-600 to-red-700 text-transparent bg-clip-text">
          преимущества
        </span>
      </h2>

      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge
              variant="secondary"
              className="text-sm"
            >
              {feature}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description, image }: FeatureProps) => (
          <Card
            key={title}
            className="border-red-600"
          >
            <CardHeader>
              <CardTitle className="text-red-600">{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter>
              <img
                src={image}
                alt={title}
                className="w-[200px] lg:w-[300px] mx-auto"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
