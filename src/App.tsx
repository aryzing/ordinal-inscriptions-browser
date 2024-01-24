import { Header } from "./components/headers";
import "./index.css";

function InscriptionLookup() {
  return (
    <form className="flex max-w-[480px] w-full flex-col items-center mx-auto py-12">
      <Header>Ordinals Inscription Lookup</Header>
      <div className="self-stretch flex w-full flex-col items-stretch mt-8 mb-[566px] px-4">
        <label className="text-center text-sm font-medium">
          Owner Bitcoin Address:
          <input className="bg-zinc-800 flex shrink-0 h-8 flex-col mt-3.5" />
        </label>
        <button className="text-white text-center text-sm font-medium whitespace-nowrap bg-indigo-600 justify-center items-center mt-2.5 px-16 py-4 rounded-xl">
          Look up
        </button>
        <div className="text-white text-center text-sm font-medium mt-5">
          Results
        </div>
        <div className="flex justify-between gap-5 mt-11 pr-3.5 items-start">
          <div className="flex flex-col items-stretch">
            <div className="justify-center text-white text-sm font-medium leading-5">
              Inscription 2f83b9b0
            </div>
            <div className="justify-center text-white text-sm font-medium leading-5 mt-12">
              Inscription fe7cff70
            </div>
            <div className="justify-center text-white text-sm font-medium leading-5 mt-12">
              Inscription b81979b1
            </div>
          </div>
          <div className="self-stretch flex flex-col items-center"></div>
        </div>
      </div>
    </form>
  );
}

export default function App() {
  return (
    <div className="bg-zinc-900">
      <InscriptionLookup />
    </div>
  );
}
