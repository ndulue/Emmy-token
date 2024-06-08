import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token"
import { Connection, PublicKey, clusterApiUrl, Keypair, Transaction, sendAndConfirmTransaction, LAMPORTS_PER_SOL } from "@solana/web3.js";
import "dotenv/config"
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";

//G9NhJ5jWg2NzNapnce8Uf26bgQbYPgM3d1bKDAHer1Jj pubkey
//8MLskpXeDMBFeRr9aJo9giBGKTFY1JFtC9AcqqRLJhoZ  addr

const conn = new Connection( clusterApiUrl('devnet'));
const user = getKeypairFromEnvironment("SECRET_KEY");


console.log("key pair loaded successfully");

const tokenMint = new PublicKey("8MLskpXeDMBFeRr9aJo9giBGKTFY1JFtC9AcqqRLJhoZ")

const reciever = user.publicKey;

const tokenAccount = await getOrCreateAssociatedTokenAccount(
    conn,
    user,
    tokenMint,
    reciever
)

console.log(`Token Account: ${tokenAccount.address.toBase58()}`);

const link = getExplorerLink(
    "address",
    tokenAccount.address.toBase58(),
    "devnet"
)

console.log(`Create token Account:  ${link}`);

//Token Account: 7z6k5qoaX6rGw1WMTxtg5wdSSZK3a73U3cTofkkRUKFQ