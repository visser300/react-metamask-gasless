import { RelayProvider } from '@opengsn/provider'
import { ethers } from "ethers";

export const transferTransaction = async (tokenId: number) => {

	try {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
		await provider.send("eth_requestAccounts", []);

    const gsnProvider = RelayProvider.newProvider({provider: provider, config: {
      paymasterAddress: "0x557Bd851644c58B494aa9cf6103C92F9f0A7Ef12",
      loggerConfiguration: {logLevel: 'error'}
    }})
    await gsnProvider.init()

    const abi = [
      "function transferFrom(address, address, uint256)",
    ]

    const nftAddress = '0x311ce8F16FDFD83F27A2625b0780B06Fd6CB6293'
    const signer = provider.getSigner();
    const myaddress = await signer.getAddress()

    const relayProvider = new ethers.providers.Web3Provider(gsnProvider)
    const nft = new ethers.Contract(nftAddress, abi, relayProvider.getSigner())
    relayProvider.registerEventListener((event) => {

    }, 'gsn')

    nft.transferFrom(myaddress.toLowerCase(), "0x7DFcAaC23908ed3fC1730560a86AE1d40784ebe9".toLowerCase(), tokenId)
	} catch (error) {
		console.log("Error ", error);
	}
};

