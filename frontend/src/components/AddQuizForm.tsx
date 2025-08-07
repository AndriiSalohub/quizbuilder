import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Plus, Trash } from "lucide-react";
import axios from "axios";
import { useQuizStore } from "@/store/quizStore";
import toast, { Toaster } from "react-hot-toast";

const questionTypes = [
  { id: 1, name: "Multiple Choice" },
  { id: 2, name: "True/False" },
  { id: 3, name: "Short Answer" },
];

type QuestionForm = {
  text: string;
  typeId: number;
  options: { text: string; isCorrect: boolean }[];
  correctAnswer?: string;
};

type ValidationErrors = {
  title?: string;
  questions: {
    text?: string;
    options?: string;
    correctAnswer?: string;
  }[];
};

const AddQuizForm = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<QuestionForm[]>([
    {
      text: "",
      typeId: 1,
      options: [{ text: "", isCorrect: false }],
    },
  ]);
  const [errors, setErrors] = useState<ValidationErrors>({ questions: [{}] });

  const { fetchQuizzes } = useQuizStore();

  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {
      questions: questions.map(() => ({})),
    };

    if (!title.trim()) {
      newErrors.title = "Quiz title is required";
    } else if (title.trim().length < 3) {
      newErrors.title = "Quiz title must be at least 3 characters long";
    }

    questions.forEach((q, qIndex) => {
      if (!q.text.trim()) {
        newErrors.questions[qIndex].text = "Question text is required";
      } else if (q.text.trim().length < 3) {
        newErrors.questions[qIndex].text =
          "Question text must be at least 3 characters long";
      }

      if (q.typeId === 1) {
        if (q.options.length < 2) {
          newErrors.questions[qIndex].options =
            "At least 2 options are required for Multiple Choice";
        } else if (!q.options.some(opt => opt.isCorrect)) {
          newErrors.questions[qIndex].options =
            "At least one option must be marked as correct";
        } else if (q.options.some(opt => !opt.text.trim())) {
          newErrors.questions[qIndex].options =
            "All option texts must be non-empty";
        }
      } else if (q.typeId === 2) {
        if (
          q.options.length !== 2 ||
          q.options[0].text !== "True" ||
          q.options[1].text !== "False"
        ) {
          newErrors.questions[qIndex].options =
            "True/False questions must have exactly 'True' and 'False' options";
        } else if (!q.options.some(opt => opt.isCorrect)) {
          newErrors.questions[qIndex].options =
            "Exactly one option must be marked as correct";
        } else if (q.options.filter(opt => opt.isCorrect).length > 1) {
          newErrors.questions[qIndex].options =
            "Only one option can be marked as correct for True/False";
        }
      } else if (q.typeId === 3) {
        if (!q.correctAnswer?.trim()) {
          newErrors.questions[qIndex].correctAnswer =
            "Correct answer is required for Short Answer";
        } else if (q.correctAnswer.trim().length < 1) {
          newErrors.questions[qIndex].correctAnswer =
            "Correct answer must be at least 1 character long";
        }
      }
    });

    return newErrors;
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: "",
        typeId: 1,
        options: [{ text: "", isCorrect: false }],
      },
    ]);
    setErrors(prev => ({
      ...prev,
      questions: [...prev.questions, {}],
    }));
  };

  const handleDeleteQuestion = (index: number) => {
    setQuestions(prev => prev.filter((_, i) => i !== index));
    setErrors(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  const handleAddOption = (qIndex: number) => {
    const updated = [...questions];
    updated[qIndex].options.push({ text: "", isCorrect: false });
    setQuestions(updated);

    setErrors(validateForm());
  };

  const handleDeleteOption = (qIndex: number, optIndex: number) => {
    const updated = [...questions];
    updated[qIndex].options.splice(optIndex, 1);
    setQuestions(updated);

    setErrors(validateForm());
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    setErrors(validationErrors);

    const hasErrors =
      validationErrors.title ||
      validationErrors.questions.some(
        q => q.text || q.options || q.correctAnswer
      );

    if (hasErrors) {
      toast.error("Please fix all errors before submitting");
      return;
    }

    try {
      const payload = {
        title,
        questions: questions.map(q => ({
          text: q.text,
          typeId: q.typeId,
          options:
            q.typeId === 3
              ? undefined
              : q.options.map(o => ({
                  text: o.text,
                  isCorrect: o.isCorrect,
                })),
          correctAnswer: q.typeId === 3 ? q.correctAnswer : undefined,
        })),
      };

      await axios.post("http://localhost:3008/quizzes", payload);
      toast.success("Quiz created successfully!");

      setTitle("");
      setQuestions([
        {
          text: "",
          typeId: 1,
          options: [{ text: "", isCorrect: false }],
        },
      ]);
      setErrors({ questions: [{}] });

      fetchQuizzes();
    } catch (error) {
      console.error(error);
      const message = "Failed to create quiz.";
      toast.error(message);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8 p-6">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      <h2 className="text-3xl font-semibold">Create New Quiz</h2>

      <div className="space-y-2">
        <label className="text-sm font-medium">Quiz Title</label>
        <Input
          placeholder="Enter quiz title"
          value={title}
          onChange={e => {
            setTitle(e.target.value);
            setErrors(validateForm());
          }}
          className={errors.title ? "border-red-500" : ""}
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
      </div>

      {questions.map((q, qIndex) => (
        <div
          key={qIndex}
          className="space-y-4 rounded-md border border-gray-700 p-4"
        >
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">{`Question ${
              qIndex + 1
            }`}</label>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteQuestion(qIndex)}
            >
              <Trash className="h-4 w-4 text-red-500" />
            </Button>
          </div>

          <div className="space-y-2">
            <Textarea
              placeholder="Question text"
              value={q.text}
              onChange={e => {
                const updated = [...questions];
                updated[qIndex].text = e.target.value;
                setQuestions(updated);
                setErrors(validateForm());
              }}
              className={errors.questions[qIndex]?.text ? "border-red-500" : ""}
            />
            {errors.questions[qIndex]?.text && (
              <p className="text-sm text-red-500">
                {errors.questions[qIndex].text}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Question Type</label>
            <Select
              value={q.typeId.toString()}
              onValueChange={val => {
                const updated = [...questions];
                updated[qIndex].typeId = parseInt(val);

                if (updated[qIndex].typeId === 3) {
                  updated[qIndex].options = [];
                  updated[qIndex].correctAnswer = "";
                } else if (updated[qIndex].typeId === 2) {
                  updated[qIndex].options = [
                    { text: "True", isCorrect: false },
                    { text: "False", isCorrect: false },
                  ];
                  delete updated[qIndex].correctAnswer;
                } else {
                  updated[qIndex].options = [{ text: "", isCorrect: false }];
                  delete updated[qIndex].correctAnswer;
                }

                setQuestions(updated);
                setErrors(validateForm());
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select question type" />
              </SelectTrigger>
              <SelectContent>
                {questionTypes.map(type => (
                  <SelectItem key={type.id} value={type.id.toString()}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {q.typeId === 3 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Correct Answer</label>
              <Input
                placeholder="Enter correct answer"
                value={q.correctAnswer || ""}
                onChange={e => {
                  const updated = [...questions];
                  updated[qIndex].correctAnswer = e.target.value;
                  setQuestions(updated);
                  setErrors(validateForm());
                }}
                className={
                  errors.questions[qIndex]?.correctAnswer
                    ? "border-red-500"
                    : ""
                }
              />
              {errors.questions[qIndex]?.correctAnswer && (
                <p className="text-sm text-red-500">
                  {errors.questions[qIndex].correctAnswer}
                </p>
              )}
            </div>
          )}

          {(q.typeId === 1 || q.typeId === 2) && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Options</label>
              {q.options.map((opt, optIndex) => (
                <div key={optIndex} className="flex items-center gap-3">
                  <Input
                    className={`flex-1 ${
                      errors.questions[qIndex]?.options &&
                      !opt.text.trim() &&
                      q.typeId === 1
                        ? "border-red-500"
                        : ""
                    }`}
                    placeholder={`Option ${optIndex + 1}`}
                    value={opt.text}
                    onChange={e => {
                      const updated = [...questions];
                      updated[qIndex].options[optIndex].text = e.target.value;
                      setQuestions(updated);
                      setErrors(validateForm());
                    }}
                    disabled={q.typeId === 2}
                  />
                  <label className="flex items-center gap-1 text-sm">
                    <input
                      type={q.typeId === 1 ? "checkbox" : "radio"}
                      name={`correct-${qIndex}`}
                      checked={opt.isCorrect}
                      onChange={e => {
                        const updated = [...questions];
                        if (q.typeId === 1) {
                          updated[qIndex].options[optIndex].isCorrect =
                            e.target.checked;
                        } else {
                          updated[qIndex].options = updated[qIndex].options.map(
                            (o, i) => ({
                              ...o,
                              isCorrect: i === optIndex,
                            })
                          );
                        }
                        setQuestions(updated);
                        setErrors(validateForm());
                      }}
                    />
                    Correct
                  </label>
                  {q.typeId !== 2 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteOption(qIndex, optIndex)}
                    >
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </div>
              ))}
              {errors.questions[qIndex]?.options && (
                <p className="text-sm text-red-500">
                  {errors.questions[qIndex].options}
                </p>
              )}
              {q.typeId !== 2 && (
                <Button
                  variant="outline"
                  onClick={() => handleAddOption(qIndex)}
                  className="mt-2"
                  size="sm"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Option
                </Button>
              )}
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-between gap-3">
        <Button
          variant="secondary"
          onClick={handleAddQuestion}
          className="flex-1"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Question
        </Button>
        <Button onClick={handleSubmit} className="flex-1">
          Save Quiz
        </Button>
      </div>
    </div>
  );
};

export default AddQuizForm;
