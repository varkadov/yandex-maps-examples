ymaps.ready(function () {
    const map = new ymaps.Map("ymap", {
        center: [55.76333799997486, 37.56586564914321],
        zoom: 19,
        controls: []
    });

    const objectManager = new ymaps.ObjectManager({
        clusterize: true
    });

    map.geoObjects.add(objectManager);

    fetch('./data/geo-objects.json')
        .then(response => response.json())
        .then(data => objectManager.add(data));

    const clusterBalloonLoaderLayout = ymaps.templateLayoutFactory.createClass(`
        <div>
            Loading...
        </div>
    `);
    const clusterBalloonSuccess = ymaps.templateLayoutFactory.createClass(`
        <div>
            {% for object in properties.geoObjects %}
                <div>Mark {{ object.id }}</div>
            {% endfor %}
        </div>
    `);

    objectManager.clusters.events.add('balloonopen', event => {
        objectManager.clusters.options.set({
            balloonContentLayout: clusterBalloonLoaderLayout
        });

        setTimeout(() => {
            objectManager.clusters.options.set({
                balloonContentLayout: clusterBalloonSuccess
            })
        }, 500);
    });
});