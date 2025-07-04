import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Check } from "lucide-react";

interface PricingProps {
  title: string;
  popular: boolean;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const pricingPlan: PricingProps = {
  title: "Pro Replay",
  popular: true,
  price: 299,
  description: "Раскрой потенциал своих игр с полной поддержкой и аналитикой.",
  buttonText: "Подписаться",
  benefitList: [
    "Доступ к панели разборов",
    "Приоритетный разбор от админов",
    "Доступ к интерактивной карте залазов",
    "История анализов в личном кабинете",
    "Эксклюзивные видеоуроки и советы",
  ],
};

export const Pricing = () => {
  return (
    <section id="pricing" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Получи{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          полный доступ
        </span>
      </h2>
      <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
        Повышай уровень своей игры с Pro Replay — всё, что нужно для роста.
      </h3>

      <div className="max-w-md mx-auto">
        <Card className="drop-shadow-xl shadow-black/10 dark:shadow-white/10">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {pricingPlan.title}
              {pricingPlan.popular && (
                <Badge variant="secondary" className="text-sm text-primary">
                  Популярно
                </Badge>
              )}
            </CardTitle>
            <div>
              <span className="text-3xl font-bold">{pricingPlan.price} ₽</span>
              <span className="text-muted-foreground"> /месяц</span>
            </div>
            <CardDescription>{pricingPlan.description}</CardDescription>
          </CardHeader>

          <CardContent>
            <Button className="w-full">{pricingPlan.buttonText}</Button>
          </CardContent>

          <hr className="w-4/5 m-auto mb-4" />

          <CardFooter className="flex justify-center">
            <div className="space-y-4">
              {pricingPlan.benefitList.map((benefit) => (
                <div key={benefit} className="flex items-center space-x-2">
                  <Check className="text-red-600" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};
