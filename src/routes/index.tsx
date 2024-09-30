import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";

const Page = () => {
  return (
    <main className="min-h-dvh bg-background">
      <div className="border-b shadow-sm">
        <header className="h-16 flex items-start justify-between container mx-auto">
          <div className="h-full flex items-center">
            <Logo />
          </div>
          <nav className="h-full flex items-center gap-4">
            <Link to="/chat">
              <Button>Sign In</Button>
            </Link>
          </nav>
        </header>
      </div>

      <section
        className="bg-dot-black/30 container relative h-[40rem] mx-auto"
        id="home"
      >
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
        <div className="flex h-full flex-col items-center justify-center">
          <h1 className="z-10 max-w-[30rem] text-center text-3xl font-extrabold md:text-5xl md:leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 bg-clip-text text-transparent">
              Adhyai:
            </span>{" "}
            Your{" "}
            <span className="bg-gradient-to-r from-green-600 via-green-400 to-green-600 bg-clip-text text-transparent">
              AI
            </span>{" "}
            <wbr />
            Study Companion
          </h1>
          <p className="z-10 mt-2 max-w-[40rem] text-pretty text-center text-foreground/60 md:text-lg">
            Ace Your Exams with Smart, Personalized Learning!
          </p>
          <div className="z-10 mt-8">
            <Link to="/chat">
              <Button className="z-10">Get Started</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container px-5 pb-5 mx-auto" id="about">
        <div className="grid place-items-center gap-10 rounded border bg-primary-foreground px-5 py-10 lg:grid-cols-1 lg:px-10">
          <div>
            <h2 className="text-3xl font-semibold md:text-4xl">
              <span className="text-primary">About</span> Adhyai
            </h2>
            <p className="mt-3 leading-snug text-foreground/60 md:leading-snug text-lg">
              AdhyAI is an AI-powered study companion designed to help students
              study smarter and ace their exams. It creates personalized study
              plans, answers questions instantly, and provides real-time
              feedback through practice tests. With AdhyAI, students can track
              their progress, stay organized, and improve their learning
              efficiency, all with a virtual tutor available 24/7. Perfect for
              high school, college students, or anyone preparing for exams,
              AdhyAI makes studying more efficient and stress-free.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-primary py-20 text-white mt-20">
        <div className="container mx-auto">
          <h1 className="text-2xl font-extrabold md:text-4xl">
            Unlock Your Full Potential
            <br />
            With Adhyai!
          </h1>

          <p className="mt-5 text-primary-foreground/80 md:text-lg">
            Get personalized study plans, instant answers, and real-time
            feedback.
            <br />
            Start studying smarter today start using Adhyai now and ace your
            next exam!
          </p>

          <Link to="/chat">
            <Button className="mt-8" variant="secondary">
              Get Started
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export const Route = createFileRoute("/")({
  component: Page,
});
