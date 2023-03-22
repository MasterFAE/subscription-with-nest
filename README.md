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

- Şuanda tek bir abonelik türü ve fiyatlandırma mevcut. Eğer birden fazla ödeme planı ve abonelik türü eklenmek isterse şunları yapardım:
  1- "SUBSCRIPTION_TYPES" adında bir tablo oluşturup içerisine "price", "name", "duration" gibi özellikler atardım.

  2- Subscription'u SUBSCRIPTION_TYPES tablosuna 1-1 olarak bağlardım ve ödeme dönemini hesaplamak istediğimde veya kullanıcıdan alınacak ücreti hesaplamaya ihtiyaç duyulduğu zaman bu bilgileri kullanırdım.
