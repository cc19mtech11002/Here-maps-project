function addDraggableMarker(map, behavior){

  var marker = new H.map.Marker({lat: 17.5980121, lng: 78.125201}, {
    // mark the object as volatile for the smooth dragging
    volatility: true
  });
  // Ensure that the marker can receive drag events
  marker.draggable = true;
  map.addObject(marker);

  // disable the default draggability of the underlying map
  // and calculate the offset between mouse and target's position
  // when starting to drag a marker object:
  map.addEventListener('dragstart', function(ev) {
    var target = ev.target,
        pointer = ev.currentPointer;
    if (target instanceof H.map.Marker) {
      var targetPosition = map.geoToScreen(target.getGeometry());
      target['offset'] = new H.math.Point(pointer.viewportX - targetPosition.x, pointer.viewportY - targetPosition.y);
      behavior.disable();
    }
  }, false);


  // re-enable the default draggability of the underlying map
  // when dragging has completed
  map.addEventListener('dragend', function(ev) {
    var target = ev.target;
    if (target instanceof H.map.Marker) {
      behavior.enable();
    }
  }, false);

  // Listen to the drag event and move the position of the marker
  // as necessary
   map.addEventListener('drag', function(ev) {
    var target = ev.target,
        pointer = ev.currentPointer;
    if (target instanceof H.map.Marker) {
      target.setGeometry(map.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y));
    }
  }, false);
}

/**
 * Boilerplate map initialization code starts below:
 */
