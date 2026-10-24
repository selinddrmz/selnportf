
-- ============================================
-- SELIN DURMAZ - VERITABANI ODEV SORGULARI
-- Ogrenci No: 2516016009
-- ============================================


-- 1. Yayindaki fotograflari listele
SELECT id, baslik, gorsel_url, konum
FROM galeri_fotograflari
WHERE yayinda = true
ORDER BY id DESC;


-- 2. Yayindaki fotograflari kategoriye gore say
SELECT kategori_id, COUNT(*) AS fotograf_sayisi
FROM galeri_fotograflari
WHERE yayinda = true
GROUP BY kategori_id
ORDER BY kategori_id;


-- 3. Albumleri listele
SELECT id, ad
FROM albumler
ORDER BY id;


-- 4. Son gonderilen iletisim mesajlari
SELECT id, ad_soyad, eposta, gonderim_zamani
FROM iletisim_mesajlari
ORDER BY gonderim_zamani DESC;


-- 5. Okunmamis mesajlari listele
SELECT id, ad_soyad, mesaj, gonderim_zamani
FROM iletisim_mesajlari
WHERE okundu = false
ORDER BY gonderim_zamani DESC;


-- 6. Yonetici islem kayitlarini listele
SELECT id, yonetici_id, islem, tablo_adi, kayit_id, zaman
FROM islem_kayitlari
ORDER BY zaman DESC;


-- 7. Veri ihlali kayitlarini listele
SELECT id, aciklama, etkilenen_kayit_sayisi,
       tespit_zamani, kurula_bildirim
FROM ihlal_kayitlari
ORDER BY tespit_zamani DESC;


-- ============================================
-- GOREV 3.1
-- 2025 yilinda cekilmis kendi fotograflarim
-- ============================================
SELECT id, baslik, cekim_tarihi, konum
FROM galeri_fotograflari
WHERE kendi_cekimim = true
  AND EXTRACT(YEAR FROM cekim_tarihi) = 2025
ORDER BY cekim_tarihi DESC;


-- ============================================
-- GOREV 3.2
-- En cok begenilen 3 fotograf
-- ============================================
SELECT id, baslik, begeni, konum
FROM galeri_fotograflari
ORDER BY begeni DESC NULLS LAST
LIMIT 3;


-- ============================================
-- GOREV 3.3
-- Konuma gore fotograf sayisi
-- ============================================
SELECT konum, COUNT(*) AS fotograf_sayisi
FROM galeri_fotograflari
GROUP BY konum
ORDER BY fotograf_sayisi DESC;


-- ============================================
-- GOREV 3.4
-- Her albumdeki fotograf sayisi
-- Bos albumler de listelenir
-- ============================================
SELECT
    a.id,
    a.ad AS album_adi,
    COUNT(g.id) AS fotograf_sayisi
FROM albumler a
LEFT JOIN galeri_fotograflari g
    ON g.kategori_id = a.id
GROUP BY a.id, a.ad
ORDER BY a.ad;


-- ============================================
-- GOREV 3.5
-- Basliginda ogrenci numarasi bulunan fotograf
-- ============================================
SELECT id, baslik, gorsel_url
FROM galeri_fotograflari
WHERE baslik ILIKE '%2516016009%';


-- ============================================
-- GOREV 3.6
-- Kendi cekimim olmayan fotograflari yayindan kaldir
-- ONCE bu SELECT sorgusunu calistirip kontrol et
-- ============================================
SELECT id, baslik, kendi_cekimim, yayinda
FROM galeri_fotograflari
WHERE kendi_cekimim = false;


-- Kontrol ettikten sonra gerekirse asagidaki sorguyu calistir:
-- UPDATE galeri_fotograflari
-- SET yayinda = false
-- WHERE kendi_cekimim = false;


-- ============================================
-- GOREV 3.7
-- Gorsel adresi bos olan kayitlari bul
-- ONCE bu SELECT sorgusunu calistirip kontrol et
-- ============================================
SELECT id, baslik, gorsel_url
FROM galeri_fotograflari
WHERE gorsel_url IS NULL
   OR TRIM(gorsel_url) = '';


-- Kontrol ettikten sonra gerekirse asagidaki sorguyu calistir:
-- DELETE FROM galeri_fotograflari
-- WHERE gorsel_url IS NULL
--    OR TRIM(gorsel_url) = '';


-- ============================================
-- GOREV 6
-- Son 7 gunde islem turune gore islem sayisi
-- ============================================
SELECT
    islem,
    COUNT(*) AS islem_sayisi
FROM islem_kayitlari
WHERE zaman >= NOW() - INTERVAL '7 days'
GROUP BY islem
ORDER BY islem;


-- ============================================
-- VERI IHLALI
-- Tespit ile Kurula bildirim arasindaki sure (saat)
-- ============================================
SELECT
    id,
    aciklama,
    ROUND(
        (EXTRACT(EPOCH FROM (kurula_bildirim - tespit_zamani))
        / 3600)::numeric,
        2
    ) AS bildirim_suresi_saat
FROM ihlal_kayitlari
WHERE kurula_bildirim IS NOT NULL;
