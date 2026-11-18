// Gallery albums, grouped by image filename prefix (e.g. "2009-*", "gamp 2015-*", "GAMP 2018-*").
// In Claude Code, generate this from the /gallery folder: group files by year found in the filename.
(function () {
  const base = 'assets/gallery/';
  const mk = (prefix, ids, alts, ratios) => ids.map((id, i) => ({ src: base + prefix + id + '.jpg', alt: alts[i] || 'Florence Foundation community outreach', ratio: ratios[i] || '4/3' }));
  window.FF_GALLERY = [
    { year: '2009', title: 'Community Outreach', items: mk('2009-', ['1', '3', '5', '6', '7'], [
      'A group of children in school uniforms smile together outdoors',
      'Children in school uniforms gathered together in an open yard',
      'Children laughing and posing together outside a building site',
      'Women gathered under a tent around a table during a workshop',
      'People queue under a tent beside cool boxes of food'
    ], ['4/3', '4/3', '4/3', '4/3', '4/3']) },
    { year: '2015', title: 'Grace & Mercy Project (GAMP)', items: mk('gamp-2015-', ['96', '97', '101', '102', '104', '105', '107'], [
      'Guests unveil sewing machines at a ceremony',
      'Sewing machines revealed beneath a white cloth',
      'A graduate in cap and gown receives a certificate',
      'A graduate shakes hands with a guest beside a sewing machine',
      'A graduate stands with guests holding a certificate',
      'A graduate in cap and gown is congratulated beside a sewing machine',
      'A graduate poses with two guests holding certificates'
    ], ['3/2', '3/2', '3/2', '3/2', '3/2', '3/2', '4/5']) },
    { year: '2018', title: 'Grace & Mercy Project (GAMP)', items: mk('gamp-2018-', ['1', '2', '3', '5', '6', '7'], [
      'A large community gathering seated under white tents',
      'Two women stand together under a tent',
      'A volunteer records details at a registration table',
      'Food containers with orange and purple lids prepared for distribution',
      'A volunteer takes a blood pressure reading at a health check table',
      'Volunteers run a health check station under a tent'
    ], ['3/2', '3/2', '3/2', '3/2', '3/2', '3/2']) }
  ];
})();
