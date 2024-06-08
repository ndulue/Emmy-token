import { createMint } from "@solana/spl-token"
import { Connection, PublicKey, clusterApiUrl, Keypair, Transaction, sendAndConfirmTransaction, LAMPORTS_PER_SOL } from "@solana/web3.js";
import "dotenv/config"
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";

//G9NhJ5jWg2NzNapnce8Uf26bgQbYPgM3d1bKDAHer1Jj pubkey
//8MLskpXeDMBFeRr9aJo9giBGKTFY1JFtC9AcqqRLJhoZ  addr
//metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s

const conn = new Connection( clusterApiUrl('devnet'));
const user = getKeypairFromEnvironment("SECRET_KEY");


console.log("key pair loaded successfully");

const TOKEN_METADATA_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

const tokenMintAccount = new PublicKey("8MLskpXeDMBFeRr9aJo9giBGKTFY1JFtC9AcqqRLJhoZ");

const metadataData = {
    name: "Emmy token",
    symbol: "Emmy",
    uri: "https://raw.githubusercontent.com/tr0n-xD/crypto-logos/master/bar-coin.png",
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null,
}

const metadataPDAAndBump = PublicKey.findProgramAddressSync(
    [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        tokenMintAccount.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
);

const metadataPDA = metadataPDAAndBump[0];
const transaction = new Transaction();

const createMetadataAccInstruction = createCreateMetadataAccountV3Instruction(
    {
        metadata: metadataPDA,
        mint: tokenMintAccount,
        mintAuthority: user.publicKey,
        payer: user.publicKey,
        updateAuthority: user.publicKey,
    },
    {
        createMetadataAccountArgsV3 : {
            collectionDetails: null,
            data: metadataData,
            isMutable: true
        },
    }
);

transaction.add(createMetadataAccInstruction);

const transactionSignature = await sendAndConfirmTransaction(
    conn,
    transaction,
    [user]
);

const transactionLink = getExplorerLink(
    "transaction",
    transactionSignature,
    "devnet"
);

console.log(`Transaction confirmed, and the link is: ${transactionLink}`);

const tokenMintLink = getExplorerLink(
    "address",
    tokenMintAccount.toString(),
    "devnet"
)

console.log(`token mint : ${tokenMintLink}`)









