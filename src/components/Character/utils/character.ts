import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc?v=2",
          "MyCharacter12"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;

                // Change clothing colors to match site theme
                if (mesh.material) {
                  if (mesh.name === "BODY.SHIRT") { // The shirt mesh
                    const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                    newMat.color = new THREE.Color("#8B4513");
                    mesh.material = newMat;
                  } else if (mesh.name === "Pant") {
                    const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                    newMat.color = new THREE.Color("#000000");
                    mesh.material = newMat;
                  }
                }

                if (mesh.name.toLowerCase().includes("cap")) {
                  mesh.visible = false;
                }
                
                if (mesh.name.toLowerCase().includes("turban") || mesh.name.toLowerCase().includes("hair")) {
                  mesh.visible = true;
                }

                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;

            // Add a Sikh Turban to the head
            const headBone = character.getObjectByName("spine.006") || character.getObjectByName("spine006");
            if (headBone && !character.getObjectByName("SikhTurban")) {
              const turbanGroup = new THREE.Group();
              turbanGroup.name = "SikhTurban";
              
              const blackMaterial = new THREE.MeshStandardMaterial({ 
                color: new THREE.Color("#111111"),
                roughness: 0.9,
                metalness: 0.1,
              });

              // Simple Small Cylinder Turban
              const turbanGeo = new THREE.CylinderGeometry(5, 5, 4, 32); 
              const turbanMesh = new THREE.Mesh(turbanGeo, blackMaterial);
              // Position it on top of the head
              turbanMesh.position.set(0, 9, -1);
              turbanGroup.add(turbanMesh);



              turbanGroup.scale.set(0.25, 0.25, 0.25);
              turbanGroup.position.set(0, -0.2, 0);

              headBone.add(turbanGroup);
            }

            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
