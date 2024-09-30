import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { getQuiz } from "@/lib/query-functions";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Check, Cross, MessageSquareQuote, X } from "lucide-react";

export const QuizQuestion = ({
  question,
  questionNumber,
  answer,
  setAnswer,
  isComplete,
}: {
  question: Awaited<ReturnType<typeof getQuiz>>["questions"][0];
  questionNumber: number;
  answer: string;
  setAnswer: (answer: string) => void;
  isComplete: boolean;
}) => {
  useEffect(() => {
    if (isComplete) {
      setAnswer(question?.givenAnswer ?? "");
    }
  }, [question]);

  return (
    <Card className="relative">
      {isComplete && (
        <div className="absolute top-3 right-3 p-2 bg-primary text-primary-foreground rounded px-3 py-1 text-sm">
          {question.questionType === "multiple_choice" ||
          question.questionType === "true_false" ? (
            (question.marks || 0) >= 1 ? (
              <Check className="h-4 w-4" />
            ) : (
              <X className="h-4 w-4" />
            )
          ) : (
            <span>
              {question.marks || 0} /{" "}
              {question.questionType === "short_answer" ? 2 : 5}
            </span>
          )}
        </div>
      )}
      <CardHeader>
        <CardTitle>#Q{questionNumber}</CardTitle>
        <CardDescription>{question.question}</CardDescription>
      </CardHeader>
      <CardContent>
        {question.questionType === "multiple_choice" && (
          <div className="flex flex-col gap-1">
            {question.options?.map((o, i) => (
              <Button
                variant={i.toString() === answer ? "default" : "outline"}
                className="w-full"
                onClick={() => isComplete || setAnswer(i.toString())}
              >
                {o}
              </Button>
            ))}
          </div>
        )}
        {question.questionType === "true_false" && (
          <div className="flex gap-4 justify-end">
            <Button
              variant={answer === "true" ? "default" : "outline"}
              onClick={() => isComplete || setAnswer("true")}
            >
              True
            </Button>
            <Button
              variant={answer === "false" ? "default" : "outline"}
              onClick={() => isComplete || setAnswer("false")}
            >
              False
            </Button>
          </div>
        )}
        {question.questionType === "short_answer" && (
          <Input
            placeholder="Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={isComplete}
          />
        )}
        {question.questionType === "long_answer" && (
          <Textarea
            placeholder="Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={isComplete}
          />
        )}
        {isComplete && question.feedback && (
          <Alert className="mt-4">
            <MessageSquareQuote className="h-4 w-4" />
            <AlertTitle>Feedback</AlertTitle>
            <AlertDescription>{question.feedback}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
