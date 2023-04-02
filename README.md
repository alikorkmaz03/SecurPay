# SecurePay

Securepay, bir e-ticaret web uygulamasıdır. Bu uygulama, ASP.NET Core 6, client tarafı React18 ve Entity Framework Core kullanılarak geliştirilmiştir.

## Kullanılan Teknolojiler 
- Redux: React uygulamalarında kullanılan bir durum yöneticisidir.
- React Router: Sayfa yönlendirmesi yapmak için kullanılan bir React kütüphanesidir.
- Axios: HTTP istekleri göndermek için kullanılan bir JavaScript kütüphanesidir.
- Material-UI: Material Design prensiplerine uygun tasarım bileşenleri sunan bir React kütüphanesidir.
- React Hook Form
- [Material-UI](https://mui.com/)
- [Stripe](https://stripe.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Yup](https://github.com/jquense/yup)
- .Net6 Web API
- Entity Framework
- Swagger
- Stripe for Backend
- Stripe Webhook 
    Yardımcı komutlar:
     stripe login
     stripe listen
     (stripe listen -f http://localhost:5000/api/payments/webhook -e charge.succeeded)
- .Net SecretKey İmplementasyonu 
    Yardımcı Komutlar  Örnektir: 
    dotnet user-secrets set "Movies:ServiceApiKey" "12345"  
    dotnet user-secret list

    https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-7.0&tabs=windows
- Docker 
    Yardımcı Komutlar  Örnektir: 
    PostgreSQL komutu->docker run --name dev -e POSTGRES_USER=appuser -e POSTGRES_PASSWORD=secretpassword -p 5432:5432 -d postgres:latest

    Migration Postgres->dotnet ef migrations add PostgresInitial -o Data/Migrationsdonet
    
    docker build -t eticaret/securepay .
    docker push eticaret/securepay
    docker run --rm -it -p 8080:80 eticaret/securepay

## Özellikler

- Ürün ekleme işlemleri
- Müşteri hesapları oluşturma işlemleri
- Sepet oluşturma ve düzenleme işlemleri
- Sipariş oluşturma, düzenleme işlemleri
- Ödeme işlemleri (Stripe ödeme ağ geçidi kullanılarak)
- Ödemeleri Listeleme İşlemleri
- Ödemeleri belirtilen tarih aralığına göre filtreleme işlemi
- Ödemeli müşteri adı ile dinamik arama işlemleri

## Yükleme ve Kullanım

1. Bu uygulamayı indirin veya kopyalayın.
2. Visual Studio'da `Securepay.sln` dosyasını açın.
3. `appsettings.json` dosyasında gerekli ayarları yapılandırın. Özellikle, Stripe ödeme ağ geçidi anahtarınızı burada belirtmeniz gerekmektedir.
4. `Package Manager Console` penceresinde `Update-Database` komutunu çalıştırarak veritabanınızı güncelleyin.
5. Uygulamayı başlatın.

## Katkıda Bulunma

- Herhangi bir hata veya sorunla karşılaşırsanız, lütfen bir [issue](https://github.com/alikorkmaz03/Securepay/issues) oluşturun.
- Katkıda bulunmak için bir [pull request](https://github.com/alikorkmaz03/Securepay/pulls) gönderin.
- Herhangi bir sorunuz veya öneriniz varsa, lütfen bir [email](mailto:alikorkmaz03@gmail.com) gönderin.

## Lisans

Bu proje MIT lisansı ile lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasını inceleyebilirsiniz.
