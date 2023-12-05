import { burnTransaction } from "../helpers/burnTransaction";

const ConnectMetamask = () => {
  return (
    <div>
      <div
        className="my-2 bg-orange-500 text-white px-5 py-3 rounded-md my-2 font-bold tracking-wider text-center hover:cursor-pointer uppercase"
        onClick={() => {
          if (window.ethereum) {
            burnTransaction(1);
          }
        }}
      >
        Burn Token
      </div>
    </div>
  );
};

export default ConnectMetamask;
