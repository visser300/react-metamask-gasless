import { RelayProvider } from '@opengsn/provider'
import { ethers } from "ethers";

export const transferTransaction = async (tokenId: number) => {

  // ------------------------STEP 1: Initialise Biconomy Smart Account SDK--------------------------------//  
  // get EOA address from wallet provider

	try {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
		const accounts = await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const gsnProvider = RelayProvider.newProvider({provider: provider, config: {
      paymasterAddress: "0x9556Ed604af122011cE6fe2035661E6e1ECb340D"
    }})
    await gsnProvider.init()

    const abi = [
      "function transferFrom(address, address, uint256)",
    ]
    // Here we are minting NFT to smart account address itself
    const myaddress = await signer.getAddress();
    const etherProvider = new ethers.providers.Web3Provider(gsnProvider)
    const nft = new ethers.Contract('0x311ce8F16FDFD83F27A2625b0780B06Fd6CB6293', abi, etherProvider.getSigner(accounts[0]));
    await nft.transferFrom(myaddress.toLowerCase(), "0x7DFcAaC23908ed3fC1730560a86AE1d40784ebe9".toLowerCase(), tokenId)
	} catch (error) {
		console.log("Error ", error);
	}
};

