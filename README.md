# eHalalan

eHalalan is a decentralized election system using blockchain.

## Project Structure

```
apps/
├── smart-contracts/  # Solidity smart contracts managed with Hardhat
├── web/              # Next.js frontend
```

## Tech Stack

- **Smart Contracts**:
  - [Solidity](https://soliditylang.org/)
  - [Hardhat](https://hardhat.org/)
- **Frontend**:
  - [Next.js](https://nextjs.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [shadcn components](https://ui.shadcn.com/)
- **Backend**:
  - [Firebase](https://firebase.google.com/docs/)
- **Wallet & Web3 Integration**:
  - [MetaMask](https://metamask.io/)
  - [ethers.js](https://docs.ethers.org/)

## Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/eHalalan/ehalalan.git
cd ehalalan
```

### Smart Contracts Setup

```sh
cd apps/smart-contracts
npm install
npx hardhat compile
```

### Frontend Setup

```sh
cd ../web
npm install
npm run dev
```

## Usage

### Smart Contracts

```sh
cd apps/smart-contracts
npx hardhat node
npx hardhat run scripts/deploy.ts --network localhost
```

### Frontend

```sh
cd apps/web
npm run dev
```

If using VS Code, you can run the tasks via the command palette or `Ctrl + Shift + B`.

## Contributing

1. Clone the repository.
2. Create a new branch.
3. Make changes and commit.
4. Submit a pull request.
