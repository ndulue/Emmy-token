import { createMint } from "@solana/spl-token"
import { Connection, PublicKey, clusterApiUrl, Keypair, Transaction, sendAndConfirmTransaction, LAMPORTS_PER_SOL } from "@solana/web3.js";
import "dotenv/config"
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";

//G9NhJ5jWg2NzNapnce8Uf26bgQbYPgM3d1bKDAHer1Jj pubkey
//8MLskpXeDMBFeRr9aJo9giBGKTFY1JFtC9AcqqRLJhoZ  addr

const conn = new Connection( clusterApiUrl('devnet'));
const user = getKeypairFromEnvironment("SECRET_KEY");


console.log("key pair loaded successfully");

const tokenMint = await createMint(conn, user, user.publicKey, null, 4);

const link = getExplorerLink("address", tokenMint.toString(), "devnet");

console.log(`Finished! Created token mint: ${link}`);









