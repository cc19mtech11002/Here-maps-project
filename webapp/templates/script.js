const platform = new H.service.Platform({ apikey: '4vFLeesqoRS5f2O6p418vjCFMA-LKaD2YfW9e8BnLkE' });
const defaultLayers = platform.createDefaultLayers();
const map = new H.Map(document.getElementById('map'),
            defaultLayers.vector.normal.map, {
            center: { lat: 17.5947, lng: 78.1230 },
            zoom: 13,
            pixelRatio: window.devicePixelRatio || 1
      });
        window.addEventListener('resize', () => map.getViewPort().resize());
        const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
        const ui = H.ui.UI.createDefault(map, defaultLayers);

      //Begin routing
      //Configure transportation mode, start, end points
        const request = {
            mode: 'fastest;car',
            waypoint0: 'geo!17.5801,78.12108',
            waypoint1: 'geo!17.596505,78.125219',
            representation: 'display'
      };
      //Initialize routing service
        const router = platform.getRoutingService();
        router.calculateRoute(request, response => {
         //Parse the route's shape
            const shape = response.response.route[0].shape.map(x => x.split(','));
            const linestring = new H.geo.LineString();
            shape.forEach(s => linestring.pushLatLngAlt(s[0], s[1]));
         //Create a polyline with the shape
            const routeLine = new H.map.Polyline(linestring, {
                style: { strokeColor: 'blue', lineWidth: 3 }
         });
         //Add route to map
            map.addObject(routeLine);
         //Zoom to bounds of the route shape
            map.getViewModel().setLookAtData({ bounds: routeLine.getBoundingBox() });
      });