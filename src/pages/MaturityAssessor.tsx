import { useState } from "react";
import { Gauge, CheckCircle2, Circle, ArrowRight, RotateCcw, Award } from "lucide-react";
import { maturityQuestions, calculateMaturity, type MaturityResult } from "../data/maturity";

export default function MaturityAssessor() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<MaturityResult | null>(null);

  const question = maturityQuestions[current];
  const isLast = current === maturityQuestions.length - 1;
  const answered = Object.keys(answers).length;

  const selectOption = (score: number) => {
    const newAnswers = { ...answers, [question.id]: score };
    setAnswers(newAnswers);
    if (isLast) {
      setResult(calculateMaturity(newAnswers));
    } else {
      setCurrent(current + 1);
    }
  };

  const reset = () => {
    setCurrent(0);
    setAnswers({});
    setResult(null);
  };

  const goBack = () => {
    if (current > 0) setCurrent(current - 1);
  };

  if (result) {
    const color =
      result.percentage < 25 ? "red" :
      result.percentage < 50 ? "orange" :
      result.percentage < 75 ? "blue" : "green";

    const colorClasses: Record<string, string> = {
      red: "from-red-500 to-red-600 text-red-600 bg-red-50 dark:bg-red-900/20",
      orange: "from-orange-500 to-orange-600 text-orange-600 bg-orange-50 dark:bg-orange-900/20",
      blue: "from-blue-500 to-blue-600 text-blue-600 bg-blue-50 dark:bg-blue-900/20",
      green: "from-green-500 to-green-600 text-green-600 bg-green-50 dark:bg-green-900/20",
    };

    const parts = colorClasses[color].split(" ");
    const gradient = parts.slice(0, 2).join(" ");
    const textColor = parts[2];
    const bg = parts.slice(3).join(" ");

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${gradient} text-white mb-4`}>
            <Award size={32} />
          </div>
          <h1 className="text-3xl font-bold mb-2">Assessment Complete</h1>
          <p className="text-gray-500 dark:text-gray-400">Your city's Digital Twin Maturity Level</p>
        </div>

        {/* Score Card */}
        <div className={`rounded-2xl ${bg} p-8 mb-6 text-center`}>
          <div className={`text-5xl font-bold ${textColor} mb-2`}>{result.percentage}%</div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Score: {result.score} / {result.maxScore}
          </div>
          <div className={`text-xl font-bold ${textColor}`}>{result.level}</div>
        </div>

        {/* Description */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-300">{result.description}</p>
        </div>

        {/* Recommendations */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <ArrowRight size={18} className="text-brand-600" />
            Recommended Next Steps
          </h3>
          <ul className="space-y-3">
            {result.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="text-brand-600 shrink-0 mt-0.5" size={18} />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Dimension Breakdown */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
          <h3 className="font-bold mb-4">Dimension Breakdown</h3>
          <div className="space-y-3">
            {maturityQuestions.map((q) => {
              const score = answers[q.id] || 0;
              const pct = (score / 3) * 100;
              return (
                <div key={q.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">{q.dimension}</span>
                    <span className="font-medium">{score}/3</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={reset}
          className="w-full py-3 rounded-lg bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw size={18} /> Retake Assessment
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-100 dark:bg-brand-900/30 mb-4">
          <Gauge className="text-brand-600 dark:text-brand-400" size={28} />
        </div>
        <h1 className="text-3xl font-bold mb-2">DT Maturity Assessor</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Assess your city's Digital Twin readiness based on ISO/IEC 30186 maturity model
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-6">
        {maturityQuestions.map((q, i) => (
          <div
            key={q.id}
            className={`flex-1 h-1.5 rounded-full transition-colors ${
              i < current ? "bg-brand-600" : i === current ? "bg-brand-400" : "bg-gray-200 dark:bg-gray-800"
            }`}
          />
        ))}
      </div>
      <div className="text-center text-sm text-gray-400 mb-6">
        Question {current + 1} of {maturityQuestions.length} · {answered} answered
      </div>

      {/* Question */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-4">
        <div className="text-xs font-medium text-brand-600 mb-2">{question.dimension}</div>
        <h2 className="text-lg font-semibold mb-6">{question.question}</h2>
        <div className="space-y-3">
          {question.options.map((opt) => {
            const isSelected = answers[question.id] === opt.score;
            return (
              <button
                key={opt.score}
                onClick={() => selectOption(opt.score)}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-all flex items-center gap-3 ${
                  isSelected
                    ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20"
                    : "border-gray-200 dark:border-gray-800 hover:border-brand-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {isSelected ? (
                  <CheckCircle2 className="text-brand-600 shrink-0" size={20} />
                ) : (
                  <Circle className="text-gray-300 dark:text-gray-600 shrink-0" size={20} />
                )}
                <span className="text-sm">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={goBack}
          disabled={current === 0}
          className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          ← Back
        </button>
        {isLast && answered === maturityQuestions.length && (
          <button
            onClick={() => setResult(calculateMaturity(answers))}
            className="px-6 py-2 rounded-lg bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors"
          >
            View Results →
          </button>
        )}
      </div>
    </div>
  );
}
