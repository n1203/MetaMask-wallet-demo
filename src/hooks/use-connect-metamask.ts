/**
 * 链接metamask钱包
 * 参考文章：https://hicoldcat.com/posts/blockchain/how-to-build-a-web3-login-with-web3js-library/
 */
import { USER_WALLET_ADDRESS } from "@/const/localstorage";
import { useEffect, useMemo, useState } from "react";
import Web3 from "web3";
import ETHContract from "@/abi/ETH.json";

export function useConnectMetamask() {
  // 用户钱包地址集合
  const [addresses, setAddresses] = useState<string[]>([]);
  // 按钮loading状态
  const [loading, setLoading] = useState(false);
  // 用于钱包余额
  const [balance, setBalance] = useState("0");
  // 交易记录
  const [transaction, setTransaction] = useState([]);

  /**
   * 链接metamask钱包
   * @returns
   */
  const connectMetamask = async () => {
    // 检测是否安装metamask钱包
    if (!window.ethereum) return alert("请先安装metamask钱包");
    setLoading(true);
    try {
      // 请求用户授权 登录
      const selectedAddress = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAddresses((selectedAddress || []) as string[]);
      localStorage.setItem(
        USER_WALLET_ADDRESS,
        JSON.stringify(selectedAddress)
      );
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * 获取用户钱包余额
   * @param selectedAddress 获取用户钱包余额
   */
  const getBalance = async () => {
    const balance = await window.web3.eth.getBalance(addresses[0]);
    setBalance(window.web3.utils.fromWei(balance, "ether"));
  };

  /**
   * 最近交易记录
   */
  const getTransaction = async (address = addresses[0]) => {
    console.log("🚀 ~ file: use-connect-metamask.ts:59 ~ getTransaction ~ address:", address)
    const contract  = new window.web3.eth.Contract(ETHContract, address)
    const transaction = await contract.getPastEvents('allEvents')
    console.log("🚀 ~ file: use-connect-metamask.ts:61 ~ getTransaction ~ transaction:", transaction)
    setTransaction(transaction)
  };

  useEffect(() => {
    if (!addresses.length) return;
    getBalance();
    getTransaction();
    getGasPrice();
  }, [addresses]);

  /**
   * 退出metamask钱包
   */
  const disconnect = async () => {
    localStorage.removeItem(USER_WALLET_ADDRESS);
    setAddresses([]);
  };

  const getGasPrice = async () => {
    const gasPrice = await window.web3.eth.getGasPrice();
    console.log(gasPrice);
    // 解析
    const gasPriceWei = window.web3.utils.toWei(gasPrice, "gwei");
  }

  /**
   * 当前链接状态
   */
  const isConnect = useMemo(() => {
    return addresses.length > 0;
  }, [addresses]);

  useEffect(() => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
    }
    setAddresses(JSON.parse(localStorage.getItem(USER_WALLET_ADDRESS) || "[]"));
  }, []);

  return {
    loading,
    balance,
    transaction,
    addresses,
    isConnect,
    disconnect,
    connectMetamask,
    getTransaction,
  };
}
