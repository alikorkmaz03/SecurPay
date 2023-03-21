# NtStore

NtStore, bir e-ticaret web uygulamasıdır. Bu uygulama, ASP.NET Core 6, client tarafı React18 ve Entity Framework Core kullanılarak geliştirilmiştir.

## Client 
Redux: React uygulamalarında kullanılan bir durum yöneticisidir.
React Router: Sayfa yönlendirmesi yapmak için kullanılan bir React kütüphanesidir.
Axios: HTTP istekleri göndermek için kullanılan bir JavaScript kütüphanesidir.
Material-UI: Material Design prensiplerine uygun tasarım bileşenleri sunan bir React kütüphanesidir.

## Özellikler

- Ürün kategorileri ve alt kategorileri oluşturma ve yönetme
- Ürün ekleme, güncelleme ve silme işlemleri
- Müşteri hesapları oluşturma, düzenleme ve silme işlemleri
- Sepet oluşturma ve düzenleme işlemleri
- Sipariş oluşturma, düzenleme ve iptal işlemleri
- Ödeme işlemleri (Stripe ödeme ağ geçidi kullanılarak)

## Yükleme ve Kullanım

1. Bu uygulamayı indirin veya kopyalayın.
2. Visual Studio'da `NtStore.sln` dosyasını açın.
3. `appsettings.json` dosyasında gerekli ayarları yapılandırın. Özellikle, Stripe ödeme ağ geçidi anahtarınızı burada belirtmeniz gerekmektedir.
4. `Package Manager Console` penceresinde `Update-Database` komutunu çalıştırarak veritabanınızı güncelleyin.
5. Uygulamayı başlatın.

## Katkıda Bulunma

- Herhangi bir hata veya sorunla karşılaşırsanız, lütfen bir [issue](https://github.com/alikorkmaz03/NtStore/issues) oluşturun.
- Katkıda bulunmak için bir [pull request](https://github.com/alikorkmaz03/NtStore/pulls) gönderin.
- Herhangi bir sorunuz veya öneriniz varsa, lütfen bir [email](mailto:example@example.com) gönderin.

## Lisans

Bu proje MIT lisansı ile lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasını inceleyebilirsiniz.
