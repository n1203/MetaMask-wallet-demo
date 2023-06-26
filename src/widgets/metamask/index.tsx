import Button from "@/components/button";

const Accounts = ({
  metamask = {},
}: {
  metamask: any
}) => {
  return (
    <div className="flex items-center">
      <Button className="py-2 px-4 cursor-pointer hover:opacity-80 focus:opacity-100 select-none border rounded-md border-gray-200 bg-black text-white ml-4 flex items-center gap-2">
        <h1>{metamask.addresses[0]}</h1>
      </Button>
      <Button className="px-3" onClick={metamask.disconnect}>
        <i className="ri-close-fill"></i>
      </Button>
    </div>
  );
};

export default function ConnectWallet({metamask}: any) {
  return metamask.isConnect ? <>
    <Accounts metamask={metamask} />
  </> : (
    <Button onClick={metamask.connectMetamask}>
      <>
        {metamask.loading && <i className="ri-more-fill"></i>}
        <h1>🦊 Connect Wallet</h1>
      </>
    </Button>
  );
}
