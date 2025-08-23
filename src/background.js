browser.menus.create({
	id: "qr_code_selection",
	title: "QR Code from Selection",
	documentUrlPatterns: ["https://*/*", "http://*/*"],
	contexts: ["selection"]
})

browser.menus.create({
	id: "qr_code_link",
	title: "QR Code from Link",
	documentUrlPatterns: ["https://*/*", "http://*/*"],
	contexts: ["link"]
})

browser.menus.onClicked.addListener(async (info, tab) => {
    const query = new URLSearchParams();

    // tab id is always required when using setPopup
    query.set("tabId", tab.id)

	if (info.menuItemId === "qr_code_link") {
        query.set("qr", info.linkUrl);
        browser.pageAction.setPopup({
            tabId: tab.id,
            popup: "popup.html?" + query.toString()
        });
		browser.pageAction.openPopup();
	} else if (info.menuItemId === "qr_code_selection") {
        query.set("qr", info.selectionText);
        browser.pageAction.setPopup({
            tabId: tab.id,
            popup: "popup.html?" + query.toString()
        });
		browser.pageAction.openPopup();
	}
});
