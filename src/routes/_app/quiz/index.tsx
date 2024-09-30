import { QuizList } from "@/components/quiz-list";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getQuizzes } from "@/lib/query-functions";
import { selectedCourseState } from "@/lib/state";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useRecoilState } from "recoil";

export const Page = () => {
  const [selectedCourse] = useRecoilState(selectedCourseState);

  console.log(selectedCourse);

  return (
    <div className="gap-3 flex py-4 flex-col justify-end w-[42rem] mx-auto pt-20">
      <div className="relative">
        <h1 className="text-2xl font-bold text-foreground/90 mb-4">Quizzes</h1>
        {selectedCourse && <QuizList selectedCourse={selectedCourse} />}
      </div>
    </div>
  );
};

export const Route = createFileRoute("/_app/quiz/")({
  component: Page,
});
