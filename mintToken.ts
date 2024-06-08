import { mintTo } from "@solana/spl-token"
import { Connection, PublicKey, clusterApiUrl, Keypair, Transaction, sendAndConfirmTransaction, LAMPORTS_PER_SOL } from "@solana/web3.js";
import "dotenv/config"
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";

//G9NhJ5jWg2NzNapnce8Uf26bgQbYPgM3d1bKDAHer1Jj pubkey
//8MLskpXeDMBFeRr9aJo9giBGKTFY1JFtC9AcqqRLJhoZ  addr

const conn = new Connection( clusterApiUrl('devnet'));

const UNITS = Math.pow(10, 5);

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log("key pair loaded successfully");

const tokenMint = new PublicKey("8MLskpXeDMBFeRr9aJo9giBGKTFY1JFtC9AcqqRLJhoZ");

const recieverATA = new PublicKey("7z6k5qoaX6rGw1WMTxtg5wdSSZK3a73U3cTofkkRUKFQ");

const transactionSignature = await mintTo(
    conn,
    user,
    tokenMint,
    recieverATA,
    user,
    10 * UNITS
);

const link = getExplorerLink(
    "transaction",
    transactionSignature,
    "devnet"
)

console.log(`Mint token transaction: ${link}`); 