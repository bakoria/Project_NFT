var provider = new ethers.providers.Web3Provider(window.ethereum);
let address = "0x078b342d7e19bb22e435a20bd533860ef91ce237";
let signer; 
let netWork;

async function Connect(){
		if (typeof window.ethereum !== "undefined") {
		  try {
			await ethereum.request({ method: "eth_requestAccounts" });
		  } catch (error) {
			console.log(error);
		  }
		  $("#connect").text("Connected");
          balance();
		} else {
		  $("#connect").text("Metamask not found");
		}
}

async function balance(){
signer = await provider.getSigner();
const adres = await signer.getAddress();
$("#accountAddress").text("Account Address: " + adres);
const bal = await signer.getBalance();
console.log("Account Balance:", ethers.utils.formatEther(bal));
$("#accountBalance").text("Account Balance: " + ethers.utils.formatEther(bal) + " ether");
netWork = await provider.getNetwork();
console.log("network: ", netWork);
$("#accountNetwork").text("Account Network: " + netWork.name);
//getLink();
//tokenID();
}

async function minting(){
	try{
	signer = await provider.getSigner();
	console.log("Account address:", await signer.getAddress());
	const contract = new ethers.Contract(address, abi, signer);	
	var cidlink = $("#cid").val();
	$("#txStatus").text("Transaction in progress...");
	const tx = await contract.connect(signer).mintNFT(cidlink);
	await tx.wait();
	console.log(tx);
	$("#txStatus").text("NFT Minted Sucessully");
	balance();
	getLink();
	}catch(err){$("#txStatus").text("Error Occurred...", alert(err.message))}
}

async function getLink(){
	var cidlink = $("#cid").val();
	console.log("cidlink :", cidlink);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
  		if (this.readyState == 4 && this.status == 200) {
    	var myObj = JSON.parse(this.responseText);
    	const link = myObj.image;
		const tkname = myObj.name;
		console.log("tkname :", tkname);
    	document.getElementById("imglink").src = link;
		$("#tkName").text("Token name :" + tkname);
  		}
	};
xmlhttp.open("GET", cidlink, true);
//xmlhttp.open("GET", "https://ipfs.io/ipfs/QmVnVzv6GudA1US1BGawha97Yv5t4UPH7cnT1ZoSvz8tES", true);
xmlhttp.send();
displayElement();
tokenID();
//https://ipfs.io/ipfs/QmVnVzv6GudA1US1BGawha97Yv5t4UPH7cnT1ZoSvz8tES
}


function displayElement() {
	var element = document.getElementById("display");
	if (element.style.display === "none") {
	  element.style.display = "block";
	} else {
	  element.style.display = "none";
	}
}

function tokenID() {
	const contract = new ethers.Contract(address, abi, provider);
	contract.gettotalNFT().then(function(tkId){
		console.log("tkId ", tkId);
		$("#tkID").text("Token ID: " + tkId);
	});
	$("#tkAddress").text("Token Address: " + address);
	$("#tkNetwork").text("Token Network: " + netWork.name);
}	