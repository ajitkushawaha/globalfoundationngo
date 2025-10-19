"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";

export const GEKCTHeroParallax = ({
  initiatives,
}: {
  initiatives: {
    title: string;
    description: string;
    thumbnail: string;
    category: string;
  }[];
}) => {
  const firstRow = initiatives.slice(0, 5);
  const secondRow = initiatives.slice(5, 10);
  const thirdRow = initiatives.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <GEKCTHeader />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((initiative) => (
            <InitiativeCard
              initiative={initiative}
              translate={translateX}
              key={initiative.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((initiative) => (
            <InitiativeCard
              initiative={initiative}
              translate={translateXReverse}
              key={initiative.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((initiative) => (
            <InitiativeCard
              initiative={initiative}
              translate={translateX}
              key={initiative.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const GEKCTHeader = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold text-foreground" style={{ fontFamily: "var(--font-playfair)" }}>
        Transforming Lives <br /> Through Action
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 text-muted-foreground">
        Discover the impact of our initiatives in education, animal welfare, elderly care, 
        and environmental conservation. Every project tells a story of hope and positive change.
      </p>
    </div>
  );
};

export const InitiativeCard = ({
  initiative,
  translate,
}: {
  initiative: {
    title: string;
    description: string;
    thumbnail: string;
    category: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={initiative.title}
      className="group/initiative h-96 w-[30rem] relative shrink-0"
    >
      <div className="block group-hover/initiative:shadow-2xl rounded-lg overflow-hidden">
        <img
          src={initiative.thumbnail}
          height="600"
          width="600"
          className="object-cover object-center absolute h-full w-full inset-0"
          alt={initiative.title}
        />
      </div>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/initiative:opacity-90 bg-gradient-to-t from-black/80 to-transparent pointer-events-none rounded-lg"></div>
      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover/initiative:opacity-100 text-white">
        <div className="bg-primary/20 backdrop-blur-sm rounded-md px-3 py-1 text-xs font-medium mb-2 inline-block">
          {initiative.category}
        </div>
        <h2 className="text-xl font-bold mb-2">{initiative.title}</h2>
        <p className="text-sm text-white/90 line-clamp-2">{initiative.description}</p>
      </div>
    </motion.div>
  );
};
