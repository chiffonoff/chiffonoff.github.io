/*
==================================================
  model-viewer.js
  index.html の </body> 直前に追加：
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="model-viewer.js"></script>

  Blender からのエクスポート方法：
  File > Export > glTF 2.0 (.glb/.gltf)
  Format: GLB
  ✅ Include: Selected Objects
  ✅ Data > Mesh > Apply Modifiers
  ✅ Data > Material
  保存したファイルを model.glb としてサイトと同じフォルダに置く
==================================================
*/

(function () {

  /* ---- キャンバスセットアップ ---- */
  const canvas = document.getElementById('three-canvas');
  const W = () => window.innerWidth;
  const H = () => window.innerHeight;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W(), H());
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.shadowMap.enabled = true;

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, W() / H(), 0.1, 100);
  camera.position.set(0, 0.5, 5);

  /* スマホ幅ではモデルを中央下寄りに */
  const offsetX = () => (W() < 700 ? 0 : 1.8);

  /* ---- ライト ---- */
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));

  const dir = new THREE.DirectionalLight(0xffffff, 1.2);
  dir.position.set(5, 8, 5);
  dir.castShadow = true;
  scene.add(dir);

  const rim = new THREE.PointLight(0x00c2ff, 1.5, 20);
  rim.position.set(-4, 2, -2);
  scene.add(rim);

  const fill = new THREE.PointLight(0xff2d78, 0.8, 15);
  fill.position.set(3, -2, 3);
  scene.add(fill);

  /* ---- GLBローダー（Three.js r128 同梱の GLTFLoader を動的ロード） ---- */
  let model = null;
  let mixer = null;

  function loadGLTFLoader(cb) {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js';
    s.onload = cb;
    document.head.appendChild(s);
  }

  loadGLTFLoader(() => {
    const loader = new THREE.GLTFLoader();

    /* ▼ ここを自分のGLBファイル名に変える */
    loader.load(
      'model.glb',
      (gltf) => {
        model = gltf.scene;

        /* シャドウ設定 */
        model.traverse(child => {
          if (child.isMesh) {
            child.castShadow    = true;
            child.receiveShadow = true;
          }
        });

        /* モデルをセンタリング・スケール調整 */
        const box    = new THREE.Box3().setFromObject(model);
        const size   = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        model.scale.setScalar(2.5 / maxDim);       // 画面に収まるよう自動スケール
        model.position.sub(center.multiplyScalar(2.5 / maxDim));
        model.position.x += offsetX();             // 右寄せ（テキストと被らない）

        scene.add(model);

        /* アニメーションがあれば再生 */
        if (gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          gltf.animations.forEach(clip => mixer.clipAction(clip).play());
        }
      },
      (xhr) => {
        /* ローディング進捗をサイトのバーに連動 */
        const pct = Math.round((xhr.loaded / xhr.total) * 100);
        const num = document.getElementById('loading-num');
        if (num) num.textContent = pct;
      },
      (err) => {
        console.warn('GLB load failed, using fallback:', err);
        useFallback();
      }
    );
  });

  /* ---- フォールバック（model.glbがない場合の仮ジオメトリ） ---- */
  function useFallback() {
    const geo = new THREE.IcosahedronGeometry(1.2, 1);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xff2d78,
      metalness: 0.4,
      roughness: 0.3,
    });
    const wire = new THREE.MeshBasicMaterial({ color: 0x00c2ff, wireframe: true, transparent: true, opacity: 0.15 });
    model = new THREE.Group();
    model.add(new THREE.Mesh(geo, mat));
    model.add(new THREE.Mesh(geo, wire));
    model.position.x = offsetX();
    scene.add(model);
  }

  /* ---- マウスインタラクション ---- */
  const mouse    = new THREE.Vector2();
  const target   = new THREE.Vector2();   // なめらか追従用
  let   isDrag   = false;
  let   lastX    = 0;
  let   velX     = 0;                     // 慣性用
  let   rotY     = 0;
  let   autoSpin = true;

  /* マウス位置（ライト・カメラ微動用） */
  window.addEventListener('mousemove', e => {
    mouse.x =  (e.clientX / W()) * 2 - 1;
    mouse.y = -(e.clientY / H()) * 2 + 1;
  });

  /* ドラッグで回転 */
  canvas.addEventListener('mousedown', e => {
    isDrag   = true;
    lastX    = e.clientX;
    autoSpin = false;
    velX     = 0;
  });

  window.addEventListener('mouseup', () => {
    isDrag = false;
    /* 離したとき速度が残っていれば慣性回転 */
    autoSpin = Math.abs(velX) < 0.002;
  });

  window.addEventListener('mousemove', e => {
    if (!isDrag || !model) return;
    const dx = e.clientX - lastX;
    velX  = dx * 0.003;
    rotY += velX;
    model.rotation.y = rotY;
    lastX = e.clientX;
  });

  /* タッチでも回転 */
  canvas.addEventListener('touchstart', e => {
    isDrag = true; lastX = e.touches[0].clientX; autoSpin = false; velX = 0;
  }, { passive: true });
  canvas.addEventListener('touchmove', e => {
    if (!isDrag || !model) return;
    const dx = e.touches[0].clientX - lastX;
    velX = dx * 0.003; rotY += velX; model.rotation.y = rotY;
    lastX = e.touches[0].clientX;
  }, { passive: true });
  canvas.addEventListener('touchend', () => {
    isDrag = false; autoSpin = Math.abs(velX) < 0.002;
  });

  /* スクロール（ホイール）でズーム */
  window.addEventListener('wheel', e => {
    if (document.body.classList.contains('entered')) return;
    camera.position.z = THREE.MathUtils.clamp(
      camera.position.z + e.deltaY * 0.005,
      2, 10
    );
  }, { passive: true });

  /* ダブルクリックでリセット */
  canvas.addEventListener('dblclick', () => {
    rotY     = 0;
    autoSpin = true;
    velX     = 0;
    camera.position.z = 5;
  });

  /* ---- アニメーションループ ---- */
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const dt = clock.getDelta();
    const t  = clock.elapsedTime;

    if (model) {
      /* 自動スピン */
      if (autoSpin) {
        rotY += 0.004;
        model.rotation.y = rotY;
      }

      /* 慣性減衰 */
      if (!isDrag && !autoSpin) {
        velX *= 0.92;
        rotY += velX;
        model.rotation.y = rotY;
        if (Math.abs(velX) < 0.0003) autoSpin = true;
      }

      /* ふわふわ浮遊 */
      model.position.y = Math.sin(t * 0.7) * 0.12;

      /* マウスに向かって軽く傾く */
      target.x += (mouse.x * 0.15 - target.x) * 0.05;
      target.y += (mouse.y * 0.1  - target.y) * 0.05;
      model.rotation.x = target.y;
    }

    /* ライトもマウスに追従（ふんわり） */
    rim.position.x  += (mouse.x * 6 - rim.position.x)  * 0.03;
    fill.position.y += (mouse.y * 4 - fill.position.y) * 0.03;

    if (mixer) mixer.update(dt);

    renderer.render(scene, camera);
  }

  animate();

  /* ---- リサイズ ---- */
  window.addEventListener('resize', () => {
    renderer.setSize(W(), H());
    camera.aspect = W() / H();
    camera.updateProjectionMatrix();
  });

})();