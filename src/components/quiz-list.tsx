import { getQuizzes } from "@/lib/query-functions";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Loader2 } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";

export const QuizList = ({ selectedCourse }: { selectedCourse: string }) => {
  const { getToken } = useAuth();
  const quizzesQuery = useQuery({
    queryKey: ["quizzes", selectedCourse],
    queryFn: () => getQuizzes({ courseId: selectedCourse!, getToken }),
  });

  return (
    <>
      {quizzesQuery.isLoading && (
        <div className="flex items-center justify-center h-32">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}
      {quizzesQuery.isError && <p>Error</p>}
      {quizzesQuery.isSuccess && (
        <div className="grid gap-3 mt-4">
          {quizzesQuery.data.length === 0 && (
            <p className="text-foreground/70 text-sm text-center">
              No quizzes available
              <br />
              To start a quiz, ask adhyai in chat. i.e. Start a quiz on "topic"
            </p>
          )}
          {quizzesQuery.data?.map((quiz) => (
            <Link key={quiz.id} to="/quiz/$quizId" params={{ quizId: quiz.id }}>
              <Card>
                <CardHeader>
                  <CardTitle>{quiz.name}</CardTitle>
                  <CardDescription>
                    Created on {new Date(quiz.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
