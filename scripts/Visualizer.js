var LoopVisualizer = (function() {

	var RINGCOUNT = 20;
	var SEPARATION = 30;
	var INIT_RADIUS = 50;
	var SEGMENTS = 512;
	var VOL_SENS = 1.2;
	var BIN_COUNT = 512;

	var rings = [];
	var levels = [];
	var colors = [];
	var loopHolder = new THREE.Object3D();
	var loopGeom;//one geom for all rings
	var perlin = new ImprovedNoise();
	var noisePos = 0;
	var freqByteData;
	var timeByteData;
	
	var cubemesh;


	function init() {

		rings = [];
		levels = [];
		colors = [];
		
				// create cube 
		var texture = THREE.ImageUtils.loadTexture( 'images/cubetexture.jpg' );
		var geometry = new THREE.BoxGeometry( 100, 100, 100 );
		var material = new THREE.MeshBasicMaterial( { map: texture } );
		cubemesh = new THREE.Mesh( geometry, material );
		
		scene.add( cubemesh );
		
		cubemesh.position.z = 1500;
		cubemesh.position.x = 300;

		////////INIT audio in
		freqByteData = new Uint8Array(analyser.frequencyBinCount);
		timeByteData = new Uint8Array(analyser.frequencyBinCount);

		
		//create ring geometry
		var loopShape = new THREE.Shape();
		loopShape.absarc( 0, 0, INIT_RADIUS, 0, Math.PI*2, false );
		loopGeom = loopShape.createPointsGeometry(SEGMENTS/2);
		loopGeom.dynamic = true;

		//create rings
		scene.add(loopHolder);
		var scale = 1;
		for(var i = 0; i < RINGCOUNT; i++) {

			var m = new THREE.LineBasicMaterial( { color: 0xffffff,
				linewidth: 1 ,
				opacity : 0.7,
				blending : THREE.AdditiveBlending,
				depthTest : false,
				transparent : false
			});
			
			var line = new THREE.Line( loopGeom, m);

			rings.push(line);
			scale *= 1.2;
			line.scale.x = scale;
			line.scale.y = scale;
			loopHolder.add(line);

			levels.push(0);
			colors.push(0);

		}
		


	}

	function remove() {

		if (loopHolder){
			for(var i = 0; i < RINGCOUNT; i++) {
				loopHolder.remove(rings[i]);
			}

		}
	}

	function update() {

		
		analyser.getByteFrequencyData(freqByteData);
		analyser.getByteTimeDomainData(timeByteData);

		//add a new average volume onto the list
		var sum = 0;
		for(var i = 0; i < BIN_COUNT; i++) {
			sum += freqByteData[i];
		}
		var aveLevel = sum / BIN_COUNT;
		var scaled_average = (aveLevel / 256) * VOL_SENS; //256 is the highest a level can be
		levels.push(scaled_average);
		levels.shift(1);
		
		cubemesh.rotation.x += 0.005;
		cubemesh.rotation.y += 0.01;
		cubemesh.scale.x = scaled_average;
		cubemesh.scale.y = scaled_average;
		cubemesh.scale.z = scaled_average;

		//add a new color onto the list
		noisePos += 0.005;
		var n = Math.abs(perlin.noise(noisePos, 0, 0));
		colors.push(n);
		colors.shift(1);

		//write current waveform into all rings
		for(var j = 0; j < SEGMENTS; j++) {
			loopGeom.vertices[j].z = timeByteData[j]*2;//stretch by 2
		}
		// link up last segment
		loopGeom.vertices[SEGMENTS].z = loopGeom.vertices[0].z;
		loopGeom.verticesNeedUpdate = true;

		for( i = 0; i < RINGCOUNT ; i++) {
			var ringId = RINGCOUNT - i - 1;
			var normLevel = levels[ringId] + 0.01; //avoid scaling by 0
			var hue = colors[i];
			rings[i].material.color.setHSL(hue, 1, normLevel);
			rings[i].material.linewidth = normLevel*3;
			rings[i].material.opacity = normLevel;
			rings[i].scale.z = normLevel;
		}

	}

	return {
		init:init,
		update:update,
		remove:remove,
		cubemesh:cubemesh,
		loopHolder:loopHolder
	};
	}());