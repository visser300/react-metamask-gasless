import { ethers } from "ethers";
import chalk from "chalk";
import {
    BiconomySmartAccount,
    DEFAULT_ENTRYPOINT_ADDRESS,
  } from "@biconomy/account";
  import { Bundler } from "@biconomy/bundler";
  import { BiconomyPaymaster } from "@biconomy/paymaster";
import {
  IHybridPaymaster,
  PaymasterMode,
  SponsorUserOperationDto,
} from "@biconomy/paymaster";
import config from "./config.json";

export const approveTransaction = async (tokenId: number) => {

  // ------------------------STEP 1: Initialise Biconomy Smart Account SDK--------------------------------//  
  // get EOA address from wallet provider

	try {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
		await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    // create bundler and paymaster instances
    const bundler = new Bundler({
      bundlerUrl: config.bundlerUrl,
      chainId: config.chainId,
      entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
    });
  
    const paymaster = new BiconomyPaymaster({
      paymasterUrl: config.biconomyPaymasterUrl
    });
  
    // Biconomy smart account config
    // Note that paymaster and bundler are optional. You can choose to create new instances of this later and make account API use 
    const biconomySmartAccountConfig = {
      signer: signer,
      chainId: config.chainId,
      rpcUrl: config.rpcUrl,
      paymaster: paymaster, 
      bundler: bundler, 
    };
  
    // create biconomy smart account instance
    const biconomyAccount = new BiconomySmartAccount(biconomySmartAccountConfig);
  
    // passing accountIndex is optional, by default it will be 0. You may use different indexes for generating multiple counterfactual smart accounts for the same user
    const biconomySmartAccount = await biconomyAccount.init( {accountIndex: config.accountIndex} );
  
  
    // ------------------------STEP 2: Build Partial User op from your user Transaction/s Request --------------------------------//
    const nftInterface = new ethers.utils.Interface([
      "function approve(address, uint256)",
    ]);
  
    // Here we are minting NFT to smart account address itself
    const relayAddress = await biconomySmartAccount.getSmartAccountAddress();
    alert(relayAddress)
    const data = nftInterface.encodeFunctionData("approve", [relayAddress, tokenId]);
  
    const nftAddress = "0x506e924c0860f7282733ac10f3ce90872c7bb610";
    const transaction = {
      to: nftAddress.toLowerCase(),
      data: data,
    };
  
    let partialUserOp = await biconomySmartAccount.buildUserOp([transaction]);


    // ------------------------STEP 3: Get Paymaster and Data from Biconomy Paymaster --------------------------------//
    const biconomyPaymaster = biconomySmartAccount.paymaster as IHybridPaymaster<SponsorUserOperationDto>;
  
    // Here it is meant to act as Sponsorship/Verifying paymaster hence we send mode: PaymasterMode.SPONSORED which is must  
    let paymasterServiceData: SponsorUserOperationDto = {
          mode: PaymasterMode.SPONSORED,
          // optional params...
      };
  
      const paymasterAndDataResponse =
        await biconomyPaymaster.getPaymasterAndData(
          partialUserOp,
          paymasterServiceData
        );
        partialUserOp.paymasterAndData = paymasterAndDataResponse.paymasterAndData;
    
      // ------------------------STEP 4: Sign the UserOp and send to the Bundler--------------------------------//
    
      console.log(chalk.blue(`userOp: ${JSON.stringify(partialUserOp, null, "\t")}`));
    
      // Below function gets the signature from the user (signer provided in Biconomy Smart Account) 
      // and also send the full op to attached bundler instance
    
    const userOpResponse = await biconomySmartAccount.sendUserOp(partialUserOp);
    console.log(chalk.green(`userOp Hash: ${userOpResponse.userOpHash}`));
    const transactionDetails = await userOpResponse.wait();
    console.log(
      chalk.blue(
        `transactionDetails: ${JSON.stringify(transactionDetails, null, "\t")}`
      )
    );
	} catch (error) {
		console.log("Error ", error);
	}
};
