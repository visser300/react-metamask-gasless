import { ethers } from "ethers";
import { Biconomy } from "@biconomy/mexa"
import  abi from "ethereumjs-abi"

// https://dashboard-gasless.biconomy.io/dapps/64e8b808789d876fc0b9b72d/overview
const apiKey = "w_qIeDGSN.8905473f-50ae-4418-84a9-58e9c3a79f51"
const apiId = "ddbd267f-c6d0-4b22-a88b-007a9216c6b0"
const apiUrl = 'https://api.biconomy.io/api/v2/meta-tx/native'

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"
const nftAddress = '0x311ce8F16FDFD83F27A2625b0780B06Fd6CB6293'
const biconomySystemInfo = 
{
  mumbai: {
    abi: [{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"domainSeparator","type":"bytes32"},{"indexed":false,"internalType":"bytes","name":"domainValue","type":"bytes"}],"name":"DomainRegistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"EIP712_DOMAIN_TYPE","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REQUEST_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"domains","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"txGas","type":"uint256"},{"internalType":"uint256","name":"tokenGasPrice","type":"uint256"},{"internalType":"uint256","name":"batchId","type":"uint256"},{"internalType":"uint256","name":"batchNonce","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"structERC20ForwardRequestTypes.ERC20ForwardRequest","name":"req","type":"tuple"},{"internalType":"bytes32","name":"domainSeparator","type":"bytes32"},{"internalType":"bytes","name":"sig","type":"bytes"}],"name":"executeEIP712","outputs":[{"internalType":"bool","name":"success","type":"bool"},{"internalType":"bytes","name":"ret","type":"bytes"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"txGas","type":"uint256"},{"internalType":"uint256","name":"tokenGasPrice","type":"uint256"},{"internalType":"uint256","name":"batchId","type":"uint256"},{"internalType":"uint256","name":"batchNonce","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"structERC20ForwardRequestTypes.ERC20ForwardRequest","name":"req","type":"tuple"},{"internalType":"bytes","name":"sig","type":"bytes"}],"name":"executePersonalSign","outputs":[{"internalType":"bool","name":"success","type":"bool"},{"internalType":"bytes","name":"ret","type":"bytes"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"uint256","name":"batchId","type":"uint256"}],"name":"getNonce","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"version","type":"string"}],"name":"registerDomainSeparator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"txGas","type":"uint256"},{"internalType":"uint256","name":"tokenGasPrice","type":"uint256"},{"internalType":"uint256","name":"batchId","type":"uint256"},{"internalType":"uint256","name":"batchNonce","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"structERC20ForwardRequestTypes.ERC20ForwardRequest","name":"req","type":"tuple"},{"internalType":"bytes32","name":"domainSeparator","type":"bytes32"},{"internalType":"bytes","name":"sig","type":"bytes"}],"name":"verifyEIP712","outputs":[],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"txGas","type":"uint256"},{"internalType":"uint256","name":"tokenGasPrice","type":"uint256"},{"internalType":"uint256","name":"batchId","type":"uint256"},{"internalType":"uint256","name":"batchNonce","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"structERC20ForwardRequestTypes.ERC20ForwardRequest","name":"req","type":"tuple"},{"internalType":"bytes","name":"sig","type":"bytes"}],"name":"verifyPersonalSign","outputs":[],"stateMutability":"view","type":"function"}],
    info: {"domainType":[{"name":"name","type":"string"},{"name":"version","type":"string"},{"name":"chainId","type":"uint256"},{"name":"verifyingContract","type":"address"}],"forwarderDomainType":[{"name":"name","type":"string"},{"name":"version","type":"string"},{"name":"verifyingContract","type":"address"},{"name":"salt","type":"bytes32"}],"metaInfoType":[{"name":"contractWallet","type":"address"}],"relayerPaymentType":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"}],"metaTransactionType":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"data","type":"bytes"},{"name":"batchId","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"expiry","type":"uint256"},{"name":"txGas","type":"uint256"},{"name":"baseGas","type":"uint256"},{"name":"value","type":"uint256"},{"name":"metaInfo","type":"MetaInfo"},{"name":"relayerPayment","type":"RelayerPayment"}],"loginDomainType":[{"name":"name","type":"string"},{"name":"version","type":"string"}],"loginMessageType":[{"name":"userAddress","type":"address"},{"name":"nonce","type":"uint256"},{"name":"providerId","type":"string"}],"loginDomainData":{"name":"Biconomy Login","version":"1"},"forwardRequestType":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"token","type":"address"},{"name":"txGas","type":"uint256"},{"name":"tokenGasPrice","type":"uint256"},{"name":"batchId","type":"uint256"},{"name":"batchNonce","type":"uint256"},{"name":"deadline","type":"uint256"},{"name":"data","type":"bytes"}],"daiPermitType":[{"name":"holder","type":"address"},{"name":"spender","type":"address"},{"name":"nonce","type":"uint256"},{"name":"expiry","type":"uint256"},{"name":"allowed","type":"bool"}],"eip2612PermitType":[{"name":"owner","type":"address"},{"name":"spender","type":"address"},{"name":"value","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"deadline","type":"uint256"}],"forwarderDomainData":{"name":"Biconomy Forwarder","version":"1","verifyingContract":"0x9399BB24DBB5C4b782C70c2969F58716Ebbd6a3b","salt":"0x0000000000000000000000000000000000000000000000000000000000013881"},"forwarderDomainDetails":{"0x9399BB24DBB5C4b782C70c2969F58716Ebbd6a3b":{"name":"Biconomy Forwarder","version":"1","verifyingContract":"0x9399BB24DBB5C4b782C70c2969F58716Ebbd6a3b","salt":"0x0000000000000000000000000000000000000000000000000000000000013881"},"0x5E7Cd3B22701b93D2972914eBF55EB98CB6D66dc":{"name":"Powered by Biconomy","version":"1","verifyingContract":"0x5E7Cd3B22701b93D2972914eBF55EB98CB6D66dc","salt":"0x0000000000000000000000000000000000000000000000000000000000013881"},"0x69015912AA33720b842dCD6aC059Ed623F28d9f7":{"name":"Biconomy Forwarder for The Sandbox :: This forwarder is used to let you pay gas fee in SAND rather than MATIC","version":"1","verifyingContract":"0x69015912AA33720b842dCD6aC059Ed623F28d9f7","salt":"0x0000000000000000000000000000000000000000000000000000000000013881"}},"relayHubAddress":"0x719163a7b59E8778bbaea47C3470A9e15A431497","biconomyForwarderAddress":"0x9399BB24DBB5C4b782C70c2969F58716Ebbd6a3b","biconomyForwarderAddresses":["0x9399BB24DBB5C4b782C70c2969F58716Ebbd6a3b","0x5E7Cd3B22701b93D2972914eBF55EB98CB6D66dc","0x69015912AA33720b842dCD6aC059Ed623F28d9f7"],"erc20ForwarderAddress":"0x0918849e8a4A42e6D17Cb1Fe890F0cB0D69B3866","oracleAggregatorAddress":"0x078672D52FEeB6F81d2c5063055d4f64EB4C2F2b","transferHandlerAddress":"0x078672D52FEeB6F81d2c5063055d4f64EB4C2F2b","daiTokenAddress":"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063","usdtTokenAddress":"0xc2132d05d31c914a87c6611c10748aeb04b58e8f","usdcTokenAddress":"0x2791bca1f2de4661ed88a30c99a7a9449aa84174","eip712Sign":"EIP712_SIGN","personalSign":"PERSONAL_SIGN","defaultMetaTransaction":"DEFAULT","trustedForwarderMetaTransaction":"TRUSTED_FORWARDER","erc20ForwarderMetaTransaction":"ERC20_FORWARDER","tokenGasPriceV1SupportedNetworks":[1,42,4,80001,137],"overHeadEIP712Sign":"20986","overHeadDaiPermit":"50731","overHeadEIP2612Permit":"53620","retryDuration":137,"walletFactoryAddress":"0x050bca32264195976Fe00BcA566B548413A9E658","baseWalletAddress":"0x056DcE811A2b695171274855E7246039Df298158","entryPointAddress":"0xF05217199F1C25604c67993F11a81461Bc97F3Ab","handlerAddress":"0xFc942E06c54d08502557FA40e1Aa23C5258132D5"}
  }
}
  

export const transferTransaction = async (tokenId: number) => {

	try {

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
		await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const myaddress = await signer.getAddress()

    const nftAddress = '0x311ce8F16FDFD83F27A2625b0780B06Fd6CB6293'
    const abi = [
      "function transferFrom(address, address, uint256)",
    ]

    const biconomy = new Biconomy(window.ethereum, {
          apiKey: apiKey,
          contractAddresses: [nftAddress],
          debug: true,
    });
    biconomy.onEvent(biconomy.READY, async () => {
      // Initialize your dapp here like getting user accounts etc
      const contract = new ethers.Contract(
          nftAddress,
          abi,
          biconomy.getSignerByAddress(myaddress)
      );
      await onSubmitWithPersonalSign(provider, biconomy, myaddress, contract, tokenId)
    }).onEvent(biconomy.ERROR, (error, message) => {
        // Handle error while initializing mexa
        console.log(message);
        console.log(error);
    });
//do something
	} catch (error) {
		console.log("Error ", error);
	}
};

const onSubmitWithPersonalSign = async (ethersProvider: ethers.providers.Web3Provider, biconomy: Biconomy, selectedAddress: string, contract: ethers.Contract, tokenId: number) => {
  if (contract) {
      console.log("Sending meta transaction");
      let userAddress = selectedAddress;

      let { data } = await contract.populateTransaction.transferFrom(userAddress.toLowerCase(), "0x7DFcAaC23908ed3fC1730560a86AE1d40784ebe9".toLowerCase(), tokenId)
      let gasPrice = await ethersProvider.getGasPrice();
      let gasLimit = await ethersProvider.estimateGas({
        to: nftAddress,
        from: userAddress,
        data: data,
      });
      console.log(gasLimit.toString());
      console.log(gasPrice.toString());

      let forwarder = await getBiconomyForwarderConfig(42);
      let forwarderContract = new ethers.Contract(
        forwarder.address,
        forwarder.abi,
        ethersProvider.getSigner()
      );

      const batchNonce = await forwarderContract.getNonce(userAddress, 0);
      console.log(batchNonce);
      const to = nftAddress;
      const gasLimitNum = Number(gasLimit.toNumber().toString());
      console.log(gasLimitNum);
      const batchId = 0;
      const req = await buildForwardTxRequest({
        account: userAddress,
        to,
        gasLimitNum,
        batchId,
        batchNonce,
        data,
      });
      console.log(req);

      const hashToSign = getDataToSignForPersonalSign(req);
      ethersProvider.getSigner().signMessage(hashToSign)
      .then(function(sig){
        console.log('signature ' + sig);
        sendTransaction({userAddress, request:req, sig, signatureType:"PERSONAL_SIGN"});
      })
      .catch(function(error) {
          console.log(error)
      });
  }
};

const sendTransaction = async ({userAddress, request, sig, signatureType}) => {
  let params = [request, sig];
  try {
    fetch(`${apiUrl}`, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        to: nftAddress,
        apiId: apiId,
        params: params,
        from: userAddress,
        signatureType: signatureType
      }),
    })
      .then((response) => response.json())
      .then(function(result) {
        console.log('****Transaction Hash: ' + result.txHash);
        return result.txHash;
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}

const getBiconomyForwarderConfig = async (networkId) => {
  const contractAddresses = await getContractAddresses();
  const forwarderAddress = contractAddresses.biconomyForwarderAddress;
  return {abi: biconomySystemInfo.mumbai.abi, address: forwarderAddress};
};

const getContractAddresses = async () => {
  /*
  const apiInfo = `${
          helperAttributes.baseURL
      }/api/v2/meta-tx/systemInfo?networkId=${networkId}`;
  */
  let contractAddresses = { biconomyForwarderAddress: "" };
  contractAddresses.biconomyForwarderAddress = biconomySystemInfo.mumbai.info.biconomyForwarderAddress;
  return contractAddresses;
};

const buildForwardTxRequest = async ({account, to, gasLimitNum, batchId, batchNonce, data}) => {
  const req = {
      from: account,
      to: to,
      token: ZERO_ADDRESS,
      txGas: gasLimitNum,
      tokenGasPrice: "0",
      batchId: parseInt(batchId),
      batchNonce: parseInt(batchNonce),
      deadline: Math.floor(Date.now() / 1000 + 3600),
      data: data
  };
  return req;
};

const getDataToSignForPersonalSign = (request) => {
  const hashToSign = abi.soliditySHA3([
      "address",
      "address",
      "address",
      "uint256",
      "uint256",
      "uint256",
      "uint256",
      "uint256",
      "bytes32",
  ], [
      request.from,
      request.to,
      request.token,
      request.txGas,
      request.tokenGasPrice,
      request.batchId,
      request.batchNonce,
      request.deadline,
      ethers.utils.keccak256(request.data),
  ]);
  return hashToSign;
}