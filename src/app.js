const $text = document.querySelector("input");
const $qr = document.querySelector(".qr");
const $save = document.querySelector(".save");

function drawQr(text){
	let fg = "#2a2a2e";
	let bg = "#f9f9fa";

	const qr = new QRCode({
		content: text || "Hi :)",
		padding: 0,
		color: fg,
		background: bg,
		join: true,
		xmlDeclaration: false,
		container: "svg-viewbox"
	}).svg();

	$qr.innerHTML = qr;
	$save.href = "data:image/svg+xml;base64," + btoa(qr);
}

browser.tabs.query({currentWindow: true, active: true})
	.then(function onGot(tabInfo){
		const url = tabInfo[0].url;
		$text.value = url;
		drawQr(url);
	}, console.log);

$text.addEventListener("input", function(e){
	drawQr(this.value);
});

$text.addEventListener("focus", function(){
	this.select();
});
