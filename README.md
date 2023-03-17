# Discopedia Back-End

# Contexto

API, parte de um projeto Fullstack, objetivando um CRUD, que alimenta uma aplicação, que funciona como uma enciclopédia de 
discos.

# Habilidades:

Nesse parte do projeto utilizei as seguintes habilidades e conhecimentos:

- Conhecimento dos pilares da `Programação Orientada a Objetos`: `Herança`, `Abstração`, `Encapsulamento` e `Polimorfismo`;
- `Composição`;
- `Interfaces`;
- Em `TypeScript`: `Classes`, `Instâncias`, `Atributos`, `Métodos` e `Objetos`;
- Conhecimentos de `MongoDB`, `Typescript` e `POO` para criar uma API com `CRUD`.

---
# Ferramentas usadas 🧰

 🔨 Neste projeto, utilizei as seguintes ferramentas:
 - Para validações de informações: `zod`;
 - Para modelagem de dados: `NodeJs`, `Express` e `mongoose`;
 - Para token de acesso e autenticação e autorização de usuários em aplicativos web e serviços: `jsonwebtoken` 
 - Para a decifração dos tokens: `jwt-decode`
 - Para verificar a integridade de dados e garantir que eles não tenham sido modificados durante a transferência ou 
 armazenamento: `ts-md5`.
 - Para tratar automaticamente exceções assíncronas geradas em rotas Express sem a necessidade de usar blocos try-catch
 explicitamente em cada rota: `express-async-errors`.

---
# Utilizando a aplicação
Para ver a aplicação funcionando:
- Clone esse repositório `git clone git@github.com:AlectorAlexander/discopedia.git`
- Entre na pasta `**/discopedia**`
- abra o terminal nessa pasta
- instale as dependências `npm install`
- starte a aplicação com `npm start`
- espere aparecer a mensagem no terminal `Running server on port: 3001`
## Rotas do Backend

Lembrando que todas as rotas que começam com `/disks` precisam de validação de Token. O que significa que apenas um 
usuário "logado" poderia ter acesso aos dados dessa (e variantes dessa) rota.

# Endpoint (`/disks`)

# A rota do tipo `POST`

- O body da requisição deve conterá o seguinte formato:
  ```json
  {
        "title": "... E A GENTE NEM DEU NOME",
        "details": {
            "Característica:": "  vocal ",
            "Gravadora:": "EMI-Odeon",
            "Produtor:": "",
            "Formatos:": "  LP (1981) / CD (2003) ",
            "Lançamento:": "  1981 ",
            "Observação:": "  CD da série \"2 Em 1\". Outro disco do CD, CHORA BRASILEIRA (1985). "
        },
        "artist": "Nana Caymmi",
        "musics": [
            " 1 . Café Com Pão (Jodel)  ",
            " 2 . Direto No Coração  ",
            " 3 . Você Que Me Ouve  ",
            " 4 . Mas Quem Disse Que Eu Te Esqueço?  ",
            " 5 . Inda Lá  ",
            " 6 . Nem Uma Lágrima  ",
            " 7 . Brisa Do Mar  ",
            " 8 . Rastro De Perfume  ",
            " 9 . Primeira Estrela  ",
            " 10 . Bons Amigos  "
        ],
        "url_img": "https://discografia.discosdobrasil.com.br/storage/capas/DI02730.jpg",
        "album_link": "https://music.youtube.com/browse/MPREb_Gj6ZNPEarof"
    }
    ```
- Saídas
   - Sua API deve responder com status http `201` e o seguinte body:
 ```JSON
 {
    _id: "4edd40c86762e0fb12000003",
   "title": "... E A GENTE NEM DEU NOME",
        "details": {
            "Característica:": "  vocal ",
            "Gravadora:": "EMI-Odeon",
            "Produtor:": "",
            "Formatos:": "  LP (1981) / CD (2003) ",
            "Lançamento:": "  1981 ",
            "Observação:": "  CD da série \"2 Em 1\". Outro disco do CD, CHORA BRASILEIRA (1985). "
        },
        "artist": "Nana Caymmi",
        "musics": [
            " 1 . Café Com Pão (Jodel)  ",
            " 2 . Direto No Coração  ",
            " 3 . Você Que Me Ouve  ",
            " 4 . Mas Quem Disse Que Eu Te Esqueço?  ",
            " 5 . Inda Lá  ",
            " 6 . Nem Uma Lágrima  ",
            " 7 . Brisa Do Mar  ",
            " 8 . Rastro De Perfume  ",
            " 9 . Primeira Estrela  ",
            " 10 . Bons Amigos  "
        ],
        "url_img": "https://discografia.discosdobrasil.com.br/storage/capas/DI02730.jpg",
        "album_link": "https://music.youtube.com/browse/MPREb_Gj6ZNPEarof"
    }
  ```
 - A rota retorna erro `400` caso a requisição receba um objeto vazio;
 - A rota retorna erro `400` ao tentar criar um disco com qualquer um dos campos vazios;
 - Não é possível criar um disco se os atributos estiverem com tipos errados;
 
 # A rota do tipo `GET`

- Saídas
   - Sua API deve responder com status http `200` e o seguinte body:
 ```JSON
    [{
    _id: "4edd40c86762e0fb12000003",
   "title": "... E A GENTE NEM DEU NOME",
        "details": {
            "Característica:": "  vocal ",
            "Gravadora:": "EMI-Odeon",
            "Produtor:": "",
            "Formatos:": "  LP (1981) / CD (2003) ",
            "Lançamento:": "  1981 ",
            "Observação:": "  CD da série \"2 Em 1\". Outro disco do CD, CHORA BRASILEIRA (1985). "
        },
        "artist": "Nana Caymmi",
        "musics": [
            " 1 . Café Com Pão (Jodel)  ",
            " 2 . Direto No Coração  ",
            " 3 . Você Que Me Ouve  ",
            " 4 . Mas Quem Disse Que Eu Te Esqueço?  ",
            " 5 . Inda Lá  ",
            " 6 . Nem Uma Lágrima  ",
            " 7 . Brisa Do Mar  ",
            " 8 . Rastro De Perfume  ",
            " 9 . Primeira Estrela  ",
            " 10 . Bons Amigos  "
        ],
        "url_img": "https://discografia.discosdobrasil.com.br/storage/capas/DI02730.jpg",
        "album_link": "https://music.youtube.com/browse/MPREb_Gj6ZNPEarof"
    }]
 ```
# Endpoint (`/disks/:id`)

# A rota do tipo `GET`

- Saídas
   - Sua API deve responder com status http `200` e o seguinte body:
 ```JSON
    {
    _id: "4edd40c86762e0fb12000003",
   "title": "... E A GENTE NEM DEU NOME",
        "details": {
            "Característica:": "  vocal ",
            "Gravadora:": "EMI-Odeon",
            "Produtor:": "",
            "Formatos:": "  LP (1981) / CD (2003) ",
            "Lançamento:": "  1981 ",
            "Observação:": "  CD da série \"2 Em 1\". Outro disco do CD, CHORA BRASILEIRA (1985). "
        },
        "artist": "Nana Caymmi",
        "musics": [
            " 1 . Café Com Pão (Jodel)  ",
            " 2 . Direto No Coração  ",
            " 3 . Você Que Me Ouve  ",
            " 4 . Mas Quem Disse Que Eu Te Esqueço?  ",
            " 5 . Inda Lá  ",
            " 6 . Nem Uma Lágrima  ",
            " 7 . Brisa Do Mar  ",
            " 8 . Rastro De Perfume  ",
            " 9 . Primeira Estrela  ",
            " 10 . Bons Amigos  "
        ],
        "url_img": "https://discografia.discosdobrasil.com.br/storage/capas/DI02730.jpg",
        "album_link": "https://music.youtube.com/browse/MPREb_Gj6ZNPEarof"
    }
 ```
 - É possível listar um disco com sucesso através do id;
 - É disparado o erro `400` `Id must have 24 hexadecimal characters` caso o id possua menos que 24 caracteres;
 - É disparado o erro `404` `Object not found` caso o id possua 24 caracteres mas é inválido;

# A rota do tipo `PUT`

- Saídas
   - Sua API deve responder com status http `200` e o seguinte body:
 ```JSON
    {
    _id: "4edd40c86762e0fb12000003",
   "title": "... E A GENTE NEM DEU NOME",
        "details": {
            "Característica:": "  vocal ",
            "Gravadora:": "EMI-Odeon",
            "Produtor:": "",
            "Formatos:": "  LP (1981) / CD (2003) ",
            "Lançamento:": "  1981 ",
            "Observação:": "  CD da série \"2 Em 1\". Outro disco do CD, CHORA BRASILEIRA (1985). "
        },
        "artist": "Nana Caymmi",
        "musics": [
            " 1 . Café Com Pão (Jodel)  ",
            " 2 . Direto No Coração  ",
            " 3 . Você Que Me Ouve  ",
            " 4 . Mas Quem Disse Que Eu Te Esqueço?  ",
            " 5 . Inda Lá  ",
            " 6 . Nem Uma Lágrima  ",
            " 7 . Brisa Do Mar  ",
            " 8 . Rastro De Perfume  ",
            " 9 . Primeira Estrela  ",
            " 10 . Bons Amigos  "
        ],
        "url_img": "https://discografia.discosdobrasil.com.br/storage/capas/DI02730.jpg",
        "album_link": "https://music.youtube.com/browse/MPREb_Gj6ZNPEarof"
    }
 ```
 - É disparado o erro `404` `Object not found` caso o id possua 24 caracteres mas é inválido;
 - É disparado o erro `400` `Id must have 24 hexadecimal characters` caso o id possua menos que 24 caracteres;
 - É disparado o erro `400` caso o `body` esteja incompleto;
 - Será verificado que um disco é atualizado com sucesso;

# A rota do tipo `DELETE`

- Saídas
   - Sua API deve responder com status http `204` e o seguinte body:
 ```JSON
    {}
   ```

 - É disparado o erro `404` `Object not found` caso o id possua 24 caracteres mas é inválido;
 - É disparado o erro `400` `Id must have 24 hexadecimal characters` caso o id possua menos que 24 caracteres;
 - Será verificado que um disco é removido com sucesso;

# Endpoint (`/disks/params`)

# A rota do tipo `POST`
- O body da requisição deve conterá o seguinte formato:
  ```json
  {
    "title": "E A GENTE NEM ",
    "artist": "Caymmi",
    "details.Lancamento": ["1980-01-01", "2022-12-31"]
}
    ```
- Saídas
   - Sua API deve responder com status http `201` e o seguinte body:
 ```JSON
  [{
    _id: "4edd40c86762e0fb12000003",
   "title": "... E A GENTE NEM DEU NOME",
        "details": {
            "Característica:": "  vocal ",
            "Gravadora:": "EMI-Odeon",
            "Produtor:": "",
            "Formatos:": "  LP (1981) / CD (2003) ",
            "Lançamento:": "  1981 ",
            "Observação:": "  CD da série \"2 Em 1\". Outro disco do CD, CHORA BRASILEIRA (1985). "
        },
        "artist": "Nana Caymmi",
        "musics": [
            " 1 . Café Com Pão (Jodel)  ",
            " 2 . Direto No Coração  ",
            " 3 . Você Que Me Ouve  ",
            " 4 . Mas Quem Disse Que Eu Te Esqueço?  ",
            " 5 . Inda Lá  ",
            " 6 . Nem Uma Lágrima  ",
            " 7 . Brisa Do Mar  ",
            " 8 . Rastro De Perfume  ",
            " 9 . Primeira Estrela  ",
            " 10 . Bons Amigos  "
        ],
        "url_img": "https://discografia.discosdobrasil.com.br/storage/capas/DI02730.jpg",
        "album_link": "https://music.youtube.com/browse/MPREb_Gj6ZNPEarof"
    }]
 ```
 
 # Endpoint (`/disks/pagination`)

# A rota do tipo `POST`
- O body da requisição deve conterá o seguinte formato:
  ```json
  {
  "page": <number>,
  "limit": <number>
}
    ```
- Saídas
   - Sua API deve responder com status http `201` e o seguinte body:
 ```JSON
  [  
{    "_id": "<string>",
      "title": "<string>",
      "artist": "<string>",
      "details": {    
          "Caracteristica": "<string>",
          "Formatos": "<string>",
          "Gravadora": "<string>",
          "Produtor": "<string>",
          "Lancamento": "<Date>"    },
          "musics": ["<string>", ...]
  },
]

 ```
 
 # Endpoint (`/login`)

# A rota do tipo `POST`

- O body da requisição deve conterá o seguinte formato:
  ```json
  {
    "email": 'user@gmail.com',
    "senha": "queijo_suiço"
  }
  ```
- Saídas
   - Sua API deve responder com status http `200` e o seguinte body:
 ```JSON
   {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21lIjoiQWxiZXJ0byBKdXN0dXMiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbmlzdHJhZG9yIiwiaWF0IjoxNjY4Mjc2OTQyLCJleHAiOjE2Njg4ODE3NDJ9.LbOZ2nUZOP1UGhAlobTeNF35J5OIa4WKopYrDNLxuwk"
}
 ```
 # Endpoint (`/register`)

# A rota do tipo `POST`

- O body da requisição deve conterá o seguinte formato:
  ```json
  {
      "nome": "alberto",
      "email": "alberto@gmail.com",
      "role": "user",
      "senha": "queijo_suiço"
    }
  ```
- Saídas
   - Sua API deve responder com status http `200` e o seguinte body:
 ```JSON
   {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21lIjoiQWxiZXJ0byBKdXN0dXMiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbmlzdHJhZG9yIiwiaWF0IjoxNjY4Mjc2OTQyLCJleHAiOjE2Njg4ODE3NDJ9.LbOZ2nUZOP1UGhAlobTeNF35J5OIa4WKopYrDNLxuwk"
}
 ```
 

  
