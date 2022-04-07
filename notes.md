## Criando arquivo package.json com configurações já predefinidas
yarn init -y

## Adicionando framework express
yarn add express
yarn add @types/express -D (tipagens do framework)

## Adicionando dependências do typescript
yarn add typescript -D

## Inicializando o typescript (será gerado tsconfig.json)
yarn tsc --init

## alterando o outDir no arquivo no tsconfig (pasta onde será convertido os arquivos para js)
"outDir": "./dist", 