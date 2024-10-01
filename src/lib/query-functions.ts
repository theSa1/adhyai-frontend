type GetToken = () => Promise<string | null>;

export const getCourses = async ({ getToken }: { getToken: GetToken }) => {
  const res = await fetch(import.meta.env.VITE_API_BASE + "/course/get", {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
  });
  const data: {
    success: boolean;
    data: {
      name: string;
      id: string;
    }[];
  } = await res.json();

  if (!data.success) {
    throw new Error("An error occurred");
  }

  return data.data;
};

export const addCourse = async ({
  name,
  getToken,
}: {
  name: string;
  getToken: GetToken;
}) => {
  const res = await fetch(import.meta.env.VITE_API_BASE + "/course/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await getToken()}`,
    },
    body: JSON.stringify({ name }),
  });

  return res.json();
};

export const getFiles = async ({
  courseId,
  getToken,
}: {
  courseId: string;
  getToken: GetToken;
}) => {
  const res = await fetch(
    import.meta.env.VITE_API_BASE + `/document/get?courseId=${courseId}`,
    {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    }
  );
  const data: {
    success: boolean;
    data: {
      name: string;
      id: string;
    }[];
  } = await res.json();

  if (!data.success) {
    throw new Error("An error occurred");
  }

  return data.data;
};

export const getQuizzes = async ({
  courseId,
  getToken,
}: {
  courseId: string;
  getToken: GetToken;
}) => {
  const res = await fetch(
    import.meta.env.VITE_API_BASE + `/quiz/get-all?courseId=${courseId}`,
    {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    }
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
    throw new Error("An error occurred");
  }

  return data.data;
};

export const getQuiz = async ({
  quizId,
  getToken,
}: {
  quizId: string;
  getToken: GetToken;
}) => {
  const res = await fetch(
    import.meta.env.VITE_API_BASE + `/quiz/get?quizId=${quizId}`,
    {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    }
  );
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
    throw new Error("An error occurred");
  }

  return data.data;
};

export const submitQuiz = async ({
  quizId,
  answers,
  getToken,
}: {
  quizId: string;
  answers: string[];
  getToken: GetToken;
}) => {
  const res = await fetch(import.meta.env.VITE_API_BASE + `/quiz/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await getToken()}`,
    },
    body: JSON.stringify({ quizId, answers }),
  });

  return res.json();
};
