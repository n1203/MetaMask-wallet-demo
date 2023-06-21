/**
 * 链接metamask钱包
 * 参考文章：https://hicoldcat.com/posts/blockchain/how-to-build-a-web3-login-with-web3js-library/
 */
import { useEffect, useMemo, useState } from "react";
import Web3 from "web3";

export function useConnectMetamask() {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);

    const connectMetamask = async () => {
        setLoading(true);
        // @ts-ignore
        try {
            // @ts-ignore
            if (window.ethereum) {
                // @ts-ignore
                window.web3 = new Web3(window.ethereum);
                // @ts-ignore
                await window.ethereum.enable();
                getAccount();
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            setLoading(false);
        }
    }

    const getAccount = async () => {
        try {
            // @ts-ignore
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            setAddresses(accounts || []);
            // const address = await window.ethereum.request({ method: 'eth_requestAccounts' });
            // setAddresses(address || []);
        } catch (error) {
            console.error(error);
        }
    }

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
        connectMetamask
    }
}