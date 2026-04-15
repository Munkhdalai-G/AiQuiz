import { Sparkles, X } from "lucide-react";
import Alert from "./alert";

export default function QuickTest() {
  return (
    <div className=" flex flex-col gap-3 mt-10 mx-120 border px-10 py-10 rounded-md ">
      <div className="flex flex-col  items-center justify-between ">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-3">
            <Sparkles />
            Quick test
          </div>
          <Alert />
        </div>
        <div className="border w-full mt-10">
          <div className="flex items-center justify-between mx-10">
            <h1 className="flex justify-center py-5">
              What was Genghis Khan’s birth name?
            </h1>
            <div>{}/5</div>
          </div>
          <div className="flex flex-col gap-5 mx-10">
            <div className="w-full flex justify-evenly ">
              <button className="border w-full ">Yesugei</button>
              <button className="border w-full">Temüjin</button>
            </div>
            <div className="w-full flex justify-evenly mb-3">
              <button className="border w-full">Jamukha</button>
              <button className="border w-full">Toghrul</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
