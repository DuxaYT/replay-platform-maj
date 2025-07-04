import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Платформа бесплатна?",
    answer: "Да, использование платформы Replay MM бесплатно.",
    value: "item-1",
  },
  {
    question: "Как загрузить реплей?",
    answer:
      "Вы можете загрузить реплей с YouTube, Rutube, Google Диска или напрямую через ссылку.",
    value: "item-2",
  },
  {
    question: "Как получить разбор от админа?",
    answer:
      "После загрузки реплея наши админы сделают подробный разбор и вы получите уведомление в личном кабинете.",
    value: "item-3",
  },
  {
    question: "Можно ли использовать бесплатный тариф дольше месяца?",
    answer:
      "Да, бесплатный тариф не ограничен по времени, но с ограниченными возможностями.",
    value: "item-4",
  },
  {
    question: "Как работает интерактивная карта залазов?",
    answer:
      "На карте вы можете посмотреть популярные места залазов и посмотреть видеоинструкции для каждой точки.",
    value: "item-5",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Часто{" "}
        <span className="bg-gradient-to-b from-red-600 to-red-700 text-transparent bg-clip-text">
          задаваемые вопросы
        </span>
      </h2>

      <Accordion type="single" collapsible className="w-full">
        {FAQList.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left text-lg font-semibold text-red-600 hover:text-red-700">
              {question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base">
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-8 text-center">
        Остались вопросы?{" "}
        <a
          rel="noreferrer noopener"
          href="/contact"
          className="text-red-600 transition-all border-red-600 hover:border-b-2"
        >
          Свяжитесь с нами
        </a>
      </h3>
    </section>
  );
};
