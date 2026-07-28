# Configuração Firebase — BalcãoIA Local

Projeto Google Cloud: `project-5b3388f6-ec3f-4f11-b43`

## Passo a passo no console (você precisa estar logado)

1. Abra o [Firebase Console](https://console.firebase.google.com/?hl=pt-br).
2. **Adicionar projeto** → **Usar um projeto do Google Cloud existente** → selecione `project-5b3388f6-ec3f-4f11-b43`.
3. Confirme o plano Spark (gratuito) e conclua.
4. No overview, clique no ícone **Web** `</>` e registre o app:
   - Nome: `BalcãoIA Studio`
   - Pode marcar Analytics
5. Copie o objeto `firebaseConfig` e cole os valores em `.env.local`:
   - `apiKey` → `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `authDomain` → `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `projectId` → `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `storageBucket` → `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `messagingSenderId` → `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `appId` → `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `measurementId` → `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` (opcional)
6. **Authentication** → Começar → ative:
   - E-mail/senha
   - Link por e-mail (passwordless)
7. Em Authentication → Settings → Authorized domains, confirme `localhost`.
8. **Firestore Database** → Criar banco → modo produção → região `southamerica-east1` (São Paulo).
9. Em Rules, publique o conteúdo de `firestore.rules` deste repositório.
10. Reinicie o servidor: `npm run dev` e abra `/app/login`.

## O que já está no código

- `lib/firebase/*` — client, auth (senha + magic link), Firestore
- Login prioriza Firebase quando as envs estão preenchidas
- Regras em `firestore.rules` + `firebase.json`

## Importante

O Cursor **não consegue** clicar/login na sua conta Google no navegador.
Depois de colar o `firebaseConfig` no `.env.local`, me avise que eu valido a conexão e sigo com o restante.
