
# 📝 Lista de Tarefas (React Native + TypeScript + Tailwind)

Este é um aplicativo simples de **lista de tarefas** criado com **React Native**, **TypeScript** e **Tailwind CSS** usando a biblioteca **Nativewind**. Ele permite que os usuários adicionem, concluam e excluam tarefas, com armazenamento persistente usando **AsyncStorage**.

---

## 🚀 **Funcionalidades**

- ✅ Adicionar novas tarefas
- ✅ Marcar tarefas como concluídas
- ✅ Excluir tarefas
- ✅ Armazenamento persistente local com AsyncStorage
- ✅ Estilização moderna com Tailwind CSS (Nativewind)
- ✅ Tipagem segura com TypeScript

---

## 🛠️ **Tecnologias Usadas**

- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS (Nativewind)](https://www.nativewind.dev/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)

---

## 📦 **Instalação e Configuração**

### 🔥 Pré-requisitos

- Node.js >= 14.x
- Expo CLI (caso não tenha, instale globalmente):
  ```bash
  npm install -g expo-cli
  ```

### 🚧 **Passos para Rodar o Projeto**

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/lista-de-tarefas-react-native.git
   cd lista-de-tarefas-react-native
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure o Tailwind:**

   ```bash
   npx tailwindcss init
   ```

4. **Adicione o seguinte ao arquivo `tailwind.config.js`:**

   ```js
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: [
       "./App.{js,jsx,ts,tsx}",
       "./src/**/*.{js,jsx,ts,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   };
   ```

5. **Inicie o servidor de desenvolvimento:**

   ```bash
   expo start
   ```

6. **Teste no dispositivo físico:**
   - Baixe o aplicativo **Expo Go** na [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) ou [App Store](https://apps.apple.com/app/expo-go/id982107779).
   - Escaneie o QR code gerado no terminal.

---

## ⚙️ **Comandos Importantes**

- 🚀 **Iniciar o Projeto:** 
  ```bash
  expo start
  ```
- 🔄 **Limpar Cache:** 
  ```bash
  expo start -c
  ```
- 🧹 **Remover Node Modules (caso dê erro):**
  ```bash
  rm -rf node_modules && npm install
  ```

---

## 🛡️ **Licença**

Este projeto está licenciado sob a [MIT License](LICENSE).

---

## 🤝 **Contribuições**

Contribuições são sempre bem-vindas! 😊

1. Faça um Fork do projeto
2. Crie sua feature (`git checkout -b feature/sua-feature`)
3. Faça o Commit das suas alterações (`git commit -m 'Adicionando nova feature'`)
4. Faça o Push para o branch (`git push origin feature/sua-feature`)
5. Abra um Pull Request

---