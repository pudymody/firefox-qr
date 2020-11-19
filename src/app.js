const $text = document.querySelector("input");
const $qr = document.querySelector(".qr");

function drawQr(text){
	let fg = "#2a2a2e";
	let bg = "#f9f9fa";

	const isDark = matchMedia("(prefers-color-scheme: dark)");
	if( isDark.matches ){
		fg = "#f9f9fa";
		bg = "#2a2a2e";
	}

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
}

browser.tabs.query({currentWindow: true, active: true})
	.then(function onGot(tabInfo){
		const url = tabInfo[0].url;
		$text.value = url;
		$text.select();
		drawQr(url);
	}, console.log);

$text.addEventListener("input", function(e){
	drawQr(this.value);
});
