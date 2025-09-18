"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

/**
 * Renders an interactive set of cards for the hero section.
 *
 * This component displays a main image that reacts to mouse movement, creating a
 * 3D-like effect. It also includes several decorative elements, such as
 * floating particles, pulse indicators, and a cursor follower, to enhance the
 * visual experience.
 *
 * @returns {JSX.Element} The rendered hero cards.
 */
export const HeroCards = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Use refs for high-frequency updates instead of state
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const particlesRef = useRef<(HTMLDivElement | null)[]>([]);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    const element = document.getElementById("hero-svg");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const handleImageClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);
  };

  // Optimized mouse handler using rAF for smooth 60fps updates
  const updateTransforms = useCallback(() => {
    const { x, y } = mousePositionRef.current;

    // Update image transform directly via DOM
    if (imageRef.current) {
      const rotateX = (y - 0.5) * 5;
      const rotateY = (x - 0.5) * -5;
      imageRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    // Update floating particles
    particlesRef.current.forEach((particle) => {
      if (particle) {
        const offsetX = x * 10;
        const offsetY = y * 10;
        particle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      }
    });

    // Update cursor follower
    if (cursorFollowerRef.current) {
      cursorFollowerRef.current.style.left = `${x * 100}%`;
      cursorFollowerRef.current.style.top = `${y * 100}%`;
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mousePositionRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };

      // Cancel previous frame and schedule new one
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(updateTransforms);
    },
    [updateTransforms],
  );

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="relative flex h-auto w-full flex-col flex-wrap gap-4 lg:h-[500px] lg:w-[700px] lg:flex-row lg:gap-8">
      <div
        id="hero-svg"
        className="group relative cursor-pointer"
        onClick={handleImageClick}
        onMouseMove={handleMouseMove}
      >
        <Image
          ref={imageRef}
          src="/undraw_all-the-data_5lil.svg"
          alt="Data visualization illustration"
          width={800}
          height={600}
          priority
          className={`transition-all duration-700 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} ${isClicked ? "scale-105 rotate-1" : "scale-100"} transform-gpu group-hover:brightness-110 hover:-translate-y-2 hover:scale-102 hover:drop-shadow-2xl`}
          style={{
            filter: "drop-shadow(0 10px 25px rgba(0, 0, 0, 0.1))",
          }}
        />

        {/* Animated glow effect on hover (theme-based) */}
        <div
          className={`from-primary/20 via-accent/20 to-primary/30 absolute inset-0 -z-10 rounded-lg bg-gradient-to-r opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100 ${isClicked ? "animate-pulse" : ""} `}
        />

        {/* Interactive floating particles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                particlesRef.current[i] = el;
              }}
              className={`from-accent to-primary absolute h-1.5 w-1.5 rounded-full bg-gradient-to-r opacity-0 transition-all duration-1000 ease-out group-hover:opacity-70 ${isVisible ? "animate-float" : ""} `}
              style={{
                left: `${15 + i * 12}%`,
                top: `${25 + (i % 4) * 18}%`,
                animationDelay: `${i * 150}ms`,
                animationDuration: `${2500 + i * 300}ms`,
              }}
            />
          ))}
        </div>

        {/* Data pulse indicators */}
        <div className="pointer-events-none absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <div
              key={`pulse-${i}`}
              className={`from-primary to-primary/70 absolute h-3 w-3 animate-pulse rounded-full bg-gradient-to-r opacity-0 transition-all duration-500 group-hover:opacity-60`}
              style={{
                left: `${30 + i * 20}%`,
                top: `${40 + (i % 2) * 25}%`,
                animationDelay: `${i * 400}ms`,
                animationDuration: "2s",
              }}
            />
          ))}
        </div>

        {/* Success ripple effect on click */}
        {isClicked && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="from-primary to-primary/70 h-4 w-4 animate-ping rounded-full bg-gradient-to-r opacity-75" />
            <div
              className="from-accent to-primary absolute h-8 w-8 animate-ping rounded-full bg-gradient-to-r opacity-50"
              style={{ animationDelay: "150ms" }}
            />
            <div
              className="from-primary to-accent absolute h-12 w-12 animate-ping rounded-full bg-gradient-to-r opacity-25"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        )}

        {/* Cursor follower effect */}
        <div
          ref={cursorFollowerRef}
          className="from-accent/30 to-primary/30 pointer-events-none absolute h-6 w-6 rounded-full bg-gradient-to-r opacity-0 blur-xs transition-opacity duration-300 group-hover:opacity-100"
          style={{
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
      {/* Testimonial */}
      {/* <Card className="absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar>
            <AvatarImage
              alt=""
              src="https://github.com/shadcn.png"
            />
            <AvatarFallback>SH</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <CardTitle className="text-lg">John Doe React</CardTitle>
            <CardDescription>@john_doe</CardDescription>
          </div>
        </CardHeader>

        <CardContent>This landing page is awesome!</CardContent>
      </Card> */}

      {/* Team */}
      {/* <Card className="absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="mt-8 flex justify-center items-center pb-2">
          <img
            src="https://i.pravatar.cc/150?img=58"
            alt="user avatar"
            className="absolute grayscale-0 -top-12 rounded-full w-24 h-24 aspect-square object-cover"
          />
          <CardTitle className="text-center">Leo Miranda</CardTitle>
          <CardDescription className="font-normal text-primary">
            Frontend Developer
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center pb-2">
          <p>
            I really enjoy transforming ideas into functional software that
            exceeds expectations
          </p>
        </CardContent>

        <CardFooter>
          <div>
            <a
              rel="noreferrer noopener"
              href="https://github.com/leoMirandaa"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Github icon</span>
              <GitHubLogoIcon className="w-5 h-5" />
            </a>
            <a
              rel="noreferrer noopener"
              href="https://twitter.com/leo_mirand4"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">X icon</span>
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-foreground w-5 h-5"
              >
                <title>X</title>
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>

            <a
              rel="noreferrer noopener"
              href="https://www.linkedin.com/in/leopoldo-miranda/"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Linkedin icon</span>
              <Linkedin size="20" />
            </a>
          </div>
        </CardFooter>
      </Card> */}

      {/* Pricing */}
      {/* <Card className="absolute top-[150px] left-[50px] w-72  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader>
          <CardTitle className="flex item-center justify-between">
            Free
            <Badge
              variant="secondary"
              className="text-sm text-primary"
            >
              Most popular
            </Badge>
          </CardTitle>
          <div>
            <span className="text-3xl font-bold">$0</span>
            <span className="text-muted-foreground"> /month</span>
          </div>

          <CardDescription>
            Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button className="w-full">Start Free Trial</Button>
        </CardContent>

        <hr className="w-4/5 m-auto mb-4" />

        <CardFooter className="flex">
          <div className="space-y-4">
            {["4 Team member", "4 GB Storage", "Upto 6 pages"].map(
              (benefit: string) => (
                <span
                  key={benefit}
                  className="flex"
                >
                  <Check className="text-green-500" />{" "}
                  <h3 className="ml-2">{benefit}</h3>
                </span>
              )
            )}
          </div>
        </CardFooter>
      </Card> */}

      {/* Service */}
      {/* <Card className="absolute w-[350px] -right-[10px] bottom-[35px]  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
          <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
            <LightBulbIcon />
          </div>
          <div>
            <CardTitle>Light & dark mode</CardTitle>
            <CardDescription className="text-md mt-2">
              Lorem ipsum dolor sit amet consect adipisicing elit. Consectetur
              natusm.
            </CardDescription>
          </div>
        </CardHeader>
      </Card> */}
    </div>
  );
};
