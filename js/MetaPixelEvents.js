function ViewContents(eventTime, eventSourceUrl, emailHash, phoneHash, nameHash, clientIP, userAgent, contentName, contentID) {
    //alert("test");
    !function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () {
            n.callMethod ?
                n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
        n.queue = []; t = b.createElement(e); t.async = !0;
        t.src = v; s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s)
    }(window, document, 'script',
        'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1236757914375042');
    /*fbq('track', 'PageView');*/

    fbq('track', 'ViewContent', {
        event_name: "ViewContent",
        event_time: eventTime,
        action_source: "website",
        event_id: "vc1",
        event_source_url: "'" + eventSourceUrl + "'",
        user_data: {
            em: [
                "'" + emailHash + "'"
            ],
            ph: [
                "'" + phoneHash + "'"
            ],
            fn: [
                "'" + nameHash + "'"
            ],
            client_ip_address: "'" + clientIP + "'",
            client_user_agent: "'" + userAgent + "'"
        },
        custom_data: {
            content_name: "'" + contentName + "'",
            content_ids: "'" + contentID + "'"
        }
    });
}

function AddToCartPixel(productId, productQty) {
    !function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () {
            n.callMethod ?
                n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
        n.queue = []; t = b.createElement(e); t.async = !0;
        t.src = v; s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s)
    }(window, document, 'script',
        'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1236757914375042');

    
    eComServices.GetCartPixelDetails(productId, productQty, function (result) {
        var arrData = result.split('#');
        fbq('track', 'AddToCart', {
            event_name: "AddToCart",
            event_time: arrData[0],
            action_source: "website",
            event_id: "atc1",
            event_source_url: "'" + window.location.href + "'",
            user_data: {
                em: [
                    "'" + arrData[1] + "'"
                ],
                ph: [
                    "'" + arrData[2] + "'"
                ],
                fn: [
                    "'" + arrData[3] + "'"
                ],
                client_ip_address: "'" + arrData[4] + "'",
                client_user_agent: "'" + navigator.userAgent + "'"
            },
            custom_data: {
                content_name: "'" + arrData[5] + "'",
                content_ids: "'" + arrData[6] + "'",
                num_items: productQty,
                value: arrData[7],
                currency: "INR"
            }

        });

    });

    
}

function CheckoutProcessPixel(eventTime, eventSourceUrl, emailHash, phoneHash, nameHash, clientIP, userAgent, cartValue) {
    !function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () {
            n.callMethod ?
                n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
        n.queue = []; t = b.createElement(e); t.async = !0;
        t.src = v; s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s)
    }(window, document, 'script',
        'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1236757914375042');
    /*fbq('track', 'PageView');*/

    fbq('track', 'InitiateCheckout', {
        event_name: "InitiateCheckout",
        event_time: eventTime,
        action_source: "website",
        event_id: "ico1",
        event_source_url: "'" + eventSourceUrl + "'",
        user_data: {
            em: [
                "'" + emailHash + "'"
            ],
            ph: [
                "'" + phoneHash + "'"
            ],
            fn: [
                "'" + nameHash + "'"
            ],
            client_ip_address: "'" + clientIP + "'",
            client_user_agent: "'" + userAgent + "'"
        },
        custom_data: {
            currency: "INR",
            value: cartValue
        }
    });
}

function PurchaseCompletePixel(eventTime, eventSourceUrl, emailHash, phoneHash, nameHash, clientIP, userAgent, cartValue) {
    !function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () {
            n.callMethod ?
                n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
        n.queue = []; t = b.createElement(e); t.async = !0;
        t.src = v; s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s)
    }(window, document, 'script',
        'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1236757914375042');
    /*fbq('track', 'PageView');*/

    fbq('track', 'Purchase', {
        event_name: "Purchase",
        event_time: eventTime,
        action_source: "website",
        event_id: "prc1",
        event_source_url: "'" + eventSourceUrl + "'",
        user_data: {
            em: [
                "'" + emailHash + "'"
            ],
            ph: [
                "'" + phoneHash + "'"
            ],
            fn: [
                "'" + nameHash + "'"
            ],
            client_ip_address: "'" + clientIP + "'",
            client_user_agent: "'" + userAgent + "'"
        },
        custom_data: {
            currency: "INR",
            value: cartValue
        }
    });
}