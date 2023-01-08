// The hook way
import { createTRPCReact } from '@trpc/react-query'
// Needs await
// import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
// Backend
import type { AppRouter } from '../../../server/src/router'

// Needs await
// export const trpcAwaited = createTRPCProxyClient<AppRouter>({
//   links: [
//     httpBatchLink({
//       url: 'http://localhost:4000/trpc'
//     })
//   ]
// })

export const trpc = createTRPCReact<AppRouter>()
