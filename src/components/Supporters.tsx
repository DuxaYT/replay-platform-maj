import React from "react";
import { motion } from "framer-motion";

const supporters = [
  { name: "Sist1m", image: "/media/filant.png", link: "https://www.twitch.tv/sist1m" },
  { name: "Alamantik", image: "/media/user2.png", link: "https://www.youtube.com/@Alamantik" },
  { name: "Andy Lordez", image: "/media/user3.png", link: "https://www.youtube.com/@AndyLordezz" },
  { name: "HyperKry", image: "/media/user4.png", link: "https://www.youtube.com/@HyperKry" },
  { name: "Mitsuki", image: "/media/user5.png", link: "https://www.youtube.com/@MitsukiMay" },
  { name: "Romar1to", image: "/media/user6.png", link: "https://www.twitch.tv/romar1to" },
  { name: "ShadowRaze", image: "/media/user7.png", link: "https://kick.com/razekingg" },
  { name: "Tetsu", image: "/media/user8.png", link: "https://www.youtube.com/@tetsu1338" },
];

export const Supporters = () => {
  return (
    <section className="container mx-auto py-16 px-6 text-center bg-background rounded-lg shadow-lg relative">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-extrabold mb-12 tracking-wide text-white inline-block"
      >
        <span className="text-red-600">НАС ПОДДЕРЖИВАЮТ:</span>
      </motion.h2>

      <div className="relative mx-auto w-full max-w-[720px]">
        {/* Горизонтальная линия */}
        <div className="absolute top-10 left-0 right-0 h-[2px] bg-red-600 opacity-90 z-0"></div>

        {/* Сдвинем блок с аватарками немного влево */}
        <motion.div className="relative z-10 flex justify-between px-2 translate-x-[0%]">
          {supporters.map(({ name, image, link }) => (
            <motion.a
              key={name}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, rotateY: 15 }}
              className="group flex flex-col items-center space-y-3 cursor-pointer w-20"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-red-600 shadow-lg bg-gradient-to-tr from-red-700 to-red-500 transition-shadow duration-300 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.8)]">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="text-red-600 font-semibold text-sm select-none">{name}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
