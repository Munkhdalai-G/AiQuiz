import { ScrollText, Sparkles } from "lucide-react";

export default function Quiz() {
  return (
    <div className="">
      <div>
        <Sparkles />
        Article Quiz Generator
      </div>
      <p>
        Paste your article below to generate a summarize and quiz question. Your
        articles will saved in the sidebar for future reference.
      </p>
      <div>
        <ScrollText />
        Article Title
      </div>
      <input type="text" placeholder="Enter a title for your article..." />{" "}
      <div>
        <ScrollText />
        Article Content
      </div>
      <input type="text" placeholder="Paste your article content here..." />
      <button>generate summary</button>
    </div>
  );
}
