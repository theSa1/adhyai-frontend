import { QuizQuestion } from "@/components/quiz-question";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getQuiz, submitQuiz } from "@/lib/query-functions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangleIcon } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

const Page = () => {
  const { quizId } = Route.useParams();
  const [error, setError] = useState<string | null>(null);
  const quizQuery = useQuery({
    queryKey: ["quiz", quizId],
    queryFn: () => getQuiz({ quizId }),
  });

  const submitQuizMutation = useMutation({
    mutationFn: submitQuiz,
  });

  const [answers, setAnswers] = useState<string[]>([]);

  return (
    <div className="gap-3 flex py-4 flex-col justify-end w-[42rem] mx-auto pt-20">
      <div className="relative">
        {quizQuery.isLoading && <p>Loading...</p>}
        {quizQuery.isError && <p>Error</p>}
        {quizQuery.isSuccess && (
          <div className="grid gap-3 mt-4">
            <h2 className="text-2xl font-bold text-foreground/90 mb-4">
              {quizQuery.data?.name}
            </h2>
            <div className="flex flex-col gap-3">
              {quizQuery.data.questions.map((q, i) => (
                <QuizQuestion
                  key={q.id}
                  isComplete={quizQuery.data.completed}
                  question={q}
                  questionNumber={i + 1}
                  answer={answers[i]}
                  setAnswer={(answer) =>
                    setAnswers((prev) => {
                      const newAnswers = [...prev];
                      newAnswers[i] = answer;
                      return newAnswers;
                    })
                  }
                />
              ))}
            </div>
            {error && (
              <div className="mt-4">
                <Alert className="mt-4" variant="destructive">
                  <AlertTriangleIcon className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </div>
            )}
            {quizQuery.data.completed || (
              <Button
                className="mt-4"
                onClick={() => {
                  if (
                    answers.length !== quizQuery.data.questions.length ||
                    answers.some((a) => !a || a === "")
                  ) {
                    setError("Please answer all questions");
                    return;
                  }
                  submitQuizMutation.mutate({
                    quizId,
                    answers: answers.map((a) => z.string().parse(a)),
                  });
                  quizQuery.refetch();
                }}
                disabled={submitQuizMutation.isPending}
              >
                Submit
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const Route = createFileRoute("/_app/quiz/$quizId")({
  component: Page,
});
