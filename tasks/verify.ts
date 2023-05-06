import { utils } from "ethers";

import { task } from "hardhat/config";
import { join } from "path";

task("etherscan-verify", "verify").setAction(async ({}, hre) => {
  await hre.run("verify:verify", {
    address: "0x4C1b1Ae4b671d7a778dCDdCdC62A14940ec438BA",
    constructorArguments: ["0xcc53666e25BF52C7c5Bc1e8F6E1F6bf58E871659", "0xff1a0f4744e8582DF1aE09D5611b887B6a12925C"],
  });
});
