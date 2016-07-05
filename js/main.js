(function () {
    loadOptions();
    submitHandler();
})();

function submitHandler() {
    var $submitButton = $('#submitButton');

    $submitButton.on('click', function () {
        console.log('Submit');

        var return_to = getQueryParam('return_to', 'pebblejs://close#');
        document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
    });
}

function loadOptions() {
    var $ipAddressInput = $('#ip-address-input');
    var $numZonesInput = $('#num-zones-input');

    if (localStorage.receiverAddr) {
        $ipAddressInput[0].value = localStorage.receiverAddr;
        $numZonesInput[0].value = localStorage.receiverNumZones;
    }
}

function getAndStoreConfigData() {
    var $ipAddressInput = $('#ip-address-input');
    var $numZonesInput = $('#num-zones-input');

    var options = {
        receiverAddr: $ipAddressInput[0].val(),
        receiverNumZones: $numZonesInput[0].val()
    };

    localStorage.receiverAddr = options.receiverAddr;
    localStorage.receiverNumZones = options.receiverNumZones;

    console.log('Got options: ' + JSON.stringify(options));
    return options;
}

function getQueryParam(variable, defaultValue) {
    var query = location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (pair[0] === variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return defaultValue || false;
}
