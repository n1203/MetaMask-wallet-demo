/**
 * 链接metamask钱包
 * 参考文章：https://hicoldcat.com/posts/blockchain/how-to-build-a-web3-login-with-web3js-library/
 */
import { useEffect, useMemo, useState } from "react";
import { MetaMaskSDK } from '@metamask/sdk';

export function useConnectMetamask() {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);
    const MMSDK = new MetaMaskSDK({
        dappMetadata: {
            name: 'My Dapp',
        }
    });
    const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum

    /**
     * 链接metamask钱包
     * @returns 
     */
    const connectMetamask = async () => {
        setLoading(true);
        try {
            // @ts-ignore
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setAddresses(accounts || []);
            setLoading(false);
        }
        catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    /**
     * 获取钱包地址
     */
    const getAccount = async () => {
        try {
            // @ts-ignore
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            // @ts-ignore
            setAddresses(accounts || []);
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * 断开链接
     */
    const disconnect = async () => {
        const ddd = await ethereum?.request({ method: 'eth_clearAccounts' });
        console.log("🚀 ~ file: use-connect-metamask.ts:55 ~ disconnect ~ ddd:", ddd)
        // setAddresses([]);
    }

    /**
     * 是否链接钱包
     */
    const isConnect = useMemo(() => {
        return addresses.length > 0;
    }, [addresses])

    useEffect(() => {
        getAccount();
    }, [])

    return {
        loading,
        addresses,
        isConnect,
        connectMetamask,
        disconnect,
    }
}