import { Button } from "./components/Button";
import { Header } from "./components/Headers";
import { Result } from "./components/Result";
import { Text } from "./components/Text";
import "./index.css";

function InscriptionLookup() {
  return (
    <div className="flex flex-col items-center">
      <Header>Ordinal Inscription Lookup</Header>
      <form className="flex w-full flex-col px-4 py-8">
        <label>
          <Text>Owner Bitcoin Address:</Text>

          <div className="pb-3.5" />

          <input className="h-8 w-full bg-zinc-800 px-1 text-white" />
        </label>

        <div className="pb-2.5" />

        <Button>Look up</Button>

        <div className="pb-5" />

        <Text>Results</Text>

        <div className="pb-6" />

        <div className="flex flex-col gap-y-4 ">
          <Result id="12345678" />
          <Result id="qwertyui" />
          <Result id="asdfghjk" />
        </div>
      </form>
    </div>
  );
}

export default function App() {
  return (
    <div className="bg-zinc-900">
      <div className="mx-auto w-full max-w-[480px] border border-white py-12">
        <InscriptionLookup />
      </div>
    </div>
  );
}
