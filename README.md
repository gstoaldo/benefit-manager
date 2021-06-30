# benefit-manager

Aplicação para gerenciar benefícios.

## Como rodar o app

```
npm install
npm run dev
```

https://benefit-manager.vercel.app/

## O projeto

A ideia foi desenvolver uma solução com foco no **frontend** que permite as seguintes funções básicas:

1. Adicionar novos colaboradores;
2. Preencher dados do colaborador;
3. Incluir colaborador no benefício desejado.

## A stack

O projeto foi desenvolvido em [React](https://reactjs.org/). Escolhi o framework [Next.js](https://nextjs.org/) pela sua facilidade de configuração e deploy na plataforma da Vercel.

Utilizei a lib [mirage js](https://miragejs.com/) para simular a API que acessa o banco de dados sem ter um backend.

Para os estilos, optei por utilizar a [styled-components](https://styled-components.com/). Eu tive um primeiro contato com essa lib em um curso e resolvi colocar em prática nesse projeto. Gosto de como ela permite separar bem a estrutura do componente do estilo. Criei um css apenas para definir cores e fontes.

## Hipóteses

Assumi que o _parceiro_ possui uma API para incluir novos colaboradores no benefício. Essa API foi simulada de maneira simplificada em `/pages/api/partner.js`. Na aplicação real, esta API seria externa e específica para cada parceiro.

## Páginas

O app está dividido em 3 páginas. Na aplicação real, eu imagino uma página de login e rotas liberadas apenas para usuários autenticados. Eu optei por simplificar o problema e colocar um `clientId` nas rotas que seriam bloqueadas.

### Home (/)

Esta página foi construída exclusivamente para o exercício. Na aplicação real, ela seria substituída por uma página de login. Aqui é possível escolher um dos clientes disponíveis no exemplo: _Acme Co_ ou _Tio Patinhas Bank_.

### Painel do cliente (/client/clientId)

Esta página é onde o usuário tem acesso a um painel geral do cliente/empresa, mostrando os benefícios oferecidos e os colaboradores.

Neste exercício, o botão de adicionar um novo benefício encontra-se desativado.

Cada colaborador é representado por um componente que apresenta o nome, CPF e os benefícios ativos. O botão _editar_ leva à página específica do colaborador.

### Dados do colaborador (/client/clientId/employee/employeeId)

Esta página o usuário tem acesso aos dados do colaborador e os benefícios em que esse colaborador pode ser incluído.

Na seção _dados_, são apresentados apenas os campos realmente necessários. Por exemplo, se nenhum benefício oferecido pela empresa pede o dado "endereço", então esse campo não será apresentado.

Pensando na experiência do usuário, os campos que apresentam problema são indicados com o contorno vermelho no componente do benefício e o botão _Enviar_ fica desativado. Além disso, a API também faz uma validação de dados, retornando erro caso os campos não tenham sido preenchidos corretamente.

Eu simplifiquei bastante a validação dos dados, basta que eles estejam preenchidos para serem válidos. No campo _altura_ eu fiz uma função de validação extremamente simples só para ilustrar o conceito e como poderia ser generalizado para os outros campos.

Outra melhoria a ser feita é utilizar uma máscara para formatar os dados (por exemplo, formatar o número de CPF com a separação por pontos).

## Arquitetura

A fim de gerenciar os estados de _loading_ e _error_, eu criei um componente `<App />` que envolve toda a aplicação. Ele é responsável por renderizar os componentes que indicam as mensagens de _loading_ e _error_. Além disso, eu usei o `Context` do React para expor a função `fetchHandler` que pode ser usada para mudar o estado da aplicação ao fazer uma chamada. O custom hook `useFetchHandler` facilita o consumo dessa função.
