import Article from '@/components/Blogs/Artical'
import Page from '@/components/Page'
import { useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import axios from 'axios'

const dummyContent = [
      {
        "object": "block",
        "id": "28642431-d1e8-8023-baa6-e5f7ff1f53d5",
        "parent": {
          "type": "page_id",
          "page_id": "28642431-d1e8-809d-b27a-dc9a7416ccd2"
        },
        "created_time": "2025-10-08T06:37:00.000Z",
        "last_edited_time": "2025-10-08T06:37:00.000Z",
        "created_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "last_edited_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "has_children": false,
        "archived": false,
        "in_trash": false,
        "type": "paragraph",
        "paragraph": {
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "Bu rehberde size websiteniz için Ubuntu üzerinde Nginx server nasıl kurulur onu anlatmaya çalışacağım.",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "Bu rehberde size websiteniz için Ubuntu üzerinde Nginx server nasıl kurulur onu anlatmaya çalışacağım.",
              "href": null
            }
          ],
          "color": "default"
        }
      },
      {
        "object": "block",
        "id": "28642431-d1e8-80d1-8a7e-c9c34ffa9cbd",
        "parent": {
          "type": "page_id",
          "page_id": "28642431-d1e8-809d-b27a-dc9a7416ccd2"
        },
        "created_time": "2025-10-08T06:37:00.000Z",
        "last_edited_time": "2025-10-08T06:37:00.000Z",
        "created_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "last_edited_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "has_children": false,
        "archived": false,
        "in_trash": false,
        "type": "paragraph",
        "paragraph": {
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "Yüksek eş zamanlı çalışma kabiliyeti, yüksek performans ve düşük hafıza kullanımına odaklanılarak tasarlanmış bir Web serverdır.",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "Yüksek eş zamanlı çalışma kabiliyeti, yüksek performans ve düşük hafıza kullanımına odaklanılarak tasarlanmış bir Web serverdır.",
              "href": null
            }
          ],
          "color": "default"
        }
      },
      {
        "object": "block",
        "id": "28642431-d1e8-80d3-aaf9-c10b69332c3d",
        "parent": {
          "type": "page_id",
          "page_id": "28642431-d1e8-809d-b27a-dc9a7416ccd2"
        },
        "created_time": "2025-10-08T06:37:00.000Z",
        "last_edited_time": "2025-10-08T06:37:00.000Z",
        "created_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "last_edited_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "has_children": false,
        "archived": false,
        "in_trash": false,
        "type": "paragraph",
        "paragraph": {
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "Eğer Ubuntu serverınıza root girişi yaptıysanız başlayabiliriz.",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "Eğer Ubuntu serverınıza root girişi yaptıysanız başlayabiliriz.",
              "href": null
            }
          ],
          "color": "default"
        }
      },
      {
        "object": "block",
        "id": "28642431-d1e8-80c7-9164-c129023ea415",
        "parent": {
          "type": "page_id",
          "page_id": "28642431-d1e8-809d-b27a-dc9a7416ccd2"
        },
        "created_time": "2025-10-08T06:37:00.000Z",
        "last_edited_time": "2025-10-08T06:37:00.000Z",
        "created_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "last_edited_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "has_children": false,
        "archived": false,
        "in_trash": false,
        "type": "heading_3",
        "heading_3": {
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "Nginx kurulumu",
                "link": null
              },
              "annotations": {
                "bold": true,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "Nginx kurulumu",
              "href": null
            }
          ],
          "is_toggleable": false,
          "color": "default"
        }
      },
      {
        "object": "block",
        "id": "28642431-d1e8-8053-a928-d33ea191238d",
        "parent": {
          "type": "page_id",
          "page_id": "28642431-d1e8-809d-b27a-dc9a7416ccd2"
        },
        "created_time": "2025-10-08T06:37:00.000Z",
        "last_edited_time": "2025-10-08T06:37:00.000Z",
        "created_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "last_edited_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "has_children": false,
        "archived": false,
        "in_trash": false,
        "type": "paragraph",
        "paragraph": {
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "apt install nginx",
                "link": null
              },
              "annotations": {
                "bold": true,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": true,
                "color": "default"
              },
              "plain_text": "apt install nginx",
              "href": null
            }
          ],
          "color": "default"
        }
      },
      {
        "object": "block",
        "id": "28642431-d1e8-80ed-b957-cb615096b2cd",
        "parent": {
          "type": "page_id",
          "page_id": "28642431-d1e8-809d-b27a-dc9a7416ccd2"
        },
        "created_time": "2025-10-08T06:37:00.000Z",
        "last_edited_time": "2025-10-08T06:37:00.000Z",
        "created_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "last_edited_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "has_children": false,
        "archived": false,
        "in_trash": false,
        "type": "heading_3",
        "heading_3": {
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "Sitemizin dosyalarının tutulacağı dizinin oluşturulması",
                "link": null
              },
              "annotations": {
                "bold": true,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "Sitemizin dosyalarının tutulacağı dizinin oluşturulması",
              "href": null
            }
          ],
          "is_toggleable": false,
          "color": "default"
        }
      },
      {
        "object": "block",
        "id": "28642431-d1e8-801a-b2b0-e1d0f6b04db7",
        "parent": {
          "type": "page_id",
          "page_id": "28642431-d1e8-809d-b27a-dc9a7416ccd2"
        },
        "created_time": "2025-10-08T06:37:00.000Z",
        "last_edited_time": "2025-10-08T06:37:00.000Z",
        "created_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "last_edited_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "has_children": false,
        "archived": false,
        "in_trash": false,
        "type": "paragraph",
        "paragraph": {
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "Default olarak Nginx site dosyalarını ",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "Default olarak Nginx site dosyalarını ",
              "href": null
            },
            {
              "type": "text",
              "text": {
                "content": "/var/www/",
                "link": null
              },
              "annotations": {
                "bold": true,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": true,
                "color": "default"
              },
              "plain_text": "/var/www/",
              "href": null
            },
            {
              "type": "text",
              "text": {
                "content": " dizininde tutmaktadır siz istediğiniz yerde dosyalarınızı saklayabilirsiniz ben bu dizinde saklayacağım.",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": " dizininde tutmaktadır siz istediğiniz yerde dosyalarınızı saklayabilirsiniz ben bu dizinde saklayacağım.",
              "href": null
            }
          ],
          "color": "default"
        }
      },
      {
        "object": "block",
        "id": "28642431-d1e8-809e-8005-e15ba2803f26",
        "parent": {
          "type": "page_id",
          "page_id": "28642431-d1e8-809d-b27a-dc9a7416ccd2"
        },
        "created_time": "2025-10-08T06:37:00.000Z",
        "last_edited_time": "2025-10-08T06:37:00.000Z",
        "created_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "last_edited_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "has_children": false,
        "archived": false,
        "in_trash": false,
        "type": "paragraph",
        "paragraph": {
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "mkdir deneme.com",
                "link": null
              },
              "annotations": {
                "bold": true,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": true,
                "color": "default"
              },
              "plain_text": "mkdir deneme.com",
              "href": null
            }
          ],
          "color": "default"
        }
      },
      {
        "object": "block",
        "id": "28642431-d1e8-8044-9176-e38a60eb5d10",
        "parent": {
          "type": "page_id",
          "page_id": "28642431-d1e8-809d-b27a-dc9a7416ccd2"
        },
        "created_time": "2025-10-08T06:37:00.000Z",
        "last_edited_time": "2025-10-08T06:37:00.000Z",
        "created_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "last_edited_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "has_children": false,
        "archived": false,
        "in_trash": false,
        "type": "heading_3",
        "heading_3": {
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "Nginx için sites-available dizininde yeni sitemizin oluşturulması",
                "link": null
              },
              "annotations": {
                "bold": true,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "Nginx için sites-available dizininde yeni sitemizin oluşturulması",
              "href": null
            }
          ],
          "is_toggleable": false,
          "color": "default"
        }
      },
      {
        "object": "block",
        "id": "28642431-d1e8-808f-80e0-ff7394418acc",
        "parent": {
          "type": "page_id",
          "page_id": "28642431-d1e8-809d-b27a-dc9a7416ccd2"
        },
        "created_time": "2025-10-08T06:37:00.000Z",
        "last_edited_time": "2025-10-08T06:37:00.000Z",
        "created_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "last_edited_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "has_children": false,
        "archived": false,
        "in_trash": false,
        "type": "paragraph",
        "paragraph": {
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "Bu dizinde sitemizin yapılandırma dosyasını oluşturacağız.",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "Bu dizinde sitemizin yapılandırma dosyasını oluşturacağız.",
              "href": null
            }
          ],
          "color": "default"
        }
      },
      {
        "object": "block",
        "id": "28642431-d1e8-8040-9cdf-c9bf640f5f3b",
        "parent": {
          "type": "page_id",
          "page_id": "28642431-d1e8-809d-b27a-dc9a7416ccd2"
        },
        "created_time": "2025-10-08T06:37:00.000Z",
        "last_edited_time": "2025-10-08T06:37:00.000Z",
        "created_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "last_edited_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "has_children": false,
        "archived": false,
        "in_trash": false,
        "type": "paragraph",
        "paragraph": {
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "cd /etc/nginx/sites-available",
                "link": null
              },
              "annotations": {
                "bold": true,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": true,
                "color": "default"
              },
              "plain_text": "cd /etc/nginx/sites-available",
              "href": null
            },
            {
              "type": "text",
              "text": {
                "content": " ",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": " ",
              "href": null
            },
            {
              "type": "text",
              "text": {
                "content": "touch deneme.com",
                "link": null
              },
              "annotations": {
                "bold": true,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": true,
                "color": "default"
              },
              "plain_text": "touch deneme.com",
              "href": null
            }
          ],
          "color": "default"
        }
      },
      {
        "object": "block",
        "id": "28642431-d1e8-8035-80bd-fadca6ad07bb",
        "parent": {
          "type": "page_id",
          "page_id": "28642431-d1e8-809d-b27a-dc9a7416ccd2"
        },
        "created_time": "2025-10-08T06:37:00.000Z",
        "last_edited_time": "2025-10-08T06:37:00.000Z",
        "created_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "last_edited_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "has_children": false,
        "archived": false,
        "in_trash": false,
        "type": "heading_3",
        "heading_3": {
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "Yeni sitemizin yapılandırmasının yapılması",
                "link": null
              },
              "annotations": {
                "bold": true,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "Yeni sitemizin yapılandırmasının yapılması",
              "href": null
            }
          ],
          "is_toggleable": false,
          "color": "default"
        }
      },
      {
        "object": "block",
        "id": "28642431-d1e8-80d7-9c66-d2555e7dc955",
        "parent": {
          "type": "page_id",
          "page_id": "28642431-d1e8-809d-b27a-dc9a7416ccd2"
        },
        "created_time": "2025-10-08T06:37:00.000Z",
        "last_edited_time": "2025-10-08T06:37:00.000Z",
        "created_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "last_edited_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "has_children": false,
        "archived": false,
        "in_trash": false,
        "type": "paragraph",
        "paragraph": {
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "Yukarıda oluşturduğumuz deneme.com dosyasını istediğiniz editörle açabilirsiniz. Çoğu linux dağıtımında nano ve vim yüklü olarak gelmektedir ben vim kullanacağım.",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "Yukarıda oluşturduğumuz deneme.com dosyasını istediğiniz editörle açabilirsiniz. Çoğu linux dağıtımında nano ve vim yüklü olarak gelmektedir ben vim kullanacağım.",
              "href": null
            }
          ],
          "color": "default"
        }
      },
      {
        "object": "block",
        "id": "28642431-d1e8-8051-b823-cdd62f46e415",
        "parent": {
          "type": "page_id",
          "page_id": "28642431-d1e8-809d-b27a-dc9a7416ccd2"
        },
        "created_time": "2025-10-08T06:37:00.000Z",
        "last_edited_time": "2025-10-08T06:37:00.000Z",
        "created_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "last_edited_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "has_children": false,
        "archived": false,
        "in_trash": false,
        "type": "paragraph",
        "paragraph": {
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "vim deneme.com",
                "link": null
              },
              "annotations": {
                "bold": true,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": true,
                "color": "default"
              },
              "plain_text": "vim deneme.com",
              "href": null
            }
          ],
          "color": "default"
        }
      },
      {
        "object": "block",
        "id": "28642431-d1e8-80cb-802f-c9f2988c29ae",
        "parent": {
          "type": "page_id",
          "page_id": "28642431-d1e8-809d-b27a-dc9a7416ccd2"
        },
        "created_time": "2025-10-08T06:37:00.000Z",
        "last_edited_time": "2025-10-08T06:37:00.000Z",
        "created_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "last_edited_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "has_children": false,
        "archived": false,
        "in_trash": false,
        "type": "paragraph",
        "paragraph": {
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "Yukarıdaki komutu çalıştırıp vim’e girdikten sonra insert tuşu ile yazma moduna geçebilirsiniz.",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "Yukarıdaki komutu çalıştırıp vim’e girdikten sonra insert tuşu ile yazma moduna geçebilirsiniz.",
              "href": null
            }
          ],
          "color": "default"
        }
      },
      {
        "object": "block",
        "id": "28642431-d1e8-80ac-b5b4-c16465e0b12c",
        "parent": {
          "type": "page_id",
          "page_id": "28642431-d1e8-809d-b27a-dc9a7416ccd2"
        },
        "created_time": "2025-10-08T06:37:00.000Z",
        "last_edited_time": "2025-10-08T07:57:00.000Z",
        "created_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "last_edited_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "has_children": false,
        "archived": false,
        "in_trash": false,
        "type": "paragraph",
        "paragraph": {
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "Açılan boş sayfaya aşağıdaki konfigürasyonları yazalım.\n\n",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "Açılan boş sayfaya aşağıdaki konfigürasyonları yazalım.\n\n",
              "href": null
            }
          ],
          "color": "default"
        }
      },
      {
        "object": "block",
        "id": "28642431-d1e8-800b-86bf-ca77f8ae0e71",
        "parent": {
          "type": "page_id",
          "page_id": "28642431-d1e8-809d-b27a-dc9a7416ccd2"
        },
        "created_time": "2025-10-08T07:57:00.000Z",
        "last_edited_time": "2025-10-08T07:57:00.000Z",
        "created_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "last_edited_by": {
          "object": "user",
          "id": "91a84052-5c75-44af-a7e5-fff2ad2b89fa"
        },
        "has_children": false,
        "archived": false,
        "in_trash": false,
        "type": "code",
        "code": {
          "caption": [],
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "server {\n    listen 80;\n    server_name deneme.com www.deneme.com;\n    root /var/www/deneme.com;\n    index index.html;\n    access_log /var/log/nginx/deneme.com.access.log;\n    error_log /var/log/nginx/deneme.com.error.log;\n    location / { try_files $uri /index.html =404; }\n}\n",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "server {\n    listen 80;\n    server_name deneme.com www.deneme.com;\n    root /var/www/deneme.com;\n    index index.html;\n    access_log /var/log/nginx/deneme.com.access.log;\n    error_log /var/log/nginx/deneme.com.error.log;\n    location / { try_files $uri /index.html =404; }\n}\n",
              "href": null
            }
          ],
          "language": "json"
        }
      }
    ]

export function BlogPost() {
  const { slug } = useParams({ from: '/blog/$slug' as never })

  const { data: postData, isLoading } = useQuery({
    queryKey: ['blogPost', slug],
    queryFn: async (): Promise<Post> => {
      const result = await axios.get(`/blogs/${slug}`)
      return result.data.post
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  if (isLoading) {
    return (
      <Page title="Loading..." description="Fetching article">
        <div className="my-16 animate-pulse">
          {/* Title Skeleton */}
          <div className="h-10 w-3/4 mb-6 rounded bg-gray-700/40"></div>

          {/* Tags Skeleton */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-6 w-16 rounded-full bg-gray-700/40"></div>
            ))}
          </div>

          {/* Author + Date Skeleton */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-8 rounded-full bg-gray-700/40"></div>
            <div className="h-4 w-40 rounded bg-gray-700/40"></div>
            <div className="h-4 w-24 rounded bg-gray-700/40"></div>
          </div>

          {/* Cover Image Skeleton */}
          <div className="h-[300px] w-full rounded bg-gray-700/40 mb-10"></div>

          {/* Content Skeleton */}
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-4 w-full rounded bg-gray-700/40"></div>
            ))}
          </div>
        </div>
      </Page>
    )
  }

  let { title, description, cover, date, tags, readingTime, content } =
    postData || {}
    if(!content) content = dummyContent

  return (
    <Page
      title={`${title} - Vikas Rathod`}
      description={description}
      image={cover}
      date={date ? new Date(date).toISOString() : undefined}
      type="article"
    >
      <div className="my-16">
        <h1 className="mb-4 text-4xl font-semibold sm:text-5xl">{title}</h1>

        <div className="mb-8 flex flex-wrap gap-2 text-xs">
          {tags?.map((tag) => (
            <span
              key={tag}
              className="
                inline-block
                rounded-full
                px-3 py-1
                backdrop-blur-md
                border
                text-gray-800
                dark:text-gray-100
                shadow-[0_4px_12px_rgba(0,0,0,0.05)]
                dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)]
                bg-white/40
                dark:bg-white/10
                border-gray-300/30
                dark:border-white/20
                hover:bg-white/60
                dark:hover:bg-white/20
                transition-all
                duration-300
                cursor-default
                animate-fade-in
              "
            >
              #{tag}
            </span>
          ))}
        </div>


        <div className="flex flex-col w-full text-lg sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <img
              src="/media/profile.jpeg"
              alt="Author"
              height={24}
              width={24}
              className="rounded-full object-cover"
            />
            <span>Vikas Rathod / </span>
            {date
              ? new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                })
              : null}
          </div>
          <span className="sm:ml-auto">{readingTime} min read</span>
        </div>

        {cover ? (
          <div className="relative mt-10 w-full">
            <img
              src={cover}
              alt={title}
              className="mx-auto h-auto w-full rounded object-cover"
              style={{ maxHeight: '400px' }}
            />
          </div>
        ) : null}
      </div>

      {content ? <Article content={content} /> : null}
    </Page>
  )
}
