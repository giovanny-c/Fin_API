export default {
  jwt: {
    secret: process.env.JWT_SECRET as string,
    expiresIn: '1d'
  }
}

//Para o jest reconhecer as variáveis de ambiente do ".env" era necessário acrescentar a seguinte configuração ao arquivo "jest.config.ts": setupFiles: ['dotenv/config']
