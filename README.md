# ABONELIK SİSTEMİ

İçerisinde basit bir authorization ve abonelik sistemi olan bir uygulama. Abonelikler her gün saat gece 01.00'da kontrol edilir. Eğer abonelik tarihi dolduysa yeni bir sipariş oluşturulur.

# Kurulum:

- `npm install` ile node modüllerini indirin.
- `.env` dosyası oluşturun:

  ```
  DATABASE_URl = "DATABASE CONNECTION URL"
  JWT_SECRET = "ACCESS TOKEN JWT SECRET"
  REFRESH_SECRET = "REFRESH TOKEN JWT SECRET"
  JWT_TOKEN_EXPIRE_DATE = "10m"
  REFRESH_TOKEN_EXPIRE_DATE =  "1d"
  ```

- `npx prisma db push` ile tabloları oluşturun (veya prisma/migrations dosyasındaki sql dosyasını kullanın)

- `npm start` ile sunucuyu çalıştırın.

# Eklenebilecek özellikler:

- Refresh token middleware

- Payment API (Stripe vb)

- Birden fazla abonelik türü ve fiyatlandırması
