/* ==================================================
   作品データ
   ・img は vivivit 上の画像（パス）か、自分のファイル（"images/xxx.jpg"）を指定できます
   ・youtube は動画ID（https://youtu.be/ここ）
   ・section: personal / team / logo / drawing
================================================== */
const VV = 'https://d1910q5d06bt1f.cloudfront.net/c!/w=1256,a=0,q=100,f=auto/uploads/work_item/opus_image/';

const WORKS = [
  /* ---------- Team Works ---------- */
  {
    section: 'team', badge: 'TEAM / MOVIE',
    title: 'THE TINKER',
    tags: ['3DCGアニメーション', '3DCGモデル', 'キャラクターデザイン', '映像'],
    text: 'チームで制作した3DCGアニメーション作品。',
    youtube: '522wUF2bgmg',
    imgs: [
      '3566229/3d6dadf2-898a-4284-9a69-1718e598e1ff.png', '3566231/2f75ec96-e910-4c64-abcc-b2567db10365.png',
      '3566234/61fc959b-e1ea-4b49-9202-2859f1a6801c.png', '3566236/3efb7afc-f780-4218-be4b-d112ad22353b.png',
      '3566238/735ef259-eacc-4f53-8d6e-e017fa34c71f.png', '3566239/835cabed-1e3a-4916-b44c-763fc819979d.png',
      '3566241/51723e02-b726-4171-96d3-04e5656b0a2d.png', '3566242/9b33fbac-0f6b-43fc-b3d5-4905d7b42c54.png',
      '3566243/ab662fe6-b974-4305-a848-126e65580379.png', '3566244/d51123ab-a677-4a23-bde9-fc6aa009d031.png',
      '3566245/d3d78cfe-7fa5-4286-9c0d-fc7dd21a1df6.png', '3566246/224a9bad-65b4-41ca-b7bc-7eb484558150.png'
    ],
    link: 'https://www.vivivit.com/works/1176520'
  },
  {
    section: 'team', badge: 'TEAM / AD',
    title: 'THE TINKER 広報（キャラクター）',
    tags: ['3DCGアニメーション', '3DCGモデル', '広告'],
    text: '「THE TINKER」の広報用キャラクタービジュアル。',
    imgs: [
      '3516045/0a4ac970-28a2-403f-b7e9-d20cf301749a.png', '3516046/c18976df-67d9-455a-be1f-2ff59857402d.png',
      '3516047/97b45761-0def-4a3a-8e3a-e50f78fb2a2c.png', '3516048/ec747555-1216-4d87-8d80-818aaa25c898.png'
    ],
    link: 'https://www.vivivit.com/works/1146945'
  },
  {
    section: 'team', badge: 'TEAM / ANIME',
    title: 'Liberator',
    tags: ['3DCGアニメーション', '3DCGモデル', 'キャラクターデザイン'],
    text: 'Bass（ロボット）とAzel（人間）のバトルアニメーションを3人のグループで制作しました。物語の企画から3人で行い、私は背景のモデリングとポスターの制作に力を入れました。',
    imgs: [
      '3416677/6b39ceb2-af2f-47c9-9083-1509ca2c2f54.png', '3416731/d3c2aa0c-6eb4-4fb6-a822-e59235090c06.png',
      '3416679/5ca5c0ad-1527-4050-be47-02be2ee40193.jpg', '3416697/7f2fc4f7-6973-4eba-b645-8e3c05d97916.png'
    ],
    link: 'https://www.vivivit.com/works/1077850'
  },

  /* ---------- Personal Works ---------- */
  {
    section: 'personal', badge: 'INTERACTIVE',
    title: 'Phantom Signal',
    tags: ['インタラクションデザイン', '3DCGアニメーション', 'VFX', 'Blender', 'TouchDesigner'],
    text: 'Blender と TouchDesigner を組み合わせたインタラクティブな映像作品。',
    youtube: 'CcpUdxYLpeQ',
    imgs: [
      '3503482/d0e97dd5-d70a-4a60-b3d1-5ea182d2f7d0.png', '3503483/70f38400-d44f-4113-aefe-b3a37a2798ff.png',
      '3503484/9311ad0d-9ca3-4461-8d80-0d1263b6bb06.png', '3503485/50c73013-4aa0-4185-a76d-fc02f6b5c922.png'
    ],
    link: 'https://www.vivivit.com/works/1139946'
  },
  {
    section: 'personal', badge: '3DCG',
    title: 'Neon Vein',
    tags: ['3DCGモデル', 'Blender'],
    text: 'Blenderでネオンが光るサイバーパンクな路地裏を表現しました。光と影が映える配置にし、看板はすべてオリジナルで制作。水溜まりの反射や霧で、見ていてワクワクする作品に仕上げました。',
    imgs: ['3425779/142177f2-f7b9-4a6f-bf30-ddf54bdb286a.jpg'],
    link: 'https://www.vivivit.com/works/1016405'
  },
  {
    section: 'personal', badge: 'CHARACTER',
    title: 'Cyan Iris',
    tags: ['3DCGモデル', 'オリジナルキャラクター'],
    text: 'オリジナルキャラクターの3DCGモデル。きれいなトポロジーを心がけ、髪はUVを整理したうえでノードでテクスチャを制作し、色やハイライトを値で調整できるようにしました。目はテクスチャペイントで色を重ね、どの角度からも美しく見えるよう工夫しています。',
    imgs: [
      '3425781/a9714964-84f3-4adf-a9c2-1120a0980e41.jpg', '3323276/62882939-3d8d-41e0-93f7-74e8f732c027.png',
      '3323278/eaa5d6d1-4ca1-4b49-b1bd-658472df5c06.png'
    ],
    link: 'https://www.vivivit.com/works/1038137'
  },
  {
    section: 'personal', badge: '3DCG',
    title: '幻灯京',
    tags: ['グラフィック', '3DCGモデル', 'Blender', 'Photoshop'],
    text: '誰も見たことのない新しい東京。伝統的な和と近未来が融合した都市を描きました。和の要素として「花札」を選び、画像からネオン広告を自動生成する独自ノードを作って効率化。手前に2Dの雲を置き、被写界深度で視線を誘導しています。',
    imgs: [
      '3362039/02bed760-c9d0-45c0-8659-689b73394d9b.jpg', '3397196/17262797-6b2b-40c9-ae1b-7246351014bb.png',
      '3416669/f2c357ef-771b-4b1a-916a-26356a4291e0.png'
    ],
    link: 'https://www.vivivit.com/works/1050387'
  },
  {
    section: 'personal', badge: '3DCG',
    title: 'Awakening Robot',
    tags: ['3DCGモデル', 'デジタルアート'],
    text: 'リアル調でありながらアニメのようなテイストで、子供部屋のワクワクを表現しました。あえて小物の並びをずらして3DCG感を抜き、HDRIやボリュームの散乱で自然なライティングを目指しました。',
    imgs: ['3427546/f37e05ae-3b87-4f1e-b158-606ae0d18de5.jpg'],
    link: 'https://www.vivivit.com/works/1026775'
  },
  {
    section: 'personal', badge: '3DCG',
    title: 'Bass',
    tags: ['3DCGモデル', 'Blender', 'Substance 3D Painter', 'Photoshop'],
    text: '好きなバンドのベースを3DCGで再現しました。弦の太さやピックアップの金属部分、背面の細部までモデリング。Blenderでモデリング、Substance 3D Painterでテクスチャ、Photoshopでレタッチを行い、メープル材の質感と塗装の艶にこだわりました。',
    imgs: [
      '3325880/e31f8249-2712-45b1-bcb4-ccc4ff6173e4.png', '3325889/1c736298-88c5-4374-8ab3-5fad82687350.png',
      '3325902/7b72db4c-76ef-42b0-b52c-47b4cdbe95e6.png'
    ],
    link: 'https://www.vivivit.com/works/1038957'
  },
  {
    section: 'personal', badge: '3DCG',
    title: 'Nebula library',
    tags: ['グラフィック', '3DCGモデル'],
    text: 'ショッピングモールの構図を模倣して3DCG作品に落とし込みました。日常に潜む、通路が立体的に交差する魅力的な構図を写真で切り取り、新たな空間として作り上げています。',
    imgs: [
      '3425780/850d3dc5-e43b-4dbe-9f97-cecd40b708bd.jpg', '3277573/323438ed-d759-4669-b4cd-851aa1342b01.png',
      '3277585/c0fd144d-9bba-4869-8d93-ece351566104.jpg'
    ],
    link: 'https://www.vivivit.com/works/1022572'
  },
  {
    section: 'personal', badge: '3DCG',
    title: 'VIRTUAL RESONANCE',
    tags: ['グラフィック', '3DCGモデル', '3DCGレイアウト', 'Blender'],
    text: 'Blenderで制作した3DCGグラフィック作品。',
    imgs: ['3489972/1e6e1d91-5dff-47d5-9853-3044555b3574.jpg'],
    link: 'https://www.vivivit.com/works/1132119'
  },
  {
    section: 'personal', badge: 'FAN ART',
    title: 'アヤナミ　レイ（仮称）',
    tags: ['3DCGモデル', 'キャラクター', 'Blender'],
    text: '『ヱヴァンゲリヲン新劇場版：Q』に登場するアヤナミ　レイ（仮称）のモデリングと背景を制作しました。プラグスーツのボディラインがきれいに見えるよう、トポロジーとリムライトを調整しています。',
    imgs: ['3373688/da5be26b-db8a-46d5-8c3e-8ad8672fb2a0.png'],
    link: 'https://www.vivivit.com/works/1054016'
  },
  {
    section: 'personal', badge: 'MOVIE',
    title: 'boxel',
    tags: ['3DCGモデル', '3Dエフェクト', '空間デザイン'],
    text: '3DCGによる空間デザインの映像作品。',
    youtube: 'BOCRvg5fI18',
    link: 'https://www.vivivit.com/works/1109145'
  },
  {
    section: 'personal', badge: 'MOVIE',
    title: 'アジア競技大会PR動画',
    tags: ['グラフィック', '映像'],
    text: 'アジア競技大会のPR映像。',
    youtube: 'gR1EBN4rlx4',
    link: 'https://www.vivivit.com/works/1047031'
  },
  {
    section: 'personal', badge: 'MOVIE',
    title: '自己PR動画',
    tags: ['モーショングラフィックス', '映像'],
    text: 'モーショングラフィックスで制作した自己紹介動画。',
    youtube: 'GbEOeHqFzaQ',
    link: 'https://www.vivivit.com/works/1087271'
  },

  /* ---------- LOGO ---------- */
  {
    section: 'logo', badge: 'LOGO',
    title: 'LOGO',
    tags: ['タイポグラフィ'],
    text: 'ロゴデザイン。',
    imgs: ['3499741/de443eb3-2219-4ac2-9e72-7c272b988556.png'],
    link: 'https://www.vivivit.com/works/1138765'
  },

  /* ---------- DRAWING ---------- */
  {
    section: 'drawing', badge: 'DRAWING',
    title: '接合部100枚デッサン',
    tags: ['デッサン', 'プロダクトデザイン', '立体'],
    text: 'プロダクトの接合部を100枚デッサンしました。',
    imgs: [
      '3416657/5d49f556-f6bb-4519-9672-dc04d8e390c8.jpg', '3416645/f46a52cc-0e18-47e2-af6c-9b3a8099f028.jpg',
      '3416642/db7e4d42-481a-44e2-adf8-dba125ae892c.jpg'
    ],
    link: 'https://www.vivivit.com/works/1077841'
  },
  {
    section: 'drawing', badge: 'GRAPHIC',
    title: 'Do you know our honey?',
    tags: ['グラフィック', 'デジタルアート'],
    text: 'グラフィック作品。',
    imgs: ['3474050/395f6564-214f-44e2-8da8-10afe9c62005.png'],
    link: 'https://www.vivivit.com/works/1120712'
  }
];

/* ---- URLヘルパー ---- */
function imgUrl(p, w) {
  if (/^(https?:|images\/|\.\/)/.test(p)) return p;
  const u = VV + p;
  return w ? u.replace('w=1256', 'w=' + w) : u;
}
function thumbOf(work) {
  if (work.imgs && work.imgs.length) return imgUrl(work.imgs[0], 720);
  if (work.youtube) return `https://img.youtube.com/vi/${work.youtube}/hqdefault.jpg`;
  return '';
}
