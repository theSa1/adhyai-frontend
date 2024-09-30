export const getCourses = async () => {
  const res = await fetch("http://localhost:3000/course/get", {
    credentials: "include",
  });
  const data: {
    success: boolean;
    data: {
      name: string;
      id: string;
    }[];
  } = await res.json();

  if (!data.success) {
    throw new Error("An error occured");
  }

  return data.data;
};

export const addCourse = async ({ name }: { name: string }) => {
  const res = await fetch("http://localhost:3000/course/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
    credentials: "include",
  });

  return res.json();
};

export const getFiles = async ({ courseId }: { courseId: string }) => {
  const res = await fetch(
    `http://localhost:3000/document/get?courseId=${courseId}`,
    { credentials: "include" }
  );
  const data: {
    success: boolean;
    data: {
      name: string;
      id: string;
    }[];
  } = await res.json();

  if (!data.success) {
    throw new Error("An error occured");
  }

  return data.data;
};

export const getQuizzes = async ({ courseId }: { courseId: string }) => {
  const res = await fetch(
    `http://localhost:3000/quiz/get-all?courseId=${courseId}`,
    { credentials: "include" }
  );
  const data: {
    success: boolean;
    data: {
      name: string;
      id: string;
      completed: boolean;
      createdAt: string;
    }[];
  } = await res.json();

  if (!data.success) {
    throw new Error("An error occured");
  }

  return data.data;
};

export const getQuiz = async ({ quizId }: { quizId: string }) => {
  const res = await fetch(`http://localhost:3000/quiz/get?quizId=${quizId}`, {
    credentials: "include",
  });
  const data: {
    success: boolean;
    data: {
      name: string;
      id: string;
      completed: boolean;
      questions: {
        id: string;
        questionType:
          | "multiple_choice"
          | "true_false"
          | "short_answer"
          | "long_answer";
        question: string;
        options?: string[];
        givenAnswer?: string;
        feedback?: string;
        marks?: number;
      }[];
    };
  } = await res.json();

  if (!data.success) {
    throw new Error("An error occured");
  }

  return data.data;
};

export const submitQuiz = async ({
  quizId,
  answers,
}: {
  quizId: string;
  answers: string[];
}) => {
  const res = await fetch(`http://localhost:3000/quiz/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quizId, answers }),
    credentials: "include",
  });

  return res.json();
};
