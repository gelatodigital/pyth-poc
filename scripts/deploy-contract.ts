/* eslint-disable @typescript-eslint/naming-convention */
import hre from "hardhat";
import { GelatoOpsSDK, isGelatoOpsSupported, TaskTransaction, Web3Function } from "@gelatonetwork/ops-sdk";
import { throws } from "assert";

async function main() {
  const chainId = hre.network.config.chainId as number;

  // Init GelatoOpsSDK
  const [signer] = await hre.ethers.getSigners();

  console.log(signer.address);

  const gelatoOps = new GelatoOpsSDK(80001, signer);
  const dedicatedMsgSender = await gelatoOps.getDedicatedMsgSender();
  console.log(`Dedicated msg.sender: ${dedicatedMsgSender.address} is deployed ${dedicatedMsgSender.isDeployed}`);

  let nonce = await signer.getTransactionCount();

  const MumbaiSmartOracle = "0xff1a0f4744e8582DF1aE09D5611b887B6a12925C";

  // Deploying NFT contract
  const SmartOracle = await hre.ethers.getContractFactory("SmartOracle", signer);
  console.log("Deploying Smart Contract Oracle...");
  const smartOracle = await SmartOracle.deploy(dedicatedMsgSender.address, MumbaiSmartOracle, {
    nonce,
    gasPrice: 190000000000,
    gasLimit: 10000000,
  });
  await smartOracle.deployed();
  //

  await signer.sendTransaction({ to: smartOracle.address, value: 5000, gasLimit: 10000000 });

  console.log(`Smart Contract deployed to: ${smartOracle.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
