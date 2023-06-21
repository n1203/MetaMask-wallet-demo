import { useConnectMetamask } from "@/hooks/use-connect-metamask";

const Accounts = ({ addresses }: { addresses: [string] }) => {
    return (
        <div className="py-2 px-4 cursor-pointer hover:opacity-80 focus:opacity-100 select-none border rounded-md border-gray-200 bg-black text-white ml-4 flex items-center gap-2">
            <h1>{addresses[0]}</h1>
        </div>
    );
}

export default function ConnectWallet() {
  const { connectMetamask, isConnect, addresses, loading } =
    useConnectMetamask();
  return isConnect ? <Accounts addresses={addresses} /> : (
    <div
      onClick={connectMetamask}
      className="py-2 px-4 cursor-pointer hover:opacity-80 focus:opacity-100 select-none border rounded-md border-gray-200 bg-black text-white ml-4 flex items-center gap-2"
    >
      {loading && <i className="ri-more-fill"></i>}
      <h1>🦊 Connect Wallet</h1>
    </div>
  );
}
