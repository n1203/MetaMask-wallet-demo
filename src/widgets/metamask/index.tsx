import Button from "@/components/button";
import { useConnectMetamask } from "@/hooks/use-connect-metamask";

const hashName = (hash: string) => {
  return hash.slice(0, 6) + "..." + hash.slice(hash.length - 4, hash.length);
}

const Dashboard = ({transaction = [], balance = 0, addresses = [], getTransaction = () => {}}) => {
  return (
    <div className="fixed max-w-5xl mx-auto w-full bottom-8 left-0 right-0 top-60 overflow-hidden bg-white border rounded-2xl border-gray-300 p-8 backdrop-blur-sm bg-opacity-95">
      <h1 className=" text-gray-600 flex items-center justify-between"> 
        <div>
          <a target="_blank" href={`https://etherscan.io/address/${addresses[0]}`} className=" hover:underline">`{hashName(addresses[0])}`</a>
          交易记录
        </div>
        <Button onClick={() => {
          getTransaction("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2")
        }}>
          测试``数据
        </Button>
        <Button onClick={() => {
          getTransaction()
        }}>
          钱包正常数据
        </Button>
        <b className="ml-2 bg-white border border-gray-300 rounded-md px-2 py-0.5">💰 {balance} ETH</b>
      </h1>
      <div className="flex flex-col gap-2 mt-4 pb-8 h-full overflow-y-scroll">
        {transaction.map((item: any, index) => {
          return <div key={item.transactionHash + index}>
            <div className="flex items-center gap-2 bg-white hover:bg-gray-100 p-2 rounded-lg border border-gray-200">
              {item.event && <h1 className="font-bold text-orange-600 text-xs rounded-md p-1 border border-orange-600">{item.event}</h1>}
              <a href={`https://etherscan.io/tx/${item.transactionHash}`} target="_blank" className="underline">{hashName(item.transactionHash)}</a>
              <b className="text-green-700 flex-1 text-right">
                {item.returnValues && item.returnValues.value && window.web3.utils.fromWei(item.returnValues.value, "ether")} eth
              </b>
            </div>
          </div>
        })}
      </div>
    </div>
  );
};

const Accounts = ({
  addresses,
  transaction = [],
  onClose = () => {},
  balance = 0,
  getTransaction = () => {},
}: {
  addresses: string[];
  onClose: () => void;
  transaction: any;
  balance: number;
  getTransaction: () => void;
}) => {
  return (
    <div className="flex items-center">
      <Button className="py-2 px-4 cursor-pointer hover:opacity-80 focus:opacity-100 select-none border rounded-md border-gray-200 bg-black text-white ml-4 flex items-center gap-2">
        <h1>{addresses[0]}</h1>
      </Button>
      <Button className="px-3" onClick={onClose}>
        <i className="ri-close-fill"></i>
      </Button>
      <Dashboard transaction={transaction} balance={balance} getTransaction={getTransaction} addresses={addresses} />
    </div>
  );
};

export default function ConnectWallet() {
  const { connectMetamask, getTransaction, isConnect, addresses, balance, loading, disconnect, transaction } =
    useConnectMetamask();

  return isConnect ? <>
    <Accounts getTransaction={getTransaction} balance={balance} transaction={transaction} addresses={addresses} onClose={disconnect} />
  </> : (
    <Button onClick={connectMetamask}>
      <>
        {loading && <i className="ri-more-fill"></i>}
        <h1>🦊 Connect Wallet</h1>
      </>
    </Button>
  );
}
