import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token"
import { Connection, PublicKey, clusterApiUrl, Keypair, Transaction, sendAndConfirmTransaction, LAMPORTS_PER_SOL } from "@solana/web3.js";
import "dotenv/config"
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";

//G9NhJ5jWg2NzNapnce8Uf26bgQbYPgM3d1bKDAHer1Jj pubkey
//8MLskpXeDMBFeRr9aJo9giBGKTFY1JFtC9AcqqRLJhoZ  addr

const conn = new Connection( clusterApiUrl('devnet'));
const user = getKeypairFromEnvironment("SECRET_KEY");

console.log("key pair loaded successfully");

const reciever = new PublicKey("2Heynme5j9qJEXsZfDfERM4Z7q8jZyywmFT4MavGp2mK");

const tokenMint = new PublicKey("8MLskpXeDMBFeRr9aJo9giBGKTFY1JFtC9AcqqRLJhoZ");

const UNITS = Math.pow(10, 1);

console.log(`Attempting to send 10 tokens to ${reciever.toBase58()}...`);

const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
    conn,
    user,
    tokenMint,
    user.publicKey
);

const destinationTokenAccount = await getOrCreateAssociatedTokenAccount(
    conn,
    user,
    tokenMint,
    reciever
);

const signature = await transfer(
    conn,
    user,
    sourceTokenAccount.address,
    destinationTokenAccount.address,
    user,
    10 * UNITS
);


const link = getExplorerLink(
    "transaction",
    signature,
    "devnet"
);

console.log(`Transaction confirmed, and the link is ${link}`);