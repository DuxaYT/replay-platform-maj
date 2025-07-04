import { Statistics } from "./Statistics";
import pilot from "../assets/pilot.png";

export const About = () => {
  return (
    <section
      id="about"
      className="container py-20 lg:py-32 max-w-5xl mx-auto"
    >
      <div className="bg-background border border-red-700 rounded-lg p-10 shadow-md">
        <h2 className="text-4xl font-extrabold mb-6 text-center lg:text-left">
          О{" "}
          <span className="bg-gradient-to-r from-red-600 to-red-700 text-transparent bg-clip-text">
            платформе
          </span>
        </h2>

        <p className="max-w-3xl text-lg text-muted-foreground mb-10 mx-auto lg:mx-0 text-center lg:text-left">
          Replay Majestic Mode! — это удобная платформа для загрузки и разбора реплеев. Получай
          экспертный анализ, изучай лучшие позиции и повышай свои навыки игры.
        </p>

        <ul className="max-w-3xl mx-auto lg:mx-0 space-y-4 text-left list-disc list-inside text-lg">
          <li>Загрузка реплеев с YouTube, Rutube, Google Диск и других платформ</li>
          <li>Профессиональные разборы от опытных админов</li>
          <li>Интерактивная карта залазов с видеоинструкциями</li>
          <li>Личный кабинет с историей и результатами разбора</li>
        </ul>
      </div>
    </section>
  );
};



