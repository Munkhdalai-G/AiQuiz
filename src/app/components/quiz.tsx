import { ScrollText, Sparkles } from "lucide-react";

export default function Quiz() {
  return (
    <div className=" flex flex-col gap-3 mt-10 mx-120 border px-10 py-10 rounded-md ">
      <div className="flex items-center text-3xl ">
        <Sparkles />
        Article Quiz Generator
      </div>
      <p className="text-gray-400 text-xl">
        Paste your article below to generate a summarize and quiz question. Your
        articles will saved in the sidebar for future reference.
      </p>
      <div className="flex items-center text-xl text-gray-700">
        <ScrollText />
        Article Title
      </div>
      <input
        type="text"
        placeholder="Enter a title for your article..."
        className="w-full h-10 border border-gray-200 rounded-xs pl-4"
      />
      <div className="flex items-center text-xl text-gray-700">
        <ScrollText />
        Article Content
      </div>
      <input
        type="text"
        placeholder="Paste your article content here..."
        className="w-full h-30  border border-gray-200 rounded-xs pl-4"
      />
      <div className="w-full flex justify-end ">
        <button className="w-40 h-10 mt-3 rounded-md bg-gray-400 text-white items-center flex justify-center border">
          generate summary
        </button>
      </div>
    </div>
  );
}
