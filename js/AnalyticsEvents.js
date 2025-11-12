
function GA4ItemView(contentName, contentID, contentValue, contentCategory) {

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('config', 'G-65PBZH57RT');

    gtag("event", "view_item", {
        currency: "INR",
        value: contentValue,
        items: [
            {
                item_id: "'" +  contentID + "'",
                item_name: "'" + contentName + "'",
                item_brand: "Toral Jewels",
                item_category: "'" + contentCategory + "'",
                price: contentValue
            }
        ]
    });
}


function GoogleAddToCart(prIdX, newQty) {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('config', 'G-65PBZH57RT');

    eComServices.GetCartPixelDetails(prIdX, newQty, function (result) {
        var arrData = result.split('#');

        gtag("event", "add_to_cart", {
            currency: "INR",
            value: arrData[7],
            items: [
                {
                    item_id: "'" + arrData[6] + "'",
                    item_name: "'" + arrData[5] + "'",
                    item_brand: "Toral Jewels",
                    price: arrData[7],
                    quantity: newQty
                }
            ]
        });

    });
}


function PurchaseCompleteGoogle(trxIDDev, contentValue, jsonStr ) {
    window.dataLayer = window.dataLayer || [];
    //console.log(jsonStr);

    var myObject = JSON.parse(jsonStr);

    function gtag() { dataLayer.push(arguments); }
    gtag('config', 'G-65PBZH57RT');

    gtag("event", "purchase", {
        transaction_id: "'" + trxIDDev +"'" ,
        value: contentValue,
        currency: "INR",
        items: [
            myObject
        ]
    });
}

function GoogleCheckout() {
    $.ajax({
        type: "POST",
        url: "../WebServices/eComServices.asmx/GetCartItemsForGA4",
        data: "",
        contentType: "application/json; charset=utf-8",
        success: SuccessValue,
        dataType: "json",
        failure: ajaxCallFailed
    });
}
function SuccessValue(response) {
    var result = response.d;
    if (result == "") {
        return false;
    }
    else {
        var arrResult = result.split('#');
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('config', 'G-65PBZH57RT');
        gtag("event", "begin_checkout", {
            debug_mode: true,
            currency: "INR",
            value: parseFloat(arrResult[0]),
            items: [
                {
                    item_id: "'" + arrResult[1] + "'",
                    item_name: "'" + arrResult[2] + "'",
                    item_brand: "Toral Jewels",
                    price: parseFloat(arrResult[0])
                }
            ]
        });
    }
}
function ajaxCallFailed(error) {

}