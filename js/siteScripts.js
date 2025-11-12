
function openNav() {
    HideAll("mySidenav");
    document.getElementById("mySidenav").style.left = "0px";

}

function closeNav() {
    var vpWidth = window.innerWidth;
    if (vpWidth > 640) {
        document.getElementById("mySidenav").style.left = "-250px";
    }
    else {
        document.getElementById("mySidenav").style.left = "-640px";
    }
}

function HideAll(divId) {
    switch (divId) {
        case 'collMenu':
            if (document.getElementById("allCat").style.display == "block") {
                $("#allCat").slideToggle("2000");
            }
            if (document.getElementById("mySidenav").style.left == "0px") {
                closeNav();
            }
            break;
        case 'allCat':
            if (document.getElementById("collMenu").style.display == "block") {
                $("#collMenu").slideToggle("2000");
            }
            if (document.getElementById("mySidenav").style.left == "0px") {
                closeNav();
            }
            break;
        case 'mySidenav':
            if (document.getElementById("allCat").style.display == "block") {
                $("#allCat").slideToggle("2000");
            }
            if (document.getElementById("collMenu").style.display == "block") {
                $("#collMenu").slideToggle("2000");
            }
            break;
    }
}

function ManageHeader() {
    
    var header = document.getElementById("header");
    var offerStrip = document.getElementById("offerStrip");
    var mainStrip = document.getElementById("mainStrip");
    var pageHeight = window.innerHeight;
    var sticky = header.offsetTop;
    var offerFlag = document.getElementById("offerFlag").value;
    var siteLogo = document.getElementById("logo");
    if (window.pageYOffset > sticky) {
        siteLogo.style.width = "200px";
        header.classList.add("is-sticky");
        mainStrip.classList.add("is-sticky");

        if (offerFlag == "1") {
            offerStrip.classList.add("is-sticky");
            header.setAttribute('style', 'top:45px !important');
            mainStrip.setAttribute('style', 'top:128px !important');
        }
        else {
            header.setAttribute('style', 'top:0 !important');
            mainStrip.setAttribute('style', 'top:84px !important');
        }
    } else {
        siteLogo.style.width = "250px";
        header.classList.remove("is-sticky");
        mainStrip.classList.remove("is-sticky");
        if (offerFlag == "1") {
            offerStrip.classList.remove("is-sticky");
            header.setAttribute('style', 'top:45px !important');
            mainStrip.setAttribute('style', 'top:143px !important');
        }
        else {
            header.setAttribute('style', 'top:0 !important');
            mainStrip.setAttribute('style', 'top:98px !important');
        }
    }
}

function waitAndMove(redirectPgName, delayTime) {
    setTimeout(function () { leaveMe(redirectPgName) }, delayTime);
}


// Redirect to requested url   
function leaveMe(redirectPgName) {
    window.location = redirectPgName;
}


function getElementArray(elementName, className) {
    var list = document.getElementsByTagName(elementName);
    var value = "";
    var myList = [];
    for (i = 0; i < list.length; i++) {
        n = list[i].className.search(className);
        if (n >= 0) {
            myList.push(list[i]);
        }
    }
    return myList;
}


function ProcessWishlist() {
    var appLink = getElementArray("div", "m-favorite");
    if (appLink.length > 0) {
        for (i = 0; i < appLink.length; i++) {
            appLink[i].onclick = function () {
                var id = $(this).attr('id');
                if (id != null) {
                    var prUrlArray = id.split('-');
                    eComServices.ProcessWishlist(prUrlArray[prUrlArray.length - 1], function (result) {
                        var arrResult = result.split('#');
                        var resultId = parseInt(arrResult[0]);
                        switch (resultId) {
                            case -1: //Error
                                toastr.error('Error occured while processing your request', 'Error');
                                window.setTimeout(function () {
                                    window.location = window.location.href;
                                }, 1000);
                                break;
                            case -2: //Error
                                toastr.error('Invalid attempt', 'Error');
                                window.setTimeout(function () {
                                    window.location = window.location.href;
                                }, 1000);
                                break;
                            case 0: //Session not active
                                toastr.warning('Please login', 'Warning');
                                var hostName = GetHostName();
                                waitAndMove(hostName + '/login', 2000);
                                break;
                            case 1: //Added to wishlist
                                document.getElementById(id).classList.add("-active");
                                document.getElementById("wlBtn").innerHTML = "<span class='count'>" + arrResult[1] + "</span>";
                                $('#wlBtn span').toggleClass('blink');
                                window.setTimeout(function () {
                                    $('#wlBtn span').toggleClass('blink');
                                }, 1000);

                                break;
                            case 2: //Removed from wishlist
                                document.getElementById(id).classList.remove("-active");
                                document.getElementById("wlBtn").innerHTML = "<span class='count'>" + arrResult[1] + "</span>";
                                $('#wlBtn span').toggleClass('blink');
                                window.setTimeout(function () {
                                    $('#wlBtn span').toggleClass('blink');
                                }, 1000);

                                break;
                        }
                    });
                    return false;
                }
            }
        }
    }

}


function ProcessCartDetails() {
    var appLink = getElementArray("a", "detCartAdd");
    if (appLink.length > 0) {
        for (i = 0; i < appLink.length; i++) {
            appLink[i].onclick = function () {
                var strUrl = this.href.split('/');
                var prIdX = strUrl[strUrl.length - 1];
                var platingChk = getElementArray("input", "platingAtDetails");
                var checkedPlating;
                for (j = 0; j < platingChk.length; j++) {
                    if (platingChk[j].checked) {
                        checkedPlating = platingChk[j].id;
                        break;
                    }
                }
                var arrPlatingId = checkedPlating.split('-');
                var newQty = document.getElementById('prId-' + prIdX).value;
                var sizeId = document.getElementById('size-' + prIdX).value;
                eComServices.UpdateCartDetails(prIdX, newQty, arrPlatingId[arrPlatingId.length - 1], sizeId, function (result) {
                    if (result == 0) {
                        toastr.error('Error occurred while processing', 'Error');
                        return false;
                    }
                    else if (result == -1) {
                        toastr.warning('Item already added in cart. You can change the quantity during checkout.', 'Warning');
                        return false;
                    }
                    else {

                        document.getElementById("cartBtn").innerHTML = "<span class='count'>" + result + "</span>";
                        $('#cartBtn span').toggleClass('blink');
                        window.setTimeout(function () {
                            $('#cartBtn span').toggleClass('blink');
                        }, 1000);
                        toastr.success('Item added in cart.', 'Success');

                        AddToCartPixel(prIdX, newQty);
                        GoogleAddToCart(prIdX, newQty);

                        return false;
                    }
                });
                return false;
            }
        }
    }
}

function ProcessBuyNow() {
    var appLink = getElementArray("a", "detBuyNow");
    if (appLink.length > 0) {
        for (i = 0; i < appLink.length; i++) {
            appLink[i].onclick = function () {
                var strUrl = this.href.split('/');
                var prIdX = strUrl[strUrl.length - 1];
                var platingChk = getElementArray("input", "platingAtDetails");
                var checkedPlating;
                for (j = 0; j < platingChk.length; j++) {
                    if (platingChk[j].checked) {
                        checkedPlating = platingChk[j].id;
                        break;
                    }
                }
                var arrPlatingId = checkedPlating.split('-');
                var newQty = document.getElementById('prId-' + prIdX).value;
                var sizeId = document.getElementById('size-' + prIdX).value;

                eComServices.UpdateCartDetails(prIdX, newQty, arrPlatingId[arrPlatingId.length - 1], sizeId, function (result) {
                    if (result == 0) {
                        toastr.error('Error occurred while processing', 'Error');
                        return false;
                    }
                    else if (result == -1) {
                        toastr.warning('Item already added in cart. You can change the quantity during checkout.', 'Warning');
                        return false;
                    }
                    else {

                        document.getElementById("cartBtn").innerHTML = "<span class='count'>" + result + "</span>";
                        $('#cartBtn span').toggleClass('blink');
                        window.setTimeout(function () {
                            $('#cartBtn span').toggleClass('blink');
                        }, 1000);
                        toastr.success('Item added in cart.', 'Success');
                        var hostName = GetHostName();
                        waitAndMove(hostName + '/checkout', 1000);
                    }
                });
                return false;
            }
        }
    }
}


//Details Page Item Quantity Numeric Control
//function ItemQuantityProcess() {
//    var qtyBoxes = getElementArray("input", "input-number");
//    if (qtyBoxes.length > 0) {
//        for (i = 0; i < qtyBoxes.length; i++) {
//            qtyBoxes[i].onclick = function () {
//                var arrProductIdStr = this.id.split('-');
//                var platingId = arrProductIdStr[arrProductIdStr.length - 1];
//                var productId = arrProductIdStr[arrProductIdStr.length - 2];

//                var newQty = document.getElementById('prqty-' + productId + "-" + platingId).value;
//                eComServices.UpdateItemQtyDetails(productId, platingId, newQty, function (result) {
//                    document.getElementById('price-' + productId + "-" +platingId).innerHTML = result;
//                    eComServices.GetCartTotal(function (resVal) {
//                        document.getElementById('grossTotal').innerHTML = "Rs. " + resVal;
//                        document.getElementById('payTotal').innerHTML = "Rs. " + resVal;
//                    });
//                    return false;
//                });
//            };
//        }
//    }
//}

function UpdateCartQty(prIdX, platIdX, nQtyX) {
    eComServices.UpdateItemQtyDetails(prIdX, platIdX, nQtyX, function (result) {
        document.getElementById('price-' + prIdX + "-" + platIdX).innerHTML = result;
        eComServices.GetCartTotal(function (resVal) {
            document.getElementById('grossTotal').innerHTML = "Rs. " + resVal;
            document.getElementById('payTotal').innerHTML = "Rs. " + resVal;
        });
        return false;
    });
}

function SearchProducts() {
    var qData = document.getElementById("inputSearch").value;
    if (qData != "") {
        var navUrl = "";
        qData = qData.toLowerCase();
        qData = qData.replace(" ", "-");
        navUrl = GetHostName();
        window.location = navUrl + "/search/" + qData;
    }
}

function RemoveWLItem() {
    var appLink = getElementArray("a", "delFrWl");
    if (appLink.length > 0) {
        for (i = 0; i < appLink.length; i++) {
            appLink[i].onclick = function () {
                var strUrl = this.href.split('/');
                var prIdX = strUrl[strUrl.length - 1];
                eComServices.RemoveFromWishlist(prIdX, function (result) {
                    switch (result) {
                        case -1: //Error
                            toastr.error('Error occured while processing your request', 'Error');
                            window.setTimeout(function () {
                                window.location = window.location.href;
                            }, 1000);
                            break;
                        case -2: //Error
                            toastr.error('Invalid attempt', 'Error');
                            window.setTimeout(function () {
                                window.location = window.location.href;
                            }, 1000);
                            break;
                        default:
                            toastr.success('Product removed from wishlist', 'Success');
                            window.setTimeout(function () {
                                window.location = window.location.href;
                            }, 1000);
                            break;
                    }
                });
                return false;
            }
        }
    }
}

function RemoveCartItem() {
    var appLink = getElementArray("a", "delFrWl");
    if (appLink.length > 0) {
        for (i = 0; i < appLink.length; i++) {
            appLink[i].onclick = function () {

                if (confirm('Are you sure you want to Remove this Product from Cart?')) {

                    var strUrl = this.href.split('/');
                    var platingId = strUrl[strUrl.length - 1];
                    var prIdX = strUrl[strUrl.length - 2];

                    eComServices.RemoveFromCart(prIdX, platingId, function (result) {
                        switch (result) {
                            case -1: //Error
                                toastr.error('Error occured while processing your request', 'Error');
                                window.setTimeout(function () {
                                    window.location = window.location.href;
                                }, 1000);
                                break;
                            case -2: //Error
                            case 0:
                                toastr.error('Invalid attempt', 'Error');
                                window.setTimeout(function () {
                                    window.location = window.location.href;
                                }, 1000);
                                break;

                            case 1: //Error
                                toastr.success('Product removed from wishlist', 'Success');
                                window.setTimeout(function () {
                                    window.location = window.location.href;
                                }, 1000);
                                break;
                        }
                    });
                }
                return false;
            }
        }
    }
}


function GetHostName() {
    if (window.location.href.indexOf("localhost") > -1) {
        return "http://" + window.location.host;
    }
    else {
        return "https://" + window.location.host;
    }
}


function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function CouponApply() {
    var btn = document.getElementById("cpnApply");
    btn.onclick = function () {
        var couponText = document.getElementById("txtCoupon").value;
        if (couponText == "") {
            toastr.warning('Enter Coupon Code or Proceed to Payment', 'Warning');
            return false;
        }
        eComServices.ValidateCopon(couponText, function (resultId) {

            var resArray = resultId.split('#');

            switch (resArray[0]) {
                case "-1":
                    toastr.error("'" + resArray[1] + "'", 'Error');
                    break;
                case "0":
                    toastr.warning('Invalid or Expired Coupon Code entered. ', 'Warning');
                    break;
                case "-2":
                    toastr.warning('Minimum purchase amount for this coupon is Rs. ' + resArray[1] , 'Warning');
                    break;
                default:
                    toastr.success('Coupon Code applied successfully.', 'Success');
                    /*document.getElementById('<%=txtCouponId.ClientID %>').value = resultId;*/
                    window.setTimeout(function () {
                        window.location = window.location.href;
                    }, 1000);
                    break;
            }
        });
        return false;
    }
}

