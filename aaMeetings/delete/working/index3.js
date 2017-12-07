console.log(meetings)
            function makeContent(cont) {
            var contentHolder = '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>';
                
            for (var i = 0; i < cont.meetingGroups.length; i++) {
            
            //if (i == 0) {
              //  contentHolder = contentHolder + '<h2>' + cont.meetingGroups[i].groupInfo.address.substr(0, cont.meetingGroups[i].groupInfo.address.indexOf(',')) + '</h2>';
            //} 
           // console.log(cont.meetingGroups[i])
                contentHolder = contentHolder + '<h1 id="firstHeading" class="firstHeading">';
                contentHolder = contentHolder + cont.meetingGroups[i].groupInfo.day + '</h1>';
                
              
                contentHolder = contentHolder + '</p>';
                contentHolder = contentHolder + '<div class="iw-bottom-gradient"></div>';
            }
            return contentHolder;
        }

        function setMarkers(map, locations) {
            // Add markers to the map
            var infowindow = new google.maps.InfoWindow({
                maxWidth: 50
            });

            for (var i = 0; i < locations.length; i++) {
                var meeting = locations[i];
                var myLatLng = new google.maps.LatLng(meeting._id.latLong);

                var contentWindow = makeContent(meetings[i]);
    
                
                var marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    title: "Click for meeting info",
                    //this is where I can type hello and see it in my marker
                    content: contentWindow,
                });

                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent(this.content);
                    infowindow.open(map, this);
                });
            }
        }
        google.maps.event.addDomListener(window, 'load', initialize);