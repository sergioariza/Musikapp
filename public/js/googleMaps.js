$(document).ready(function() {
    "use strict";
    var geocoder;
    var map;

    // function to geocode an address and plot it on a map
    function codeAddress(address) {
        geocoder.geocode({
            'address': address
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                $('#map-none').hide();
                $('#map-canvas').show();
                var latlng = new google.maps.LatLng(results[0].geometry.location.k, results[0].geometry.location.D); // set default lat/long (new york city)
                var mapOptions = { // options for map
                    zoom: 16,
                    center: latlng
                };

                map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions); // create new map in the map-canvas div
                map.setCenter(results[0].geometry.location); // center the map on address
                var marker = new google.maps.Marker({ // place a marker on the map at the address
                    map: map,
                    position: results[0].geometry.location
                });
            } else {
                $('#map-canvas').hide();
                $('#map-none').show();
            }
        });
    }

    // get map button functionality
    $(document).on("click", "#map-address-btn", function(event) {
        event.preventDefault();
        geocoder = new google.maps.Geocoder();
        var address = $("#location-address").val(); // grab the address from the input field
        codeAddress(address); // geocode the address
    });
});
