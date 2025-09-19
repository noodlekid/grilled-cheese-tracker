import { useEffect, useRef, RefObject } from "react";
import * as THREE from "three";
import { useMapStore } from "../../store/mapStore";

interface ThreeSceneProps {
  containerRef: RefObject<HTMLDivElement>;
}

export function ThreeScene({ containerRef }: ThreeSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { nodes, edges } = useMapStore();

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    scene.fog = new THREE.Fog(0x0a0a0a, 10, 50);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight,
    );
    renderer.setPixelRatio(window.devicePixelRatio);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffd700, 0.5);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    // Grid
    const gridHelper = new THREE.GridHelper(20, 20, 0xe94560, 0x2a2a4e);
    scene.add(gridHelper);

    // Create nodes
    const nodeGeometry = new THREE.SphereGeometry(0.2, 8, 8);
    const nodeMaterial = new THREE.MeshPhongMaterial({
      color: 0xffd700,
      emissive: 0xffd700,
      emissiveIntensity: 0.2,
    });

    const nodeMeshes: THREE.Mesh[] = [];
    nodes.forEach((node) => {
      const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      mesh.position.set(node.x / 10, 0.2, node.y / 10);
      scene.add(mesh);
      nodeMeshes.push(mesh);
    });

    // Create edges
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xe94560,
      linewidth: 2,
      opacity: 0.6,
      transparent: true,
    });

    edges.forEach((edge) => {
      const fromNode = nodes.find((n) => n.id === edge.fromNodeId);
      const toNode = nodes.find((n) => n.id === edge.toNodeId);
      if (fromNode && toNode) {
        const points = [
          new THREE.Vector3(fromNode.x / 10, 0.2, fromNode.y / 10),
          new THREE.Vector3(toNode.x / 10, 0.2, toNode.y / 10),
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, lineMaterial);
        scene.add(line);
      }
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.0005;
      camera.position.x = Math.cos(time) * 15;
      camera.position.z = Math.sin(time) * 15;
      camera.lookAt(0, 0, 0);

      nodeMeshes.forEach((node, i) => {
        node.scale.setScalar(1 + Math.sin(time * 3 + i) * 0.1);
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect =
        containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight,
      );
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [nodes, edges]);

  return <canvas ref={canvasRef} id="three-canvas" />;
}
