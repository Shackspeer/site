# WEB PROJESI YONETIMI

## DOSYALARI YÜKLEMEK İÇİN : 
``` git clone https://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@github.com/Shackspeer/site.git ```

### VUE CLI KURULUM:
``` npm install -g @vue/cli ```

### VUE CLI SUNUCUSU BAŞLAT:
``` npm run serve / npm run build ```


### API İÇİN MODÜL YÜKLE:
```
npm install express
npm install cors
npm install mysql
npm install body-parser
```

### WEB SERVER VE API ARASINDAKİ BAĞLANTI

Tüm veritabanı işlemleri local bilgisayara göre şekillendirildiği için 
dosyaları yükledikten sonra **192.168.184.214** ip adresi geçen her yeri kendi local ip adresinize göre değiştirmeniz gerekiyor

```
ÖRNEK:

KAYITLI IP : 192.168.184.214:8080,
lOCAL IP : 192.168.1.4,

LOCAL IP ADRESİNE GÖRE ŞEKİLLENDİRİLMİŞ SON HALİ : 192.168.1.4:8080 
```

### API BAŞLAT
``` node /src/db/server.js ```


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
