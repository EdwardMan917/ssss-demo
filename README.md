## Shamir Secret Sharing Scheme Demo
   
Shamir's Secret Sharing (SSS) is an efficient secret sharing algorithm for distributing private information (the "secret") in such a way that no individual holds intelligible information about the secret. To achieve this, the secret is converted into parts (the "shares") from which the secret can be reassembled when a sufficient number of shares are combined but not otherwise. SSS has the unusual property of information theoretic security, meaning an adversary without enough shares cannot reconstruct the secret even with infinite time and computing capacity. A standard SSS specification for cryptocurrency wallets has been widely implemented. (Wiki [https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing])   
<br/>
This demo demonstrates how crypto wallet mnemonic phrase can be split into parts and restored using the key parts. For educational purpose, Google Identity Service and Google Drive API are integrated to upload key parts to Google Drive.
   

## Project Startup
```bash
yarn install
yarn run dev
```

## How to use
1. A Mnemonic Phrase is generated on load. Click on "Get New Phrase" if needed.
2. Click on "Get New Secrets" to generate key parts.
3. Copy the key parts and paste the parts on the text area on the right side. Please note that the parts have to be separated by space or newline.
4. The restored mneonic phrase will show up above the text area and green border will be on if the phrases match.
5. (Optional) Click on "Google Auth" to trigger Google SSO. It will ask for file CRUD permissions on your Google Drive.
6. (Optional) Click on "Upload" and the first key part will be uploaded to your Google Drive as txt named "keyPart.txt". 
   
## References
https://iancoleman.io/bip39/   
https://iancoleman.io/shamir/   
https://github.com/iancoleman/shamir   

