// @ts-nocheck
import { hashName } from "@/utils/hash-name";
import { useRef } from "react";

const Dashboard = ({metamask}: any) => {
  const signInputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="w-full max-w-5xl mt-12  h-full overflow-hidden bg-white border rounded-2xl border-gray-300 p-8 backdrop-blur-sm bg-opacity-95" style={{
      height: "calc(100vh - 300px)",
    }}>
      <h1 className=" text-gray-600 flex items-center justify-between">
        <div>
          <a
            target="_blank"
            href={`https://etherscan.io/address/${metamask.addresses[0]}`}
            className=" hover:underline"
          >
            `{hashName(metamask.addresses[0])}`
          </a>
          交易记录
        </div>
        <b className="ml-2 bg-white border border-gray-300 rounded-md px-2 py-0.5">
          💰 {metamask.balance} ETH
        </b>
        <div className="border border-gray-300 rounded-md py-0.5 px-1">
          <input
            className=" border-none outline-none"
            ref={signInputRef}
            type="text"
          />
          <button
            className=" bg-black text-white px-1 rounded"
            onClick={() => {
              metamask.sign(signInputRef.current!.value);
            }}
          >
            签名
          </button>
        </div>
        <div
          className=" cursor-pointer hover:underline"
          onClick={() => {
            metamask.getTransaction(
              "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
            );
          }}
        >
          `{hashName("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2")}`测试数据
        </div>
        <div
          className=" cursor-pointer hover:underline"
          onClick={() => {
            metamask.getTransaction();
          }}
        >
          钱包正常数据
        </div>
      </h1>
      <div className="flex flex-col gap-2 mt-4 pr-4 pb-8 h-full overflow-y-scroll">
        {metamask.transaction.map((item: any, index: number) => {
          return (
            <div key={item.transactionHash + index}>
              <div className="flex items-center gap-2 bg-white hover:bg-gray-100 p-2 rounded-lg border border-gray-200">
                {item.event && (
                  <h1 className="font-bold text-orange-600 text-xs rounded-md p-1 border border-orange-600">
                    {item.event}
                  </h1>
                )}
                <a
                  href={`https://etherscan.io/tx/${item.transactionHash}`}
                  target="_blank"
                  className="underline"
                >
                  {hashName(item.transactionHash)}
                </a>
                <b className="text-green-700 flex-1 text-right">
                  {item.returnValues &&
                    item.returnValues.value &&
                    window.web3.utils.fromWei(
                      item.returnValues.value,
                      "ether"
                    )}{" "}
                  eth
                </b>
              </div>
            </div>
          );
        })}
        {metamask.transaction.length === 0 && (
          <div className="flex items-center justify-center h-full">
            🈚️ 暂无数据
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
