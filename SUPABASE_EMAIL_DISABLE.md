# Supabase Email Confirmation'ı Kapatma

Supabase'in otomatik email'lerini kapatmak için aşağıdaki adımları izleyin:

## 1. Supabase Dashboard'a Giriş Yapın

1. https://supabase.com/dashboard adresine gidin
2. Projenizi seçin: `kfiyugabaljsluayycye`

## 2. Authentication Settings

1. Sol menüden **Authentication** → **Settings** seçin
2. **Email Auth** bölümünde:
   - ✅ **"Enable email confirmations"** → **KAPALI** yapın
   - ✅ **"Enable email change confirmations"** → **KAPALI** yapın
   - ✅ **"Secure email change"** → **KAPALI** yapın

## 3. Email Templates

1. **Authentication** → **Email Templates** seçin
2. Tüm template'leri silin veya devre dışı bırakın:
   - Confirm signup
   - Magic Link
   - Change Email Address
   - Reset Password

## 4. Webhooks (Opsiyonel)

Eğer hala email geliyorsa:
1. **Database** → **Webhooks** seçin
2. Auth webhook'larını kontrol edin ve gerekirse kaldırın

## 5. Test

1. Yeni bir kullanıcı kaydedin
2. Sadece Muffin'den "Hoş Geldin" email'i gelmeli
3. Supabase'den confirmation email'i gelmemeli

## Not

Kod tarafında email confirmation zaten devre dışı bırakıldı. Ancak Supabase dashboard'unda da kapatmanız gerekiyor.
