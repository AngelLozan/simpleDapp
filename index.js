
const ssAddress = 
'0xFa89405a70925723CdE5dE77992F65d46Fc03f6F';

// Now need to load the ABI (can make a seperate file to load it in) or can just make new const here: 

const ssABI = [
	{
		"inputs": [],
		"name": "retrieve",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "store",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

console.log("You can see the dapp running");

//Detect if metamask is installed.

//load only triggers after code all loaded up. So make sure to inject javascript <script> after code has loaded.
window.addEventListener('load', function() {
	if (typeof window.ethereum !== 'undefined') {
		console.log('Metamask Detected')
		let mmDetected = document.getElementById('mm-detected') //Gets the ID of the DIV by ID.
		mmDetected.innerHTML = "Metamask has been detected!" //Sends this to the ID of the DIV in the html doc.


	} else {
		console.log('Metamask no wallet availale')
		alert("Please install Metamask or another wallet.")

	}
})

const mmEnable = document.getElementById('mm-connect');

// Async because of nature of blockchain.
// arrow function because you use if nothing is returned by the function. Onclick takes a callback.

mmEnable.onclick = async () => {
	console.log('beep!')
	await ethereum.request({method:'eth_requestAccounts'}) //from the metamask docs. Function that takes place after the button is clicked.

//Now can run this after we got the accounts with the onclick await function above. To get the current account and prompt user to sign in
const mmCurrentAccount = document.getElementById('mm-current-account');
//Now populate a div with the account connected.
let mmAccountConnected = document.getElementById('mm-account-connected');
//Now can set the HTML of the div who's ID matches to the print out of their address
mmAccountConnected.innerHTML = "Here's your current account: " + ethereum.selectedAddress //Sends this to the ID of the DIV in the html doc.

//Allow the user to interact with the contract that we've deployed. 
// We compiled a contract on Remix then got the ABI. Choose a contract (we chose Storage.sol), go to deploy with injected web3, connect to MM, Go back to Compile and then ABI accessible at the bottom of right-side pane.
//ABI gives the smart contract methods are available to help us know what transactions to form on the user side
// Copy ABI from Remix
// Truffle allows you to compile and stores the ABIs in artifacts (in the build folder after compiling)
// Deploy to Ropsten
// Grabbed contract address after deployed then make const for simplicity
// Set the address and ABI as global scope variables at the top of the page

// ASIDE: Reading through the network can be done through infura. It's a synced node(s) so you don't have to host that (GETH!!!!! Arg)

// Need to import the web3 library. Can install the library from node or yarn (npm/yarn install)
// Can also add it as a library as a JS file that we can call (simple example) in the HTML file.
// Import the library: Download into the directory and then call it or just import it via the CDN.
// CDN allows you to download the package later when you load. (imported into the bottom of the body of index.)
// Now have access to connect to infura API endpoint or use web3JS to formulate the ethereum transaction. 
// This is the glue between Javascript to EVM world. Web3 packages JS input to readable to EVM (blockchain)


// You need an ABI to be able to submit a contract transaction via a user interface but then parse it to the blockchain. ABI bridges blockchain and frontend.

//Created button and input to submit a value


}

//Get button and get input, listen for event and do an async event to submit to metamask

const ssSubmit = document.getElementById('ss-input-button');
ssSubmit.onclick = async () => {
	// Get the value amount
	const ssValue = document.getElementById('ss-input-box').value;
	console.log(ssValue); //Just for debugging purposes
updateDisplay('Please wait to display value stored until this line indicates the "Number Updated!"');

//Instantiate web3

var web3= new Web3(window.ethereum);

//Instantiate contract and pass in ABI and contract address. 

const simpleStorage = new web3.eth.Contract(ssABI, ssAddress)

//web3 has wrapped itself around this constructor object above and now we can call the methods with the given inputs of the ABI and address.
//then you need to set the provider. Don't need to. 
// simpleStorage.setProvider(window.ethereum);
// Calling method given by ABI and web3 to store the value input
await simpleStorage.methods.store(ssValue).send({from: ethereum.selectedAddress}) //global thing that is injected by metamask. Wrap curly braces makes it Json object
updateDisplay('Number Updated! Please click the above button to show the value you stored');
}

const ssShowValue = document.getElementById('ss-show-value');
ssShowValue.onclick = async () => {
//Instantiate web3
var web3= new Web3(window.ethereum);
//Instantiate contract and pass in ABI and contract address. 
const simpleStorage = new web3.eth.Contract(ssABI, ssAddress)
//web3 has wrapped itself around this constructor object above and now we can call the methods with the given inputs of the ABI and address.
//then you need to set the provider. Don't need to. 
// simpleStorage.setProvider(window.ethereum);
// Calling method given by ABI and web3 to store the value input

const retrieve = await simpleStorage.methods.retrieve().call({from: ethereum.selectedAddress})
updateDisplay(`Number set: ${retrieve}`)
}

function updateDisplay(status) {
    const displayEl = document.getElementById('display');
    displayEl.innerHTML = status;
    console.log(status);
}







