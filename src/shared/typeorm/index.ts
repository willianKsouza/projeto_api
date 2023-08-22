import { createConnection } from 'typeorm'

createConnection().then(() => {
  console.log('deu bom na conexao com o banco brother');

}).catch(() => {
  console.log('deu ruim na conexao com o banco brother');

})
