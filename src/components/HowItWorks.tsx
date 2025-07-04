import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "../components/Icons";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: "Доступность",
    description:
      "Загружай реплеи с YouTube, Rutube и других платформ без лишних сложностей.",
  },
  {
    icon: <MapIcon />,
    title: "Сообщество",
    description:
      "Обменивайся опытом и обсуждай разборы с другими игроками и админами.",
  },
  {
    icon: <PlaneIcon />,
    title: "Масштабируемость",
    description:
      "Поддержка большого количества реплеев и пользователей без задержек.",
  },
  {
    icon: <GiftIcon />,
    title: "Гифтофикация",
    description:
      "Получай бонусы и достижения за активность на платформе.",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="howItWorks"
      className="container text-center py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        Как это{" "}
        <span className="bg-gradient-to-b from-red-600 to-red-700 text-transparent bg-clip-text">
          работает
        </span>
        : пошаговое руководство
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        Используй Replay MM! для загрузки реплеев, получения подробных разборов и прокачки своих игровых навыков.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card
            key={title}
            className="bg-muted/50"
          >
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center text-red-600">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white">{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
