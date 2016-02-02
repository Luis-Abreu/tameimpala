$(document).ready(function () {
	
	var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	var audioElement = document.getElementById('audioElement');
	var audioSrc = audioCtx.createMediaElementSource(audioElement);
	var analyser = audioCtx.createAnalyser();

	// Bind our analyser to the media element source.
	audioSrc.connect(analyser);
	audioSrc.connect(audioCtx.destination);

	//var frequencyData = new Uint8Array(analyser.frequencyBinCount);
	var frequencyData = new Uint8Array(200);
	
	var ratio = 1;

	// Global scene object
		var scene;

		// Global camera object
		var camera;


		// Global mesh object of the square
		var squareMesh;

		var videoTexture= !!!!!!!!
		
		 // Load the background texture
		
		var bgmaterial	= new THREE.MeshBasicMaterial({
		map	: videoTexture.texture
		});
		
		var backgroundMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(2, 2, 0),
			bgmaterial);
			
		backgroundMesh.material.depthTest = false;
        backgroundMesh.material.depthWrite = false;
		
		// Create your background scene
        var backgroundScene = new THREE.Scene();
        var backgroundCamera = new THREE.Camera();
        backgroundScene .add(backgroundCamera );
        backgroundScene .add(backgroundMesh );
		
	

           // Initialize the scene
           initializeScene();

           // Instead of calling 'renderScene()', we call a new function: 'animateScene()'. It will
           // update the rotation values and call 'renderScene()' in a loop.

           // Animate the scene
           animateScene();

           /**
            * Initialze the scene.
            */
           function initializeScene(){
               // Check whether the browser supports WebGL. If so, instantiate the hardware accelerated
               // WebGL renderer. For antialiasing, we have to enable it. The canvas renderer uses
               // antialiasing by default.
               // The approach of multiplse renderers is quite nice, because your scene can also be
               // viewed in browsers, which don't support WebGL. The limitations of the canvas renderer
               // in contrast to the WebGL renderer will be explained in the tutorials, when there is a
               // difference.
               if(Detector.webgl){
                   renderer = new THREE.WebGLRenderer({antialias:true});

               // If its not supported, instantiate the canvas renderer to support all non WebGL
               // browsers
               } else {
                   renderer = new THREE.CanvasRenderer();
               }

               // Set the background color of the renderer to black, with full opacity
               renderer.setClearColor(0x000000, 1);

               // Get the size of the inner window (content area) to create a full size renderer
               canvasWidth = window.innerWidth;
               canvasHeight = window.innerHeight;

               // Set the renderers size to the content areas size
               renderer.setSize(canvasWidth, canvasHeight);

               // Get the DIV element from the HTML document by its ID and append the renderers DOM
               // object to it
               document.getElementById("WebGLCanvas").appendChild(renderer.domElement);

               // Create the scene, in which all objects are stored (e. g. camera, lights,
               // geometries, ...)
               scene = new THREE.Scene();

               // Now that we have a scene, we want to look into it. Therefore we need a camera.
               // Three.js offers three camera types:
               //  - PerspectiveCamera (perspective projection)
               //  - OrthographicCamera (parallel projection)
               //  - CombinedCamera (allows to switch between perspective / parallel projection
               //    during runtime)
               // In this example we create a perspective camera. Parameters for the perspective
               // camera are ...
               // ... field of view (FOV),
               // ... aspect ratio (usually set to the quotient of canvas width to canvas height)
               // ... near and
               // ... far.
               // Near and far define the cliping planes of the view frustum. Three.js provides an
               // example (http://mrdoob.github.com/three.js/examples/
               // -> canvas_camera_orthographic2.html), which allows to play around with these
               // parameters.
               // The camera is moved 10 units towards the z axis to allow looking to the center of
               // the scene.
               // After definition, the camera has to be added to the scene.
               camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 1, 100);
               camera.position.set(0, 0, 10);
               camera.lookAt(scene.position);
               scene.add(camera);

               // The creation of the square is done in the same way as the triangle, except of the
               // face definition. Instead of using THREE.Face3, we define a face with four vertices:
               // THREE.Face4.
               // 1. Instantiate the geometry object
               // 2. Add the vertices
               // 3. Define the faces by setting the vertices indices
			   
               var squareGeometry = new THREE.Geometry();
               squareGeometry.vertices.push(new THREE.Vector3(ratio*-1.0, ratio*1.0, 0.0));
               squareGeometry.vertices.push(new THREE.Vector3(ratio*1.0, ratio*1.0, 0.0));
               squareGeometry.vertices.push(new THREE.Vector3(ratio*1.0, ratio*-1.0, 0.0));
               squareGeometry.vertices.push(new THREE.Vector3(ratio*-1.0, ratio*-1.0, 0.0));
			   
               //squareGeometry.faces.push(new THREE.Face4(0, 1, 2, 3));
			   squareGeometry.faces.push(new THREE.Face3(0, 2, 1));
			   squareGeometry.faces.push(new THREE.Face3(0, 2, 3));

               // The square gets a new face color. In contrast to vertex colors means face color,
               // that all vertices have the same color or in other words, the whole face has the
               // same color (no color gradients).

               // Create a light blue basic material and activate the 'doubleSided' attribute.
               var squareMaterial = new THREE.MeshBasicMaterial({
                   color:0x8080FF,
                   side:THREE.DoubleSide
               });

               // Create a mesh and insert the geometry and the material. Translate the whole mesh
               // by 1.5 on the x axis and by 4 on the z axis and add the mesh to the scene.
               squareMesh = new THREE.Mesh(squareGeometry, squareMaterial);
               squareMesh.position.set(0, 0.0, 5);
               scene.add(squareMesh);
           }

           /**
            * Animate the scene and call rendering.
            */
           function animateScene(){
               // At first, we increase the y rotation of the triangle mesh and decrease the x
               // rotation of the square mesh.

               // Decrease the x rotation of the square
               
			   
			   analyser.getByteFrequencyData(frequencyData);
			   var ratio1 = frequencyData[0]/125;
			   var ratio2 = frequencyData[199]/125;
				// console.log(frequencyData[0]/10+" "+
				// frequencyData[25]/10+" "+
				// frequencyData[50]/10+" "+
				// frequencyData[75]/10+" "+
				// frequencyData[100]/10+" "+
				// frequencyData[125]/10+" "+
				// frequencyData[150]/10+" "+
				// frequencyData[175]/10);
				
				// var squareGeometry = new THREE.Geometry();
				// squareGeometry.vertices.push(new THREE.Vector3(ratio*-1.0, ratio*1.0, 0.0));
				// squareGeometry.vertices.push(new THREE.Vector3(ratio*1.0, ratio*1.0, 0.0));
				// squareGeometry.vertices.push(new THREE.Vector3(ratio*1.0, ratio*-1.0, 0.0));
				// squareGeometry.vertices.push(new THREE.Vector3(ratio*-1.0, ratio*-1.0, 0.0));
				
				// var squareMaterial = new THREE.MeshBasicMaterial({
                   // color:0x8080FF,
                   // side:THREE.DoubleSide
               // });
			   
			   //squareMesh = new THREE.Mesh(squareGeometry, squareMaterial);
			   
				squareMesh.scale.y = ratio1;
				squareMesh.scale.x = ratio2;
				
				//squareMesh.rotation.y -= 0.045;
				//squareMesh.rotation.x -= 0.015;
				
               // Define the function, which is called by the browser supported timer loop. If the
               // browser tab is not visible, the animation is paused. So 'animateScene()' is called
               // in a browser controlled loop.
               requestAnimationFrame(animateScene);

               // Map the 3D scene down to the 2D screen (render the frame)
               renderScene();
           }

           /**
            * Render the scene. Map the 3D world to the 2D screen.
            */
			function renderScene(){
				renderer.autoClear = false;
				renderer.clear();
				renderer.render(backgroundScene , backgroundCamera );
				renderer.render(scene, camera);
			}
	

});
