import { Copy } from "lucide-react";
import { useTranslations } from "next-intl";

interface ResultProps {
  score: number;
  rounds: number;
  playAgain: () => void;
}

const Result = ({ playAgain, rounds, score }: ResultProps) => {

  const translate = useTranslations("result");

  const handleCopy = () => {

    const copiedText = translate("share.copied", {score, rounds});
    const shareText = translate("share.shared", {score, rounds});

    const shareData = {
      title: "baseschallange",
      text: shareText,
      url: "https://baseschallenge.vercel.app/",
    };

    navigator.clipboard.writeText(copiedText);

    alert(translate("copied_to_clipboard"));

    try {
      navigator.share(shareData);
    } catch (error) {
      console.error(translate("share.not_supported"));
    }
  };

  const handleUserKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      playAgain();
    }
  };

  window.addEventListener("keydown", handleUserKeyPress);

  return (
    <div className="bg-app-bg dark:bg-app-bg-dark absolute top-0 left-0 h-full w-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-bold text-secondary dark:text-secondary-dark">
          {score > 3 ? translate("congratulations") : translate("goodtry")}
        </h1>
        <p className="text-primary dark:text-primary-dark">
          {translate("result")}: {score}/{rounds}
        </p>
        <button
          className="flex items-center gap-2 underline text-primary dark:text-primary-dark text-xs"
          onClick={handleCopy}
        >
          <Copy />
          {translate("click_to_copy")}
        </button>

        <button
          className="bg-button-bg-1 dark:bg-button-bg-1-dark text-primary dark:text-primary-dark font-medium px-4 py-3 rounded-md hover:-translate-y-1 mt-5"
          onClick={playAgain}
        >
         {translate("play_again")}
        </button>
      </div>
    </div>
  );
};

export default Result;
