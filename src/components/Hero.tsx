import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-24 gap-10">
      <div className="text-center lg:text-left space-y-8">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          <span className="inline bg-gradient-to-r from-red-500 to-red-700 text-transparent bg-clip-text">
            Replay
          </span>{" "}
          Platform
        </h1>

        <p className="text-lg text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Загружай реплеи, получай разборы от админа и изучай лучшие позиции на картах.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center lg:justify-start">
          <a href="/upload">
            <Button className="w-full md:w-auto text-white bg-red-600 hover:bg-red-700">
              Загрузить Replay!
            </Button>
          </a>
          <a
            href="/map"
            className={buttonVariants({
              variant: "outline",
              className: "w-full md:w-auto border-red-600 text-red-600 hover:bg-red-50",
            })}
          >
            Карта залазов
          </a>
        </div>
      </div>

      {/* превью-изображение справа */}
      <div className="z-10">
        <img
          src="/6c3e7568-07af-46c8-9693-48af7c606bd6.png"
          alt="Replay Preview"
          className="rounded-lg w-full max-w-md shadow-lg"
        />
      </div>
    </section>
  );
};
