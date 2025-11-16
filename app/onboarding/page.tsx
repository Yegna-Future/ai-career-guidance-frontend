"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    goals: [] as string[],
    education: "",
    fields: [] as string[],
    region: "",
    support: [] as string[],
  });

  const handleToggleSelect = (key: string, value: string) => {
    setFormData((prev) => {
      const selected = prev[key as keyof typeof prev] as string[];
      return selected.includes(value)
        ? { ...prev, [key]: selected.filter((v) => v !== value) }
        : { ...prev, [key]: [...selected, value] };
    });
  };

  const handleChange = (key: string, value: string) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleNext = () => {
    if (step < totalSteps) {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  };

  const handleSubmit = () => {
    console.log("✅ User Onboarding Data:", formData);

    // redirect logic based on user goals
    const goals = formData.goals.map((g) => g.toLowerCase());

    if (goals.includes("find scholarships or funding")) {
      router.push("/scholarships");
    } else if (goals.includes("search for universities")) {
      router.push("/universities");
    } else if (goals.includes("talk to our ai to discover my passion")) {
      router.push("/chatbot");
    } else if (goals.includes("get career guidance or mentorship")) {
      router.push("/career-map");
    } else if (goals.includes("learn new skills or tutorials")) {
      router.push("/tutorials");
    } else {
      router.push("/dashboard");
    }
  };

  const steps = [
    {
      key: "goals",
      question: "What brings you to YegnaFuture today?",
      type: "multi",
      options: [
        "Search for universities",
        "Find scholarships or funding",
        "Talk to our AI to discover my passion",
        "Get career guidance or mentorship",
        "Learn new skills or tutorials",
      ],
    },
    {
      key: "education",
      question: "What is your current education level?",
      type: "dropdown",
      options: [
        "High school (Grade 9–12)",
        "Pre-university / Gap year",
        "University student",
        "Graduate",
        "Other",
      ],
    },
    {
      key: "fields",
      question: "Which fields or industries interest you the most?",
      type: "multi",
      options: [
        "Engineering and Technology",
        "Health and Medicine",
        "Business and Economics",
        "Social Sciences",
        "Computer Science and AI",
        "Arts and Design",
        "Education",
      ],
    },
    {
      key: "region",
      question: "Which region or city in Ethiopia are you from?",
      type: "dropdown",
      options: [
        "Addis Ababa",
        "Oromia",
        "Amhara",
        "Tigray",
        "Sidama",
        "SNNPR",
        "Afar",
        "Somali",
        "Benishangul-Gumuz",
        "Gambella",
        "Harari",
        "Other",
      ],
    },
    {
      key: "support",
      question: "How would you like YegnaFuture to support you most?",
      type: "multi",
      options: [
        "AI recommendations for scholarships",
        "Career mentorship",
        "Learning and tutorials",
        "Community discussions",
        "University guidance",
      ],
    },
  ];

  const current = steps[step - 1];

  const isStepValid =
    current.type === "multi"
      ? (formData[current.key as keyof typeof formData] as string[]).length > 0
      : !!formData[current.key as keyof typeof formData];

  // Get visible steps (previous, current, next)
  const getVisibleSteps = () => {
    const visible = [];

    // Previous step
    if (step > 1) {
      visible.push({ step: step - 1, position: "left" });
    }

    // Current step
    visible.push({ step: step, position: "center" });

    // Next step
    if (step < totalSteps) {
      visible.push({ step: step + 1, position: "right" });
    }

    return visible;
  };

  const visibleSteps = getVisibleSteps();

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-6xl">
        {/* Progress Bar
        
                <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-500">
              Step {step} of {totalSteps}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>*/}


        {/* Carousel Container with Connecting Line */}
        <div className="relative h-80">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 transform -translate-y-1/2 z-0">
            <div
              className="h-0.5 bg-indigo-500 transition-all duration-300"
              style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-center h-full relative z-10">
            <AnimatePresence mode="popLayout">
              {visibleSteps.map(({ step: stepNumber, position }) => {
                const stepData = steps[stepNumber - 1];
                const isCenter = position === "center";

                return (
                  <motion.div
                    key={stepNumber}
                    initial={{
                      x: position === "left" ? -250 : position === "right" ? 250 : 0,
                      opacity: 0.7,
                      scale: 0.9
                    }}
                    animate={{
                      x: position === "left" ? -180 : position === "right" ? 180 : 0,
                      opacity: isCenter ? 1 : 0.7,
                      scale: isCenter ? 1 : 0.9
                    }}
                    exit={{
                      x: position === "left" ? -250 : 250,
                      opacity: 0,
                      scale: 0.9
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      duration: 0.3
                    }}
                    className={`absolute top-0 w-96 ${position === "left" ? "left-0" :
                      position === "right" ? "right-0" :
                        "left-1/2 transform -translate-x-1/2"
                      } ${!isCenter ? "pointer-events-none" : ""}`}
                  >
                    <Card className={`shadow-lg transition-all duration-300 ${isCenter
                      ? "border-indigo-400 shadow-xl bg-white"
                      : "border-gray-200 blur-[0.5px] bg-gray-50"
                      }`}>
                      <CardContent className="p-6">
                        {/* Step Number Indicator */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-4 mx-auto ${isCenter
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-300 text-gray-600"
                          }`}>
                          {stepNumber}
                        </div>

                        <h2 className="text-xl font-semibold text-center mb-6">
                          {stepData.question}
                        </h2>

                        {/* MULTI SELECT */}
                        {stepData.type === "multi" && (
                          <div className="space-y-3 max-h-48 overflow-y-auto">
                            {stepData.options.map((option) => {
                              const selected = (
                                formData[stepData.key as keyof typeof formData] as string[]
                              ).includes(option);
                              return (
                                <button
                                  key={option}
                                  type="button"
                                  onClick={() => isCenter && handleToggleSelect(stepData.key, option)}
                                  className={`w-full text-left p-3 border rounded-lg transition-all duration-200 ${selected
                                    ? "bg-indigo-100 border-indigo-500 text-indigo-700 font-medium"
                                    : "border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                                    } ${!isCenter ? "cursor-not-allowed opacity-70" : ""
                                    }`}
                                  disabled={!isCenter}
                                >
                                  {option}
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* DROPDOWN */}
                        {stepData.type === "dropdown" && (
                          <select
                            className={`w-full border border-gray-300 rounded-md p-3 transition-colors ${isCenter
                              ? "focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-gray-400"
                              : "cursor-not-allowed opacity-70"
                              }`}
                            value={formData[stepData.key as keyof typeof formData]}
                            onChange={(e) => isCenter && handleChange(stepData.key, e.target.value)}
                            disabled={!isCenter}
                          >
                            <option value="">Select an option</option>
                            {stepData.options.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-3 items-center mt-48">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1}
            className="min-w-20"
          >
            Back
          </Button>

          {/* Step Indicators */}
          <div className="flex items-center space-x-2 p-3">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${step === index + 1
                  ? "bg-indigo-600 scale-125"
                  : "bg-gray-300"
                  }`}
              />
            ))}
          </div>

          <Button
            onClick={step === totalSteps ? handleSubmit : handleNext}
            disabled={!isStepValid}
            className="min-w-20"
          >
            {step === totalSteps ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}