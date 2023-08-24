import { ApproveTransaction, TransferTrasaction } from "../metamask";

export default function HelloMetamask() {

  return (
    <div className="flex flex-col items-center bg-slate-100 h-screen justify-center">
      <div className="shadow-lg text-center border border-slate-300 bg-white p-10 rounded-md">
        <ApproveTransaction />
        <br/>
        <br/>
        <TransferTrasaction />
      </div>
    </div>
  );
}
