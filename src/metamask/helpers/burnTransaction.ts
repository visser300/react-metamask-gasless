import { ethers } from "ethers";
import { Biconomy } from "@biconomy/mexa"

let config = {
    contract: {},
    baseURL: '',
};

config.baseURL = "https://api.biconomy.io";

let helperAttributes = {
    ZERO_ADDRESS: '',
    baseURL: '',
    biconomyForwarderAbi: [],
    biconomyForwarderDomainData: {
        salt: '',
        verifyingContract: {},
        name: '',
        version: ''
    },
    domainType: [],
    forwardRequestType: [],
    biconomyForwarderAddress: {},
};
helperAttributes.ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
//todo
//update baseURL in config for prod 
helperAttributes.baseURL = config.baseURL;
// any other constants needed goes in helperAttributes

helperAttributes.biconomyForwarderAbi = [{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"domainSeparator","type":"bytes32"},{"indexed":false,"internalType":"bytes","name":"domainValue","type":"bytes"}],"name":"DomainRegistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"EIP712_DOMAIN_TYPE","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REQUEST_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"domains","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"txGas","type":"uint256"},{"internalType":"uint256","name":"tokenGasPrice","type":"uint256"},{"internalType":"uint256","name":"batchId","type":"uint256"},{"internalType":"uint256","name":"batchNonce","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"structERC20ForwardRequestTypes.ERC20ForwardRequest","name":"req","type":"tuple"},{"internalType":"bytes32","name":"domainSeparator","type":"bytes32"},{"internalType":"bytes","name":"sig","type":"bytes"}],"name":"executeEIP712","outputs":[{"internalType":"bool","name":"success","type":"bool"},{"internalType":"bytes","name":"ret","type":"bytes"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"txGas","type":"uint256"},{"internalType":"uint256","name":"tokenGasPrice","type":"uint256"},{"internalType":"uint256","name":"batchId","type":"uint256"},{"internalType":"uint256","name":"batchNonce","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"structERC20ForwardRequestTypes.ERC20ForwardRequest","name":"req","type":"tuple"},{"internalType":"bytes","name":"sig","type":"bytes"}],"name":"executePersonalSign","outputs":[{"internalType":"bool","name":"success","type":"bool"},{"internalType":"bytes","name":"ret","type":"bytes"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"uint256","name":"batchId","type":"uint256"}],"name":"getNonce","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"version","type":"string"}],"name":"registerDomainSeparator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"txGas","type":"uint256"},{"internalType":"uint256","name":"tokenGasPrice","type":"uint256"},{"internalType":"uint256","name":"batchId","type":"uint256"},{"internalType":"uint256","name":"batchNonce","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"structERC20ForwardRequestTypes.ERC20ForwardRequest","name":"req","type":"tuple"},{"internalType":"bytes32","name":"domainSeparator","type":"bytes32"},{"internalType":"bytes","name":"sig","type":"bytes"}],"name":"verifyEIP712","outputs":[],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"txGas","type":"uint256"},{"internalType":"uint256","name":"tokenGasPrice","type":"uint256"},{"internalType":"uint256","name":"batchId","type":"uint256"},{"internalType":"uint256","name":"batchNonce","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"structERC20ForwardRequestTypes.ERC20ForwardRequest","name":"req","type":"tuple"},{"internalType":"bytes","name":"sig","type":"bytes"}],"name":"verifyPersonalSign","outputs":[],"stateMutability":"view","type":"function"}];

helperAttributes.biconomyForwarderDomainData = {
    name : "Biconomy Forwarder", 
    version : "1",
    verifyingContract : {},
    salt : ''
  };

helperAttributes.domainType = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "verifyingContract", type: "address" },
    { name: "salt", type: "bytes32" },
  ];

helperAttributes.forwardRequestType = [
    {name:'from',type:'address'},
    {name:'to',type:'address'},
    {name:'token',type:'address'},
    {name:'txGas',type:'uint256'},
    {name:'tokenGasPrice',type:'uint256'},
    {name:'batchId',type:'uint256'},
    {name:'batchNonce',type:'uint256'},
    {name:'deadline',type:'uint256'},
    {name:'data',type:'bytes'}
];

// pass the networkId to get contract addresses
const getContractAddresses = async (networkId) => {
    let contractAddresses = {
        biconomyForwarderAddress: {}
    };
    const apiInfo = `${
        helperAttributes.baseURL
    }/api/v2/meta-tx/systemInfo?networkId=${networkId}`;
    const response = await fetch(apiInfo);
    const systemInfo = await response.json();
    console.log("Response JSON " + JSON.stringify(systemInfo));
    contractAddresses.biconomyForwarderAddress = systemInfo.biconomyForwarderAddress;
    return contractAddresses;
  };

/**
 * Returns ABI and contract address based on network Id
 * You can build biconomy forwarder contract object using above values and calculate the nonce
 * @param {*} networkId 
 */
const getBiconomyForwarderConfig = async (networkId) => {
        //get trusted forwarder contract address from network id
        const contractAddresses = await getContractAddresses(networkId);
        const forwarderAddress = contractAddresses.biconomyForwarderAddress;
        return {abi: helperAttributes.biconomyForwarderAbi, address: forwarderAddress};
};

/**
 * pass the below params in any order e.g. account=<account>,batchNone=<batchNone>,...
 * @param {*}  account - from (end user's) address for this transaction 
 * @param {*}  to - target recipient contract address
 * @param {*}  gasLimitNum - gas estimation of your target method in numeric format
 * @param {*}  batchId - batchId 
 * @param {*}  batchNonce - batchNonce which can be verified and obtained from the biconomy forwarder
 * @param {*}  data - functionSignature of target method
 * @param {*}  deadline - optional deadline for this forward request 
 */
const buildForwardTxRequest = async ({account, to, gasLimitNum, batchId, batchNonce, data, deadline}) => {
    const req = {
        from: account,
        to: to,
        token: helperAttributes.ZERO_ADDRESS,
        txGas: gasLimitNum,
        tokenGasPrice: "0",
        batchId: parseInt(batchId),
        batchNonce: parseInt(batchNonce),
        deadline: deadline || Math.floor(Date.now() / 1000 + 3600),
        data: data
    };
    return req;
};

/**
 * pass your forward request and network Id 
 * use this method to build message to be signed by end user in EIP712 signature format 
 * @param {*} request - forward request object
 * @param {*} networkId 
 */
const getDataToSignForEIP712 = async (request,networkId) => {
    const contractAddresses = await getContractAddresses(networkId);
    const forwarderAddress = contractAddresses.biconomyForwarderAddress;
    let domainData = helperAttributes.biconomyForwarderDomainData;
    domainData.salt = ethers.utils.hexZeroPad((ethers.BigNumber.from(networkId)).toHexString(), 32);
    domainData.verifyingContract = forwarderAddress;

    const dataToSign = JSON.stringify({
        types: {
            EIP712Domain: helperAttributes.domainType,
            ERC20ForwardRequest: helperAttributes.forwardRequestType
        },
        domain: domainData,
        primaryType: "ERC20ForwardRequest",
        message: request
    });
    return dataToSign;
}

/**
 * get the domain seperator that needs to be passed while using EIP712 signature type
 * @param {*} networkId 
 */
const getDomainSeperator = async (networkId) => {
    const contractAddresses = await getContractAddresses(networkId);
    const forwarderAddress = contractAddresses.biconomyForwarderAddress;
    let domainData = helperAttributes.biconomyForwarderDomainData;
    domainData.salt = ethers.utils.hexZeroPad((ethers.BigNumber.from(networkId)).toHexString(), 32);
    domainData.verifyingContract = forwarderAddress;

    const domainSeparator = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode([
        "bytes32",
        "bytes32",
        "bytes32",
        "address",
        "bytes32"
    ], [
        ethers.utils.id("EIP712Domain(string name,string version,address verifyingContract,bytes32 salt)"),
        ethers.utils.id(domainData.name),
        ethers.utils.id(domainData.version),
        domainData.verifyingContract,
        domainData.salt,
    ]));
    return domainSeparator;
};

// https://dashboard-gasless.biconomy.io/dapps/64e8b808789d876fc0b9b72d/overview
const apiKey = "w_qIeDGSN.8905473f-50ae-4418-84a9-58e9c3a79f51"
const apiId = "729b05e4-2e2a-4e9e-8647-ae4d338c9a40"
const apiUrl = 'https://api.biconomy.io/api/v2/meta-tx/native'
const nftAddress = '0x68755eff321524fF157E402b1d4dbA95e32d4B4f'

export const burnTransaction = async (tokenId: number) => {

	try {

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
		await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const myaddress = await signer.getAddress()

    const nftAddress = '0x68755eff321524fF157E402b1d4dbA95e32d4B4f'
    const abi = [
      "function bulkBurn(uint256[])",
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

      let { data } = await contract.populateTransaction.bulkBurn([tokenId])
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
        '0x9399BB24DBB5C4b782C70c2969F58716Ebbd6a3b',
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
        deadline: null
      });
      console.log(req);

      const domainSeparator = await getDomainSeperator(80001);
      const dataToSign = await getDataToSignForEIP712(req, 80001);

      ethersProvider
            .send("eth_signTypedData_v3", [userAddress, dataToSign])
            .then(function (sig) {
              sendTransaction({
                userAddress,
                request:req,
                domainSeparator,
                sig,
                signatureType: "EIP712_SIGN",
              });
            })
            .catch(function (error) {
              console.log(error);
            });
  }
};

const sendTransaction = async ({userAddress, request, sig, domainSeparator, signatureType}) => {
  let params;
    if (domainSeparator) {
      params = [request, domainSeparator, sig];
    } else {
      params = [request, sig];
    }
    try {
      fetch(apiUrl, {
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
          console.log(result);
          return result.txHash;
          // todo - fetch mined transaction receipt, show tx confirmed and update quotes
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
};