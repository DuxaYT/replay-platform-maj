import logo from "../assets/logo.png"; // Путь к твоему логотипу

export const Footer = () => {
  return (
    <footer id="footer" className="bg-background text-white border-t border-red-600">
      <hr className="w-11/12 mx-auto border-red-600" />

      <section className="container py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-10">
        {/* Логотип и название */}
        <div className="col-span-full xl:col-span-2 flex items-center gap-3 justify-center xl:justify-start">
          <a
            rel="noreferrer noopener"
            href="/"
            className="flex items-center gap-2"
          >
            <img src={logo} alt="Replay MM!" className="h-8 w-auto" />
            <span className="font-bold text-xl">Replay!</span>
          </a>
        </div>

        {/* Соцсети */}
        <div className="flex flex-col gap-3 text-left">
          <h3 className="font-semibold text-lg text-red-600">Соцсети</h3>
          <a
            href="https://t.me/твоя_ссылка"
            rel="noreferrer noopener"
            target="_blank"
            className="opacity-70 hover:opacity-100 transition-opacity"
          >
            Telegram
          </a>
          <a
            href="https://discord.gg/твоя_ссылка"
            rel="noreferrer noopener"
            target="_blank"
            className="opacity-70 hover:opacity-100 transition-opacity"
          >
            Discord
          </a>
        </div>

        {/* Платформа */}
        <div className="flex flex-col gap-3 text-left">
          <h3 className="font-semibold text-lg text-red-600">Платформа</h3>
          <a href="#features" className="opacity-70 hover:opacity-100 transition-opacity">
            Преимущества
          </a>
          <a href="#pricing" className="opacity-70 hover:opacity-100 transition-opacity">
            Подписка
          </a>
          <a href="#faq" className="opacity-70 hover:opacity-100 transition-opacity">
            FAQ
          </a>
        </div>

        {/* Правовая информация */}
        <div className="col-span-full xl:col-span-2 text-sm text-muted-foreground leading-relaxed text-left">
          <h3 className="font-semibold text-lg text-red-600 mb-4">Правовая информация</h3>
          <p>
            Grand Theft Auto и Grand Theft Auto: V являются зарегистрированными торговыми марками Take-Two Interactive Software. Все используемые торговые марки являются собственностью соответствующих владельцев.
          </p>
          <p className="mt-3">
            REPLAY MM не связаны с Rockstar Games, Take-Two Interactive Software или другими правообладателями и не одобрены ими. REPLAY MM не несет ответственности за какой-либо пользовательский контент. Весь пользовательский контент является собственностью соответствующих владельцев.
          </p>
        </div>
      </section>

      <section className="container pb-12 text-center text-muted-foreground text-sm">
        <h3>© 2025 Replay ММ! Все права защищены.</h3>
      </section>
    </footer>
  );
};
