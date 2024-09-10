import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.168.0/three.module.js';

// Function to create Earth, Moon, and Clouds
function createEarthMoonAndClouds() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Set renderer with transparent background
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Make background transparent
    document.getElementById('earth-container').appendChild(renderer.domElement);

    // Load textures
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('earth.jpg');
    const moonTexture = textureLoader.load('moon.jpg');
    const cloudTexture = textureLoader.load('https://upload.wikimedia.org/wikipedia/commons/d/df/Earth-clouds.png'); // Cloud texture

    // Create Earth sphere with texture
    const earthGeometry = new THREE.SphereGeometry(3.5, 32, 32);
    const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Create a slightly larger sphere for the clouds
    const cloudGeometry = new THREE.SphereGeometry(3.55, 32, 32); // Slightly larger than Earth
    const cloudMaterial = new THREE.MeshBasicMaterial({ 
        map: cloudTexture, 
        transparent: true, // Ensure clouds are semi-transparent
    });
    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(clouds);

    // Create Moon sphere with texture
    const moonGeometry = new THREE.SphereGeometry(0.8, 32, 32); // Slightly smaller moon
    const moonMaterial = new THREE.MeshBasicMaterial({ map: moonTexture });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    scene.add(moon);

    // Set initial position for the Moon in orbit around the Earth
    const moonOrbitRadius = 5; // Closer to Earth

    // Position the camera further back to fit the Earth, Clouds, and Moon
    camera.position.z = 8;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // White directional light
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    // Rotation and orbit animation
    function animate() {
        requestAnimationFrame(animate);

        // Rotate Earth
        earth.rotation.y += 0.005;

        // Rotate clouds slightly slower than Earth for realism
        clouds.rotation.y += 0.002;

        // Moon orbits Earth with a tilt along the Y-axis (inclined orbit)
        const time = Date.now() * 0.001; // Controls the speed of the orbit
        moon.position.set(
            Math.cos(time) * -5,  // X-axis movement
            Math.sin(time) * -5,                // Y-axis movement for tilt
            Math.sin(time) * 3   // Z-axis movement
        );

        // Render the scene
        renderer.render(scene, camera);
    }
    animate();

    // Resize renderer on window resize
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
}

// Call the function to load the models
createEarthMoonAndClouds();
