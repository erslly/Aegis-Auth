# 🛡️ Next.js Kimlik Doğrulama API'si

Bu proje, **Next.js API Routes**, **MongoDB**, **bcrypt** ve **JWT** kullanarak güvenli bir kullanıcı kimlik doğrulama sistemi sağlar. Kullanıcılar **kayıt olabilir, giriş yapabilir ve JWT token ile kimlik doğrulaması yapabilir**.

---

## 🚀 Özellikler
✅ Kullanıcı kaydı (**şifre & e-posta şifreleme** ile)  
✅ Kullanıcı girişi (JWT token ile)  
✅ Güçlü şifreleme (**bcrypt**)  
✅ JWT ile kimlik doğrulama  
✅ MongoDB ile kullanıcı verisi saklama  
✅ Güçlü API endpointleri  
✅ Hata yönetimi ve güvenli API kullanımı  

---

## 🛠️ Kurulum

Öncelikle, projenizi yerel ortamınıza klonlayın:
```sh
$ git clone https://github.com/erslly/Aegis-Auth.git
$ cd proje-adi
```

Gerekli bağımlılıkları yükleyin:
```sh
$ npm install
# veya
$ yarn install
```

**.env.local** dosyanızı oluşturun ve aşağıdaki bilgileri ekleyin:
```env
MONGODB_URI=mongodb+srv://kullanici:şifre@cluster.mongodb.net/veritabani
JWT_SECRET=supergizlisifre
```

Sunucuyu başlatın:
```sh
$ npm run dev
```
**🔹 Artık API'niz http://localhost:3000 üzerinde çalışıyor!**

---

## 📌 Kullanım

### 1️⃣ Kullanıcı Kaydı
🔹 **Endpoint:** `POST /api/auth/register`

```json
{
  "username": "erslly",
  "email": "dev@erslly.xyz",
  "password": "123456"
}
```
✅ **Başarıyla kayıt olduktan sonra:**
```json
{
  "message": "Kullanıcı başarıyla kaydedildi",
  "user": {
    "username": "erslly",
    "email": "dev@erslly.xyz"
  }
}
```

### 2️⃣ Kullanıcı Girişi
🔹 **Endpoint:** `POST /api/auth/login`

```json
{
  "email": "dev@erslly.xyz",
  "password": "123456"
}
```
✅ **Başarıyla giriş yapıldıktan sonra:**
```json
{
  "message": "Giriş başarılı",
  "token": "JWT_TOKEN"
}
```

### 3️⃣ Kullanıcı Listesi (Admin Yetkisi Gerekir)
🔹 **Endpoint:** `GET /api/auth/login`
🔹 **Yanıt:**
```json
[
  {
    "username": "erslly",
    "email": "dev@erslly.xyz"
  }
]
```

---

## ⚡ Teknolojiler
Bu projede aşağıdaki teknolojiler kullanılmıştır:
- **Next.js** - API Routes
- **MongoDB & Mongoose** - NoSQL veritabanı
- **bcryptjs** - Şifre hashleme
- **jsonwebtoken (JWT)** - Kimlik doğrulama
- **TypeScript** - Güçlü tip desteği

---

## 🔒 Güvenlik Önlemleri
✅ **Şifreler bcrypt ile hashlenir, düz metin olarak saklanmaz.**  
✅ **JWT token’ler çevresel değişkende saklanır.**  
✅ **E-posta şifreleme ve güçlü giriş doğrulaması mevcuttur.**  

---

## 🤝 Katkıda Bulunma
Katkıda bulunmak isterseniz, lütfen bir **pull request (PR)** açmadan önce **issue** oluşturun.  

1. **Fork** edin 📌
2. **Yeni bir branch oluşturun** (`git checkout -b yeni-ozellik`)
3. **Değişiklikleri yapın ve commit atın** (`git commit -m 'Yeni özellik eklendi'`)
4. **Push edin** (`git push origin yeni-ozellik`)
5. **PR açın!** 🎉

---

## 👨‍💻 Geliştirici
[erslly](https://erslly.xyz)    

---

💙 **Desteğin için teşekkürler!** Eğer beğendiysen ⭐ **starlamayı** unutma!

